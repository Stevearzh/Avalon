import datetime as DT
import re

def last_seven_days(date = DT.datetime.today()):
    return list(map(lambda i: date - DT.timedelta(days=i), range(7)))

def get_str_day(date):
    [year, month, day] = [str(date.year), date.month, date.day]

    month = '0' + str(month) if month < 10 else str(month)
    day = '0' + str(day) if day < 10 else str(day)

    return (year, month, day)

def strip_irc_chars(string):
    return re.sub(R"\x03(?:\d{1,2}(?:,\d{1,2})?)?|\x02|\x1F|\x1D|\x06|\x16|\u000F", "", string)

def strip_channel_name(name):
    return name.split('#')[-1]

def get_nick_from_message(message):
    result = re.search(R'^\[(\w+)\]', message)
    return result.group(1) if result else None

