from prompt_toolkit.widgets import RadioList as BaseRadioList
from radiopi import Log

__all__ = ["RadioList"]


log = Log('cli.log').logging

class RadioList(BaseRadioList):
    def __init__(self, values, handler, index=0):
        def page_up(event):
            w = event.app.layout.current_window
            self._selected_index = max(
                0, self._selected_index - len(w.render_info.displayed_lines)
            )
        def page_down(event):
            w = event.app.layout.current_window
            self._selected_index = min(
                len(self.values) - 1,
                self._selected_index + len(w.render_info.displayed_lines),
            )

        self.handler = handler
        super().__init__(values)
        self.control.key_bindings.add('c-b')(page_up)
        self.control.key_bindings.add('c-f')(page_down)
        self._selected_index = index
        super()._handle_enter()


    def _handle_enter(self):
        super()._handle_enter()
        self.handler(self.values[self._selected_index][1])

    @property
    def index(self):
        return self._selected_index

    @index.setter
    def index(self, index):
        self._selected_index = index
        super()._handle_enter()
