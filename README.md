Avalon is a log system for irc.

All apps are designed for running inside docker. You can try to run them outside docker yourself.

## Configuration
You can find Avalon config file at `config` folder. Edit it for your own customize.

```bash
cd Avalon/config
cp example.config.yaml config.yaml
```

## Mongodb
Avalon use mongodb to save data, and use `script/mongo_init.js` to init database, change the username, password, db_name, etc. if you want, don't forget to change your `config.yaml` file.

Choose a palce for mongodb to saved data.

```bash
# enter Avalon
cd Avalon

# init mongodb database
docker run --name avalon-mongo-init -v <db-path>:/data/db -d mongo --storageEngine wiredTiger && docker exec -it avalon-mongo-init mongo --eval "$(cat $(pwd)/script/mongo_init.js)" && docker stop avalon-mongo-init && docker rm avalon-mongo-init

# create docker network
docker network create avalon-network

# run mongodb docker and join docker network
docker run --name avalon-mongo -d -v <db-path>:/data/db --network avalon-network  mongo --storageEngine wiredTiger --auth
```

## Logbot

```bash
# enter Avalon
cd Avalon

# build avalon-logbot image
docker build -f logbot/Dockerfile -t avalon-logbot .

# run logbot docker and join docker network
docker run --name avalon-logbot -d -v <config-path>:/go/src/github.com/Stevearzh/Avalon/config --net avalon-network avalon-logbot
```

## Server

```bash
# enter Avalon
cd Avalon

# build avalon-server
docker build -f server/Dockerfile -t avalon-server .

# run server docker and join docker network
docker run --name avalon-server -d -v <config-path>:/avalon/config --net avalon-network -p 5556:5556 avalon-server
```

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


## About Avalon

![Avalon](https://vignette.wikia.nocookie.net/implosion/images/b/b7/Avalon.png)

Avalon is a Warmech in [Implosion](https://en.wikipedia.org/wiki/Implosion_-_Never_Lose_Hope).