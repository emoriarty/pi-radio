import os
import requests
from dotenv import load_dotenv
from lxml import etree as ET
from xml_parser import parse_dir, parse_station

load_dotenv()


class Browser:
    HOST = os.getenv('YCAST_HOST')
    PORT = 9876
    URL = HOST + ':' + str(PORT)

    def __init__(self):
        self.parser = ET.XMLParser(ns_clean=True,
                                   recover=True,
                                   encoding='utf-8')

        req = requests.get(Browser.URL)
        root = ET.fromstring(req.text.encode('utf-8'), self.parser)
        index = root.xpath("//Item[contains(., 'Radiobrowser')]/UrlDir/text()")

        if len(index) == 0:
            raise Exception('Radio Browser did not return index endpoint')

        self.lists_url = index[0]
        self.lists = {}
        self.genres = {}
        self.countries = {}
        self.languages = {}
        self.most_popular = {}
        self.fetch_lists(cache=False)

    def fetch_lists(self, cache=True):
        if cache is True:
            return self.lists

        req = requests.get(self.lists_url)
        titles, urls, counts = parse_dir(req.text)

        for i in range(len(urls)):
            typ = titles[i].lower().replace(" ", "_")
            print(typ + ' (' + counts[i] + '): ' + urls[i])
            self.lists[typ] = {
                "title": titles[i],
                "url": urls[i],
                "count": counts[i]
            }

        return self.lists

    def fetch_genres(self, cache=True):
        if cache is True:
            return self.genres

        self.genres = fetch_and_parse_dir(self.lists["genres"]["url"])
        #return self.genres

    def fetch_countries(self, cache=True):
        if cache is True:
            return self.countries

        self.countries = fetch_and_parse_dir(self.lists["countries"]["url"])
        #return self.countries

    def fetch_languages(self, cache=True):
        if cache is True:
            return self.languages

        self.languages = fetch_and_parse_dir(self.lists["languages"]["url"])
        #return self.languages

    def fetch_most_popular(self, cache=True):
        if cache is True:
            return self.most_popular

        print(self.lists["most_popular"]["url"])
        self.most_popular = fetch_and_parse_station(
            self.lists["most_popular"]["url"])
        #return self.most_popular


def fetch_and_parse_dir(url):
    req = requests.get(url)
    titles, urls, counts = parse_dir(req.text)
    dirs = {}

    for n in range(len(urls)):
        dire = titles[n].lower().replace(" ", "_")
        print(dire + ' (' + counts[n] + '): ' + urls[n])
        dirs[dire] = {"title": titles[n], "url": urls[n], "count": counts[n]}

    return dirs


def fetch_and_parse_station(url):
    req = requests.get(url)
    names, urls, logos, mimes, bandrates = parse_station(req.text)
    stations = []

    for i in range(len(urls)):
        print(names[i] + ' (' + urls[i] + '): ' + mimes[i])
        stations.append({
            "name": names[i],
            "url": urls[i],
            "logo": logos[i],
            "mime": mimes[i],
            "bandrate": bandrates[i],
        })

    return stations
