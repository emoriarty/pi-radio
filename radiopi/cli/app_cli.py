from prompt_toolkit.application import Application, get_app
from prompt_toolkit.buffer import Buffer
from prompt_toolkit.layout.containers import HSplit, VSplit, Window, WindowAlign
from prompt_toolkit.layout.controls import BufferControl, FormattedTextControl
from prompt_toolkit.layout.layout import Layout
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.key_binding.bindings.focus import focus_next, focus_previous
from pyfiglet import Figlet
import vlc
from ..browser import Browser
from .selector_control import SelectorControl
from .window_manager import WindowManager
from ..log import Log

log = Log('cli.log').logging

class AppManager():
    def __init__(self):
        kb = KeyBindings()
        kb.add('tab')(self.next_window)
        kb.add('s-tab')(self.prev_window)
        kb.add('c-q')(self.exit)
        kb.add('c-p')(self.play)
        kb.add('c-s')(self.stop)

        self.browser = Browser()
        self.wm = WindowManager()
        self.current_dir = None
        self.current_station = None

        root = AppManager.format_dirs(self.browser.fetch()[0])
        self.wm.root = (root, self.on_click_root, 'No lists')
        self.fetch_dirs(root[0][1])
        self.app = Application(full_screen=True,
                               layout=self.wm.layout,
                               key_bindings=kb)
        self.instance = vlc.Instance('--input-repeat=-1', '--fullscreen')
        self.player = self.instance.media_player_new()

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

    def next_window(self, _ev=None):
        self.app.layout.focus(self.wm.next)

    def prev_window(self, _ev=None):
        self.app.layout.focus(self.wm.prev)

    def exit(self, _ev):
        self.app.exit()

    def on_click_root(self, root_name):
        self.fetch_dirs(root_name)
        self.app.layout = self.wm.layout
        self.next_window()

    def on_click_dir(self, dir_name):
        self.fetch_stations(dir_name)
        self.app.layout = self.wm.layout
        self.next_window()

    def on_click_station(self, station_name):
        stations = self.browser.stations[self.current_dir]
        station = next(x for x in stations if x['name'] == station_name)
        self.current_station = station
        self.play()

    def fetch_dirs(self, id):
        dirs = self.browser.fetch(id)[0]
        
        if len(dirs) > 0:
            self.wm.dirs = (AppManager.format_dirs(dirs), self.on_click_dir,
                            'No folders')
            self.fetch_stations(dirs[0]['title'])

    def fetch_stations(self, dir_name):
        self.current_dir = dir_name
        stations = self.browser.fetch(dir_name)[1]
        self.wm.stations = (AppManager.format_stations(stations),
                            self.on_click_station, 'No stations')

    def play(self, _ev=None):
        media = self.instance.media_new(self.current_station['url'])
        self.player.set_media(media)
        self.player.play()

    def stop(self, _ev=None):
        self.player.stop()


    def run(self):
        self.app.run()
