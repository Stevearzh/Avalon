import os
import time
import tornado.web
from tornado.escape import json_encode

def gen_time_list(config):
    list = []

    os.environ['TZ'] = config.mongo.time_zone
    time.tzset()
        
    now = time.localtime()

    for year in range(config.server.earliest, now.tm_year + 1):
        for month in range(1, 13):
            if year == now.tm_year and month > now.tm_mon:
                pass
            else:
                month = '0' + str(month) if month < 10 else str(month)
                list.append('%d-%s' % (year, month))

    return list

def TimesHandler(config):
    class TimesClass(tornado.web.RequestHandler):                
        def get(self):
            result = {
                'list': gen_time_list(config)
            }
            
            self.write(json_encode({
                'data': result
            }))

    return TimesClass    
