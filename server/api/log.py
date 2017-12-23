import tornado.web
from tornado.escape import json_encode

from .times import gen_time_list
from ..utils import strip_irc_chars, first_child, access_db

def dict_channels(channels):
    return dict(zip(map(lambda c: list(filter(lambda n: n != '',
        c.split('#')))[0], channels), channels))

def check_date(avail_list, year, month):
    return '%s-%s' % (year, month) in avail_list

def fetch_logs(source):
    return list(map(lambda log: ({
        'time': log['time'],
        'nick': log['nick'],
        'message': strip_irc_chars(log['message'])
    }), source))

def LogHandler(config):	
    class LogClass(tornado.web.RequestHandler):		
        def get(self):
            message = ''
            logs = []
            total = 0

            # get pagination
            offset = first_child(self.get_arguments('offset', True)) or '0'
            limit = first_child(self.get_arguments('limit', True)) or '20'

            # get date
            year = first_child(self.get_arguments('year', True))
            month = first_child(self.get_arguments('month', True))
            day = first_child(self.get_arguments('day', True))

            valid_date = check_date(gen_time_list(config), year, month)
            if not year or not month or not day or not valid_date:
                message = 'Invalid date'

            # get channel
            channel = ''
            str_channel = first_child(self.get_arguments('channel', True))
            channel_dict = dict_channels(config.showed_channels)

            if str_channel in channel_dict:
                channel = channel_dict[str_channel]
            else:
                message = 'Invalid channel'

            # query logs
            if year and month and day and valid_date and channel:
                # initial database
                db = access_db(config.db_server, config.db_port, config.db_name,
                        '%s:%s-%s' % (config.db_name, year, month),
                        config.db_user, config.db_pwd)

                db_logs = db.my_collection.find({
                    'channel': channel,
                    'date': '%s-%s-%s' % (year, month, day)
                })
                total = db_logs.count()

                # pagination
                if offset and limit:
                    logs = fetch_logs(db_logs.skip(int(offset)).limit(int(limit)))                    
                else:
                    logs = fetch_logs(db_logs)

            self.write(json_encode({
                'data': {
                    'date': '%s-%s-%s' % (year, month, day),
                    'channel': channel,
                    'logs': logs,
                    'total': total
                },
                'message': message
            }))

    return LogClass
