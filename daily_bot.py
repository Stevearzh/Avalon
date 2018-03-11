#!/usr/bin/env python3
from random import random
import socket

from crawler import log, statistic
from config.mask import mask_dict

base_url   = "http://poi.erhandsome.org:5556"
channel    = "#linuxba"
bot_list   = ["teleboto"]
top_n      = 10
irc_server = ("irc.freenode.net", 8000)
irc_nick   = "Goblin" + str(int(random() * 10000))

df = statistic.top_n_talkaholic(top_n,
    log.last_week_data(base_url, channel, bot_list, mask_dict))
result = "Last seven days top %s talkaholic gay-law:\n" % str(top_n)
for index, row in df.iterrows():
    result += "%-3d%-15s%-d\n" % ((index + 1), row['nick'], row['times'])

irc_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc_socket.connect(irc_server)
irc_socket.send(("NICK %s\r\n" % irc_nick).encode())
irc_socket.send(("USER %s %s %s :%s\r\n" % (irc_nick, irc_nick,
    irc_nick, irc_nick)).encode())
irc_socket.send(("JOIN %s\r\n" % channel).encode())

for line in result.split("\n"):
    if line:
        irc_socket.send(("PRIVMSG %s : %s\r\n" % (channel, line)).encode())

irc_socket.send(("QUIT quit\r\n").encode())

try:
    data = irc_socket.makefile()
 
    for line in data:
        print(line)
except:
    pass

print("Finished sending daily.\n")
