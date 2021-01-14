from prompt_toolkit.layout.containers import HSplit, VSplit, Window, WindowAlign, VerticalAlign
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.formatted_text import HTML
from prompt_toolkit.layout.layout import Layout
from prompt_toolkit.widgets import VerticalLine, HorizontalLine, Frame
from pyfiglet import Figlet
from .selector_control import SelectorControl
from ..log import Log

log = Log('cli.log').logging

__all__ = ["WindowManager"]

flatten = lambda t: [item for sublist in t for item in sublist]


class WindowManager():
    def __init__(self):
        self.selectors = []
        self.folders = []
        self.stations = SelectorControl()
        self.index = 0
        self.playing = 'No Playing'
        self.stations_folder = None

    def append_folder(self, *folder_tuple):
        self.folders.append(SelectorControl(*folder_tuple))
        self._recreate_selectors()

    def insert_folder(self, *folder_tuple):
        self._recreate_folders()
        self.append_folder(*folder_tuple)

    def show_stations(self, folder_name=None, *station_tuple):
        log.debug('stations: %s', station_tuple)
        self.stations.props = station_tuple
        self.stations_folder = folder_name
        self._recreate_folders()
        self._recreate_selectors()

    def _recreate_selectors(self):
        self.selectors = self.folders.copy()
        if len(self.stations.values) > 0:
            self.selectors.append(self.stations)

    def _recreate_folders(self):
        self.folders = self.folders[:self.index + 1]

    def _get_layout_folders(self):
        return flatten(
            map(lambda i: (HorizontalLine(), i.radio_list), self.folders))

    @property
    def count(self):
        return len(self.selectors)

    @property
    def current_selector(self):
        return self.selectors[self.index].radio_list

    @property
    def next(self):
        self.index = (self.index + 1) % self.count
        return self.current_selector

    @property
    def prev(self):
        self.index = (self.index - 1) % self.count
        return self.current_selector

    @property
    def current(self):
        return self.current_selector

    @property
    def layout(self):
        return Layout(
            VSplit([
                HSplit([
                    WindowManager.header(),
                ] + self._get_layout_folders()),
                VerticalLine(),
                HSplit([
                    WindowManager.player(self.playing),
                    Frame(body=self.stations.radio_list,
                          title=self.stations_folder)
                ])
            ]))

    @staticmethod
    def header():
        f = Figlet(font='slant')
        return Window(content=FormattedTextControl(f.renderText('Radio-Pi')),
                      height=6,
                      align=WindowAlign.CENTER)

    @staticmethod
    def legend():
        return Window(content=FormattedTextControl(),
                      height=6,
                      align=WindowAlign.LEFT)

    @staticmethod
    def player(title='No Playing'):
        return HSplit([
            Window(content=FormattedTextControl(title),
                   height=2,
                   ignore_content_width=True,
                   align=WindowAlign.CENTER)
        ],
                      height=6,
                      padding=2,
                      align=VerticalAlign.CENTER,
                      padding_char='~')

    @staticmethod
    def get_selector_layout(selector, message):
        if len(selector.values) > 0:
            return selector.radio_list
        else:
            return Window(content=FormattedTextControl(message),
                          align=WindowAlign.CENTER)
