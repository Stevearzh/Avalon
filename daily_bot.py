#!/usr/bin/env python3

from crawler import log, statistic
from config.mask import mask_dict

base_url = "http://poi.erhandsome.org:5556"
channel  = "#linuxba"
bot_list = ["teleboto"]
top_n    = 10

result = statistic.top_n_talkaholic(top_n, log.last_week_data(base_url, channel, bot_list, mask_dict))
print(result)
