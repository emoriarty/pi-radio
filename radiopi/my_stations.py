import yaml
from .settings import MY_STATIONS

def get_lists():
    with open(MY_STATIONS) as file:
        data = yaml.load(file, Loader=yaml.FullLoader)
        return data.keys()

def get_stations(list_name):
    with open(MY_STATIONS) as file:
        stations = yaml.load(file, Loader=yaml.FullLoader)[list_name]
        return list(zip(stations.keys(), stations.values()))

def save_station(list_name, *station):
    lists = {}

    with open(MY_STATIONS) as file:
        lists = yaml.load(file, Loader=yaml.FullLoader)

    lists[list_name][station[0]] = station[1]

    with open(MY_STATIONS, 'w') as file:
        yaml.dump(lists, file)
