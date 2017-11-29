import tornado.web
from tornado.escape import json_encode

def ChannelHandler(list):
    result = {
        'list': list
    }

    class ChannelClass(tornado.web.RequestHandler):
        def get(self):
            self.write(json_encode({
                'data': result
            }))

    return ChannelClass
