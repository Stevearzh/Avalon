available time (relative db tables)
```
GET /api/times

# Response Body
{
    success: <boolean>
    msg: <string> # error message if not success else null or ""
    data: {
        list: [
            "2018-01",
            "2018-02",
            ...
        ]
    }
}
```

available channel
```
GET /api/channels

# Response Body
{
    success: <boolean>,
    msg: <string>,
    data: {
        list: [
            "#linuxba",
            "#c_lang_cn",
            ...
        ]
    }
}
```

fetch log
```
GET /api/irc-logs

# Query String Parameters
{
    channel: <string>, # available if choosen from /api/channels
    day: <number>,
    limit: <number>, # default is 20
    month: <number>, # 01, 02, 03, ..., 12
    offset: <number>, # default is 0
    year: <number>
}

# Response Body
{
    success: <boolean>,
    msg: <string>,
    data: {
        channel: <string>, # "#linuxba"
        date: <string>, # "2018-01-26"
        logs: [
            {
                message: "", # "hello everyone"
                nick: "", # "Stevearzh"
                time: "" # "23:05:50"
            },
            ...
        ]
        total: <number>
    }
}
```
