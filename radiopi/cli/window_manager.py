from prompt_toolkit.layout.containers import HSplit, VSplit, Window, WindowAlign
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.layout.layout import Layout
from pyfiglet import Figlet
from .selector_control import SelectorControl

__all__ = ["WindowManager"]


class WindowManager():
    def __init__(self):
        self.selectors = [SelectorControl(), SelectorControl(), SelectorControl()]
        self.index = 0

    @property
    def root(self):
        return self.selectors[0]

    @root.setter
    def root(self, root_tuple):
        self.selectors[0].props = root_tuple

    @property
    def dirs(self):
        return self.selectors[1]

    @dirs.setter
    def dirs(self, dirs_tuple):
        self.selectors[1].props = dirs_tuple

    @property
    def stations(self):
        return self.selectors[2]

    @stations.setter
    def stations(self, stations_tuple):
        self.selectors[2].props = stations_tuple

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
    def layout(self):
        return Layout(
            VSplit([
                HSplit([
                    WindowManager.header(),
                    WindowManager.horizontal_bar(),
                    self.root.radio_list,
                    WindowManager.horizontal_bar(),
                    self.dirs.radio_list,
                ]),
                WindowManager.vertical_bar(),
                self.stations.radio_list,
            ]))

    @staticmethod
    def header():
        f = Figlet(font='slant')
        return Window(content=FormattedTextControl(f.renderText('Radio-Pi')),
                      height=6,
                      align=WindowAlign.LEFT)

    @staticmethod
    def horizontal_bar():
        return Window(char='—', height=1)

    @staticmethod
    def vertical_bar():
        return Window(width=1, char='|')

    @staticmethod
    def get_selector_layout(selector, message):
        if len(selector.values) > 0:
            return selector.radio_list
        else:
            return Window(content=FormattedTextControl(message),
                          align=WindowAlign.CENTER)
