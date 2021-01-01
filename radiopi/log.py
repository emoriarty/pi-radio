import logging
import os
from pathlib import Path

app_folder = 'radiopi'


class Log():
    def __init__(self, filename):
        config_path = Log.log_folder()
        Path(config_path).mkdir(parents=True, exist_ok=True)
        logging.basicConfig(filename=os.path.join(config_path, filename),
                            level=logging.DEBUG)
        self.logging = logging

    @staticmethod
    def log_folder():
        return os.path.join(Path.home(), '.config', app_folder)
