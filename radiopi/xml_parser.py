from lxml import etree as ET

parser = ET.XMLParser(ns_clean=True, recover=True, encoding='utf-8')


def parse_root(raw):
    root = ET.fromstring(raw.encode('utf-8'), parser)
    return root.xpath("//Item[contains(., 'Radiobrowser')]/UrlDir/text()")


def parse_dir(raw):
    doc = ET.fromstring(raw.encode('utf-8'), parser)

    titles = doc.xpath('//Title/text()')
    urls = doc.xpath('//UrlDir/text()')
    counts = doc.xpath('//DirCount/text()')

    return (titles, urls, counts)


def parse_station(raw):
    doc = ET.fromstring(raw.encode('utf-8'), parser)

    names = doc.xpath('//StationName/text()')
    urls = doc.xpath('//StationUrl/text()')
    logos = doc.xpath('//Logo/text()')
    mimes = doc.xpath('//StationMime/text()')
    bandrates = doc.xpath('//StationBandWidth/text()')

    return (names, urls, logos, mimes, bandrates)
