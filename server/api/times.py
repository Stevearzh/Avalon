import os
import time
import tornado.web
from tornado.escape import json_encode

def gen_time_list(config):
    list = []

    if config.time_zone:
        os.environ['TZ'] = config.time_zone
        time.tzset()
        
    now = time.localtime()

    for year in range(config.earliest_db[0], now.tm_year + 1):
        for month in range(1, 13):
            if year == config.earliest_db[0] and month < config.earliest_db[1]:
                pass
            elif year == now.tm_year and month > now.tm_mon:
                pass
            else:
                list.append('%d-%d' % (year, month))

    return list

def TimesHandler(config):
    result = {
        'list': gen_time_list(config)
    }

    class TimesClass(tornado.web.RequestHandler):
        def get(self):
            self.write(json_encode({
                'data': result
            }))

    return TimesClass    
