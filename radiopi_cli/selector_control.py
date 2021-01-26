from .radio_list import RadioList
from prompt_toolkit.layout.containers import Window, WindowAlign
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.widgets import Box
from .log import Log

log = Log('cli.log').logging

__all__ = ["SelectorControl"]


def empty_function():
    pass


class SelectorControl():
    def __init__(self, values=[], handler=empty_function, message='No items'):
        self._values = values
        self._handler = handler
        self._message = message
        self.radio_list = self._get_container()

    @property
    def values(self):
        return self._values

    @values.setter
    def values(self, values):
        self.props = values, self._handler, self._message

    @property
    def handler(self):
        return self._handler

    @handler.setter
    def handler(self, handler):
        self.props = self._values, handler, self._message

    @property
    def message(self):
        return self._message

    @message.setter
    def message(self, message):
        self.props = self._values, self.handler, message

    @property
    def props(self):
        return (self.values, self.handler, self.message)

    @property
    def index(self):
        try:
            return self.radio_list.index
        except:
            return 0

    @props.setter
    def props(self, props):
        values, handler, message = props
        self._values = values
        self._handler = handler
        self._message = message
        self.radio_list = self._get_container()

    def _get_container(self):
        if len(self.values) > 0:
            return RadioList(self.values, self.handler)

        return self._get_message()

    def _get_message(self):
        return Box(body=Window(content=FormattedTextControl(self.message),
                               align=WindowAlign.CENTER))
