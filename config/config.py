import os

# bot config
channel_list = ['#channel1', '#channel2']
nickname = 'nick_name'
irc_server = 'irc.freenode.net'
irc_port = 6667

# mongodb config
db_name = 'test'
db_multi = False
db_server = 'localhost'
db_port = 27017
db_auth = True
db_user = 'testUser'
db_pwd = 'P@ssword!'
time_zone = 'Asia/Shanghai'

# server config
showed_channels = ['#channel1']
server_port = 5556
earliest_db = (2017, 11)
# change public_root to '../client/build'
# if you're under client development
public_root = os.path.join(os.path.dirname(__file__), '../server/public')
dist_path = os.path.join(public_root, 'dist')
server_settings = dict(
    debug=True,
    static_path=public_root,
    template_path=public_root
)
