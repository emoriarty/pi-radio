from os import path
import vlc
from prompt_toolkit.application import Application
from prompt_toolkit.layout.containers import HSplit
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.formatted_text import HTML
from prompt_toolkit.shortcuts import radiolist_dialog
from prompt_toolkit.widgets import Dialog, TextArea
from prompt_toolkit.filters import Condition
from radiopi import Browser, MyStations
from .window_manager import WindowManager
from .log import Log
from .settings import CONFIG_PATH
from .radio_list import RadioList

log = Log('cli.log').logging
vlc_log = path.join(CONFIG_PATH, 'vlc.log')


class AppManager():
    def __init__(self):
        self.browser = Browser()
        self.wm = WindowManager()
        self.current_dir = None
        self.current_station = None

        @Condition
        def is_not_dialog_active():
            return not self.wm.is_dialog_active

        kb = KeyBindings()
        kb.add('tab', filter=is_not_dialog_active)(self.next_window)
        kb.add('s-tab', filter=is_not_dialog_active)(self.prev_window)
        kb.add('c-q', filter=is_not_dialog_active)(self.exit)
        kb.add('escape')(self.close_dialog)
        kb.add('c-p')(self.play)
        kb.add('c-s')(self.stop)
        kb.add('c-l', filter=is_not_dialog_active)(self.add_to_list)

        root = AppManager.format_dirs(self.browser.fetch()[0])
        self.wm.append_folder(root, self.on_click_folder, 'No lists')
        self.app = Application(full_screen=True,
                               layout=self.wm.layout,
                               key_bindings=kb)
        self.instance = vlc.Instance('--input-repeat=-1', '--fullscreen',
                                     '--quiet', '--file-logging',
                                     f'--logfile={vlc_log}', '--logmode=text',
                                     '--log-verbose=3')
        self.player = self.instance.media_player_new()

    def next_window(self, _ev=None):
        self.app.layout.focus(self.wm.next)

    def prev_window(self, _ev=None):
        self.app.layout.focus(self.wm.prev)

    def keep_window(self, _ev=None):
        self.app.layout.focus(self.wm.current)

    def exit(self, _ev):
        self.app.exit()

    def on_click_folder(self, dir_name):
        self.fetch(dir_name)
        self.app.layout = self.wm.layout
        self.next_window()
        self.current_dir = dir_name

    def on_click_station(self, station_name):
        stations = self.browser.stations[self.current_dir]
        station = next(x for x in stations if x['name'] == station_name)
        self.current_station = station
        self.play()

    def fetch(self, dir_name):
        dirs, stations = self.browser.fetch(dir_name)

        if len(dirs) > 0:
            self.wm.insert_folder(AppManager.format_dirs(dirs),
                                  self.on_click_folder)
        if len(stations) > 0:
            self.wm.show_stations(dir_name,
                                  AppManager.format_stations(stations),
                                  self.on_click_station, 'No stations')

    def play(self, _ev=None):
        log.info('currently playing: %s', self.current_station)
        media = self.instance.media_new(self.current_station['url'])
        self.wm.playing = HTML('<u>Playing</u>: ' +
                               self.current_station['name'])
        self.app.layout = self.wm.layout
        self.keep_window()
        self.player.set_media(media)
        self.player.play()

    def stop(self, _ev=None):
        self.wm.playing = HTML('<u>Stopped</u>: ' +
                               self.current_station['name'])
        self.app.layout = self.wm.layout
        self.player.stop()

    def add_to_list(self, _ev=None):
        if self.current_station:

            def select_list(st_list):
                stations = list(map(lambda st: st[0], MyStations.get_stations(st_list)))

                if self.current_station['name'] in stations:
                    log.info('%s station already in %s\'s list',
                             self.current_station['name'], st_list)
                else:
                    log.info('save %s in %s\'s list',
                             self.current_station['name'], st_list)
                    MyStations.save_station(st_list, str(self.current_station['name']),
                                 str(self.current_station['url']))
                self.close_dialog()

            def new_list(buffer):
                log.info('new list: %s', buffer.text)
                select_list(buffer.text)

            radio_list = RadioList(values=list(
                map(lambda i: (i, i), MyStations.get_lists())),
                                   handler=select_list)

            text_input = TextArea(multiline=False, accept_handler=new_list)

            dialog = Dialog(title="Add to list",
                            body=HSplit([text_input, radio_list], padding=1),
                            width=40,
                            with_background=True)
            self.wm.show_dialog(dialog)
            self.app.layout = self.wm.layout
            self.keep_window()

    def run(self):
        self.app.run()

    def close_dialog(self, _ev=None):
        self.wm.hide_dialog()
        self.app.layout = self.wm.layout
        self.keep_window()

    @staticmethod
    def format_dirs(dirs):
        list = []
        for i, di in enumerate(dirs):
            list.append((i, di["title"]))
        return list

    @staticmethod
    def format_stations(stations):
        list = []
        for i, di in enumerate(stations):
            list.append((i, di["name"]))
        return list
