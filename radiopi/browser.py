import os
import requests
from lxml import etree as ET
from .xml_parser import parse_dir, parse_station, parse_root


class Browser:
    HOST = os.getenv('YCAST_HOST')
    PORT = 9876
    URL = HOST + ':' + str(PORT)

    def __init__(self):
        self.parser = ET.XMLParser(ns_clean=True,
                                   recover=True,
                                   encoding='utf-8')

        req = requests.get(Browser.URL)
        index = parse_root(req.text)

        if len(index) == 0:
            raise Exception('Radio Browser did not return index endpoint')

        self.__directories = {None: {"url": index[0]}}
        self.__stations = {}
        self.fetch(cache=False)

    def fetch(self, directory=None, cache=True):
        if cache is True:
            if directory is None:
                return (list(self.directories.values()), [])
            elif directory in self.__stations:
                return ([self.__directories[directory]],
                        self.__stations[directory])

        req = requests.get(self.__directories[directory]["url"])
        dirs = self.__parse_dir(req.text, directory)
        stations = self.__parse_station(req.text, directory)
        return (list(dirs.values()), stations)

    @property
    def directories(self):
        # filter directories by dir == None
        return dict(
            filter(
                lambda elem: elem[1].get('dir') is None and elem[0] is
                not None, self.__directories.items()))

    @property
    def stations(self):
        return self.__stations

    def __parse_dir(self, doc, directory=None):
        titles, urls, counts = parse_dir(doc)
        dirs = {}

        for i in range(len(urls)):
            dirs[titles[i]] = {
                "dir": directory,
                "title": titles[i],
                "url": urls[i],
                "count": counts[i]
            }

        self.__directories = {**self.__directories, **dirs}
        return dirs

    def __parse_station(self, doc, directory):
        names, urls, logos, mimes, bandrates = parse_station(doc)
        stations = []

        for i in range(len(urls)):
            stations.append({
                "dir": directory,
                "name": names[i],
                "url": urls[i],
                "logo": logos[i],
                "mime": mimes[i],
                "bandrate": bandrates[i],
            })

        self.__stations[directory] = stations
        return stations
