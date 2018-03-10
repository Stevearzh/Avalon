import pandas
import requests
import re

from .utils import \
last_seven_days, get_str_day, \
strip_irc_chars, strip_channel_name, \
get_nick_from_message

# close "A value is trying to be set on a copy of a slice from a DataFrame." warning
pandas.options.mode.chained_assignment = None

def get_log(base_url, channel, date):
    [year, month, day] = get_str_day(date)

    url = base_url + '/api/irc-logs?' + \
            'channel=' + strip_channel_name(channel) + \
            '&year=' + year + \
            '&month=' + month + \
            '&day=' + day + \
            '&limit=0&offset=0'

    r = requests.get(url)

    return r.json()['data']['logs']

def last_week_data(base_url, channel, bot_list = [], mask_dict = None):
    def to_df(date):
        return pandas.DataFrame(get_log(base_url, channel, date))

    # add extra info date, channel to DataFrame
    def add_extra(df, date):
        [year, month, day] = get_str_day(date)
        df['date'] = pandas.Series(year + '-' + month + '-' + day, index=df.index)
        df['channel'] = pandas.Series(channel, index=df.index)
        return df

    def db_append(host, nd):
        result = host.append(nd, ignore_index=True)
        return result

    def convert_bot_log(df, bot_name):
        tdf = df[df['nick'] == bot_name]
        tdf['nick'] = tdf['message'].map(lambda message: get_nick_from_message(message)) # real nick
        tdf['message'] = tdf['message'].map(lambda message: re.sub(R'^\[(\w+)\]', '', message).strip()) # remove nick from message
        # write data back
        df['nick'].update(tdf['nick'])
        df['message'].update(tdf['message'])
        return df

    days_list = last_seven_days()
    df = None

    for date in days_list:
        try:
            tmp_df = add_extra(to_df(date), date)            
        except:
            temp_df = pandas.DataFrame([])            
        df = db_append(df, tmp_df) if df is not None else tmp_df

    # strip special irc chars
    df['message'] = df['message'].map(lambda message: strip_irc_chars(message))

    # convert bot log
    if len(bot_list):
        for name in bot_list:
            df = convert_bot_log(df, name)

    # replace mask to real nick
    if mask_dict:
        df['nick'] = df['nick'].map(lambda nick: mask_dict[nick] if nick in mask_dict else nick)

    return df[['channel', 'date', 'time', 'nick', 'message']]
