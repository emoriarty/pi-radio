import os
from subprocess import call
from pyfiglet import Figlet
from .browser import Browser
import vlc
import time


def main():
    call('clear' if os.name == 'posix' else 'cls')

    vlc_instance = vlc.Instance('--input-repeat=-1', '--fullscreen')
    player = vlc_instance.media_player_new()
    b = Browser()
    o = 0
    d = None
    s = None

    while o >= 0:
        header()
        print("Internet radio in your raspberry pi (or any other device)")
        print("\nIndex:\n")

        dirs, stations = b.fetch(d)

        if len(dirs) > 0:
            for i, di in enumerate(dirs, start=1):
                print(i, di["title"])

            o = int(input("\nSelect a directory: "))
            d = dirs[o-1]["title"]
        else:
            for i, st in enumerate(stations, start=1):
                print(i, st["name"])

            s = int(input("\nSelect a station: "))
            media = vlc_instance.media_new(stations[s-1]["url"])
            player.set_media(media)
            player.play()
            time.sleep(10)

def header():
    f = Figlet(font='slant')
    print(f.renderText('Radio-Pi'))
