import os
import requests
from lxml import etree as ET
from xml_parser import parse_dir

class Browser:
    HOST = os.getenv('YCAST_HOST')
    PORT = 9876
    URL = HOST + ':' + str(PORT)

    def __init__(self):
        self.parser = ET.XMLParser(ns_clean=True, recover=True, encoding='utf-8')

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
        self.fetch_lists(cache = False)


    def fetch_lists(self, cache = True):
        if cache == True:
            return self.lists

        req = requests.get(self.lists_url)
        titles, urls, counts = parse_dir(req.text)

        for n in range(len(stations_lists_urls)):
            type = titles[n].lower().replace(" ", "_")
            print(type + ' (' + count[n] + '): ' +  urls[n])
            self.lists[type] = {
                "title": titles[n],
                "url": urls[n],
                "count": count[n]
            }

        return self.lists

    def fetch_genres(self, cache = True):
        if cache == True:
            return self.genres

        req = requests.get(self.lists["genres"]["url"])
        titles, urls, counts = parse_dir(req.text)

        for n in range(len(urls)):
            genre = titles[n].lower().replace(" ", "_")
            print(genre + ' (' + counts[n] + '): ' +  urls[n])
            self.genres[genre] = {
                "title": titles[n],
                "url": urls[n],
                "count": counts[n]
            }
        return self.genres

# req_popular = requests.get(stations_lists_urls[3])
# popular = ET.fromstring(req_popular.text.encode('utf-8'), parser)
# 
# popular_titles = popular.xpath('//StationName/text()')
# popular_urls = popular.xpath('//StationUrl/text()')
# popular_count = popular.xpath('//StationDesc/text()')
# 
# print(popular_titles)
#
#languagesUrl = ''
#for child in lists[2]:
#    if child.tag == 'UrlDir':
#        print(child.text)
#        languagesUrl = child.text
#
#languages = requests.get(languagesUrl).text
#print(languages)
