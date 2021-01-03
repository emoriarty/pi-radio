import os
import requests
from .xml_parser import parse_dir, parse_station


class Browser:
    URL = os.getenv('YCAST_HOST')

    def __init__(self):
        self.__directories = {None: {"url": Browser.URL}}
        self.__stations = {}
        self._fetch_and_parse(Browser.URL)

    def fetch(self, directory=None, cache=True):
        if cache is True:
            if directory is None:
                return (list(self.filter_directories_by('dir').values()), [])
            elif directory in self.__stations:
                return (list(
                    self.filter_directories_by('dir', directory).values()),
                        self.__stations[directory])

        return self._fetch_and_parse(directory=directory,
                                     url=self.__directories[directory]["url"])

    def _fetch_and_parse(self, url, directory=None):
        req = requests.get(url)
        dirs = self._parse_dir(req.text, directory)
        stations = self._parse_station(req.text, directory)
        return (list(dirs.values()), stations)

    @property
    def directories(self):
        return dict(
            filter(lambda elem: elem[0] is not None,
                   self.__directories.items()))

    @property
    def stations(self):
        return self.__stations

    def filter_directories_by(self, prop, value=None):
        return dict(
            filter(
                lambda elem: elem[1].get(prop) is value and elem[0] is
                not None, self.__directories.items()))

    def _parse_dir(self, doc, directory=None):
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

    def _parse_station(self, doc, directory):
        names, urls, logos, mimes, bandrates = parse_station(doc)
        stations = []

        for i in range(len(urls)):
            stations.append({
                "dir": directory,
                "name": names[i],
                "url": urls[i],
                "logo": logos[i],
                "mime": mimes[i] if len(mimes) > i else '',
                "bandrate": bandrates[i] if len(bandrates) > i else '',
            })

        self.__stations[directory] = stations
        return stations
