from lxml import etree as ET

parser = ET.XMLParser(ns_clean=True, recover=True, encoding='utf-8')

def parse_dir(raw):
    doc = ET.fromstring(raw.encode('utf-8'), parser)

    titles = doc.xpath('//Title/text()')
    urls = doc.xpath('//UrlDir/text()')
    counts = doc.xpath('//DirCount/text()')

    return (titles, urls, counts)
