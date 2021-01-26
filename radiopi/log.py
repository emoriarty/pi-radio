import logging
import os
from radiopi import CONFIG_PATH


class Log():
    def __init__(self, filename):
        logging.basicConfig(filename=os.path.join(CONFIG_PATH, filename),
                            level=logging.DEBUG)
        self.logging = logging

