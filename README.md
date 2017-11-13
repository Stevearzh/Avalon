Avalon is a log bot for irc.

## Configuration
You can find Avalon config file at `config` folder. Edit it for your own customize.

## Use Directly
Avalon uses [irc](https://github.com/jaraco/irc) and [pymongo](https://github.com/mongodb/mongo-python-driver), so you have to install these two libraries before run the script:

```
pip install -r requirements.txt
```

finally, run script:

```
./bot.py
```


## Use Through Docker
This is the recommendable way for running Avalon. You have to build the image at first:

```
docker build -t avalon .
```

after building success, you can just run Avalon image right away:

```
docker run --name=avalon -d -v $(pwd)/config:/avalon/config -p <whaterver port>:<mongodb port> avalon
```

that's all.

## About Avalon

![Avalon](https://vignette.wikia.nocookie.net/implosion/images/b/b7/Avalon.png)

Avalon is a Warmech in [Implosion](https://en.wikipedia.org/wiki/Implosion_-_Never_Lose_Hope).