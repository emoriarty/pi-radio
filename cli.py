import os
from subprocess import call 
from pyfiglet import Figlet

# system('clear')
call('clear' if os.name =='posix' else 'cls')

f = Figlet(font='slant')
print(f.renderText('Pi-Radio'))
print("By now it is only an internet radio but sooner will support DAB+")

print("Index:")
