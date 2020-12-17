import os
import sys
import vlc
import time
import tty
from subprocess import call
from pyfiglet import Figlet
from .browser import Browser
from prompt_toolkit import prompt, print_formatted_text as print, HTML


def main():
    call('clear' if os.name == 'posix' else 'cls')

    vlc_instance = vlc.Instance('--input-repeat=-1', '--fullscreen')
    player = vlc_instance.media_player_new()
    tty.setraw(sys.stdin)
    b = Browser()
    o = 0
    d = None
    s = None
    index = 0
    new_index = 0

    header()
    print("Internet radio in your raspberry pi (or any other device)")
    print("\nIndex:\n")

    dirs, stations = b.fetch(d)

    if len(dirs) > 0:
        for i, di in enumerate(dirs, start=1):
            print(HTML(f'  {i} - {di["title"]}'))

    d = dirs[o - 1]["title"]
    sys.stdout.write(u"\u001b[" + str(len(dirs)) + "A")
    sys.stdout.flush()

    while True:
        #o = int(prompt(HTML('<b>Select a directory: </b>')))
        char = ord(sys.stdin.read(1))

        
        if char == 3:  # CTRL-C
            break
        elif char == 27:
            next1, next2 = ord(sys.stdin.read(1)), ord(sys.stdin.read(1))
            if next1 == 91:
                if next2 == 65:  # Up
                    new_index = index - 1
                elif next2 == 66:  # Down
                    new_index = index + 1
        elif char == 107:  # k (Up)
            new_index = index - 1
        elif char == 106:  # j (Down)
            new_index = index + 1
        elif char == 119:  # w (Up)
            new_index = index - 1
        elif char == 115:  # s (Down)
            new_index = index + 1

        if index < new_index:
            sys.stdout.write(u"\u001b[1B")
        elif index > new_index:
            sys.stdout.write(u"\u001b[1A")
        sys.stdout.write(u"\u001b[1000D")
        sys.stdout.write('>')
        sys.stdout.flush()
        index = new_index
    #else:
    #    for i, st in enumerate(stations, start=1):
    #        print(i, st["name"])

    #    s = int(input("\nSelect a station: "))
    #    media = vlc_instance.media_new(stations[s - 1]["url"])
    #    player.set_media(media)
    #    player.play()


def header():
    f = Figlet(font='slant')
    print(f.renderText('Radio-Pi'))
