import vlc
import time

test_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
#test_url = "http://195.55.74.207/rtve/rtve-radio3.mp3"
#test_url = "http://radiocast.rtp.pt/antena180a.mp3"

#define VLC instance
instance = vlc.Instance('--input-repeat=-1', '--fullscreen')

#define VLC player
player = instance.media_player_new()

#define VLC media
media = instance.media_new(test_url)

#set player media
player.set_media(media)

#play the media
player.play()
time.sleep(10)
