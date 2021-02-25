import pychromecast
import time
import sys

services, browser = pychromecast.discovery.discover_chromecasts()

chromecasts, browser = pychromecast.get_chromecasts()
print(chromecasts, len(chromecasts))
[print(cc.device.friendly_name) for cc in chromecasts]

cast = chromecasts[0]
cast.wait()
print(
    'Found chromecast with name "{}", attempting to play "{}"'
)

cast.media_controller.play_media("http://icecast.radiofrance.fr/fiprock-hifi.aac", "audio/mp4")

# Wait for player_state PLAYING
player_state = None
t = 30
has_played = False
while True:
    try:
        if player_state != cast.media_controller.status.player_state:
            player_state = cast.media_controller.status.player_state
            print("Player state:", player_state)
        if player_state == "PLAYING":
            has_played = True
        if cast.socket_client.is_connected and has_played and player_state != "PLAYING":
            has_played = False
            cast.media_controller.play_media("http://icecast.radiofrance.fr/fiprock-hifi.aac", "audio/mp4")

        time.sleep(0.1)
        t = t - 0.1
    except KeyboardInterrupt:
        break

pychromecast.discovery.stop_discovery(browser)
