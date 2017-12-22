Avalon is a log bot for irc.

## Configuration
You can find Avalon config file at `config` folder. Edit it for your own customize.

### Multi-Tables Support
After you set `db_multi` to `True`, Avalon would save messages into different dbs `<base name>:<year>-<month>` according to current time. Make sure you grant correct privileges to db user.

## Logbot

### Use Directly
Logbot uses [irc](https://github.com/jaraco/irc) and [pymongo](https://github.com/mongodb/mongo-python-driver), so you have to install these two libraries before run the script:

```bash
pip install -r bot/requirements.txt
```

finally, run script:

```bash
./run_bot.py
```


### Use Through Docker
This is the recommendable way for running Avalon. You have to build the image at first:

```bash
docker build -f bot/Dockerfile -t avalon .
```

after building success, you can just run Avalon image right away:

```bash
docker run --name=avalon -d -v $(pwd)/config:/avalon/config -p <whaterver port>:<mongodb port> avalon
```

that's all.


## Client
Client mainly uses [React](https://reactjs.org/) and [Material UI](https://material-ui-next.com/)

### Build
First, enter the `client` folder:

```bash
cd client
```

then, use `npm` (or `yarn`) to install the nesessary libraries

```bash
npm i # or yarn install
```

finally run:

```bash
npm run build # or yarn build
```

you can find the package building at `client/build`, use it to replace `server/public` when needed.


## Server

### Running Locally
Server uses [tornado](https://github.com/tornadoweb/tornado) and [pymongo](https://github.com/mongodb/mongo-python-driver), you need to install these two libraries first.

```bash
pip install -r server/requirements.txt
```

finally, run script:

```bash
./run_server.py
```

#### Client Develop
When you're under client part development, *Running Locally* is strongly recommended. Also you needn't replace client build folder each time after compiled. You just need to modify `public_root` at `config/config.py` to:

```python
public_root = os.path.join(os.path.dirname(__file__), '../client/build')
```

then enter client folder and run the command:

```bash
npm run dev # or yarn dev
```

### Use Through Docker
Build the image at first:

```bash
docker build -f server/Dockerfile -t avalon-server .
```

after image build, run:

```bash
sudo docker run --name=avalon-server -d -v $(pwd)/config:/avalon/config -p <server port>:<server port> avalon-server
```

visit [http://localhost:<server port>/](http://localhost:<server port>/) to see the page.


## About Avalon

![Avalon](https://vignette.wikia.nocookie.net/implosion/images/b/b7/Avalon.png)

Avalon is a Warmech in [Implosion](https://en.wikipedia.org/wiki/Implosion_-_Never_Lose_Hope).