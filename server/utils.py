import re
import pymongo
import datetime as DT

def strip_irc_chars(string):
    return re.sub(R"\x03(?:\d{1,2}(?:,\d{1,2})?)?|\x02|\x1F|\x1D|\x06|\x16|\u000F", "", string)

def first_child(arr):
    return arr[0] if arr else None

def access_db(server, port, name, table, user, pwd):
    return pymongo.MongoClient('mongodb://%s:%s@%s:%s/%s' %
        (user, pwd, server, port, name))[table]

def prev_sunday(adate):
    adate -= DT.timedelta(days=1)
    while adate.weekday() < 6:
        adate -= DT.timedelta(days=1)
    return adate

def last_seven_days(day):
    return list(map(lambda i: day - DT.timedelta(days=i), range(7)))

def last_week():
    return last_seven_days(prev_sunday(DT.datetime.today()))
