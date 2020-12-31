from os import path, getcwd
from unittest import main as test_main, TestCase
from unittest.mock import MagicMock, patch, DEFAULT
from radiopi import Browser

dirname = path.dirname(__file__)

file_ycast_index = open(path.join(dirname, 'data', 'ycast_index.xml'), 'r')
file_ycast_browser = open(path.join(dirname, 'data', 'ycast_browser.xml'), 'r')
file_ycast_genres = open(path.join(dirname, 'data', 'ycast_genres.xml'), 'r')

ycast_index = file_ycast_index.read()
ycast_browser = file_ycast_browser.read()
ycast_genres = file_ycast_genres.read()

file_ycast_index.close()
file_ycast_browser.close()
file_ycast_genres.close()


class MockXmlResponse():
    def __init__(self, body=ycast_index):
        self.text = body


mock = MagicMock(return_value=MockXmlResponse())


class TestBrowser(TestCase):
    def setUp(self):
        mock.reset_mock()

    @patch('requests.get', mock)
    def test_init_loads_root_directories(self):
        def side_effect(*args):
            if mock.call_count == 2:
                return MockXmlResponse(ycast_browser)
            return DEFAULT

        mock.side_effect = side_effect

        b = Browser()
        self.assertIs(type(b.directories), dict)
        self.assertEqual(list(b.directories.keys()),
                         ['Genres', 'Countries', 'Languages', 'Most Popular'])

    @patch('requests.get', mock)
    def test_fetch_returns_root_directories_when_no_arguments(self):
        def side_effect(*args):
            if mock.call_count == 2:
                return MockXmlResponse(ycast_browser)
            elif mock.call_count == 3:
                return MockXmlResponse(ycast_genres)
            return DEFAULT

        mock.side_effect = side_effect

        b = Browser()
        directories, stations = b.fetch()

        directory_names = [x["title"] for x in directories]
        self.assertEqual(directory_names,
                         ['Genres', 'Countries', 'Languages', 'Most Popular'])

    @patch('requests.get', mock)
    def test_fetch_caches_request(self):
        def side_effect(*args):
            if mock.call_count == 1:
                return DEFAULT
            return MockXmlResponse(ycast_browser)

        mock.side_effect = side_effect

        b = Browser()

        b.fetch()
        b.fetch()
        b.fetch()
        self.assertTrue(mock.call_count == 2)

        mock.reset_mock(side_effect=side_effect)

        b.fetch('Genres')
        b.fetch('Genres')
        b.fetch('Genres')
        self.assertTrue(mock.call_count == 1)

    @patch('requests.get', mock)
    def test_fetch_no_cache(self):
        def side_effect(*args):
            if mock.call_count == 1:
                return DEFAULT
            return MockXmlResponse(ycast_browser)

        mock.side_effect = side_effect

        b = Browser()

        b.fetch(cache=False)
        b.fetch(cache=False)
        self.assertTrue(mock.call_count == 4)

        def side_effect_2(*args):
            return MockXmlResponse(ycast_genres)

        mock.reset_mock(side_effect=side_effect_2)

        b.fetch('Genres', cache=False)
        b.fetch('Genres', cache=False)
        b.fetch('Genres', cache=False)
        self.assertTrue(mock.call_count == 3)

    @patch('requests.get', mock)
    def test_fetch_returns_consistent_data(self):

        def side_effect(*args):
            if mock.call_count == 1:
                return DEFAULT
            return MockXmlResponse(ycast_browser)

        mock.side_effect = side_effect

        b = Browser()

        empty_fetch_1 = b.fetch()
        empty_fetch_2 = b.fetch()
        self.assertEqual(empty_fetch_1, empty_fetch_2)

        def side_effect_2(*args):
            return MockXmlResponse(ycast_genres)

        mock.reset_mock(side_effect=side_effect_2)

        dir_fetch_1 = b.fetch('Genres')
        dir_fetch_2 = b.fetch('Genres')
        self.assertEqual(dir_fetch_1, dir_fetch_2)

if __name__ == '__main__':
    test_main()
