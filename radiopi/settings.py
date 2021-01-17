import os
from pathlib import Path
from dotenv import load_dotenv as _load_dotenv, find_dotenv as _find_dotenv

_load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

APP_FOLDER = 'radiopi'
CONFIG_PATH = os.path.join(Path.home(), '.config', APP_FOLDER)
MY_STATIONS = os.path.join(CONFIG_PATH, 'stations.yml')
# create config folder
Path(CONFIG_PATH).mkdir(parents=True, exist_ok=True)
