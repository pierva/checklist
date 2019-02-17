# Nautical Checklist App #

This application is designed to be used on board cruise ships. It serves the set of checklists required by the BRM and ERM.

The backend works in Node.js and MongoDB. Some of the routes make use of ajax to communicate with the server.

## Get started ##
It is necessary to have MongoDB installed on the machine.

### Note about MongoDB installation ###

Since the update of MongoDB to 3.6 there have been a few changes to the installation process.

Now, in order to get it working you'll need to run the following commands:

```
$sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

$sudo apt-get update

$sudo apt-get install -y mongodb-org
```

You should now have mongo 3.6.2 or newer, you can double check with `mongo --version`


From the terminal navigate to the root directory ~

Enter the following:
```
$mkdir data

$echo 'mongod --bind_ip=$IP --dbpath=data --nojournal "$@"' > mongod

$chmod a+x mongod
```
Now, in order to run mongod you'll first need to cd into root ~ then run `./mongod`

//Connect to the db. Makes sure that mongod is running. ./mongod (typed in root or where you installed the data directory)
```
mongoose.connect("mongodb://localhost:27017/<db-name>", {useNewUrlParser: true});
```

### Environment variables setup ###
Environmental variables are made available to process.env thanks to the `dotenv` package.

More information on how dotenv works can be found [here](https://www.npmjs.com/package/dotenv).

Create a file called `.env` in the root app directory.
In this file insert the following variables:
```
SECRET=<create-your-own-secret>
DATABASEURL="mongodb://localhost:27017/checklists"
ADMINCODE="<choose-the-admin-code>"
```

***
After the initial setup and with the mongodb demon running, you're now ready to run the server with one of the following commands:

```
$ npm run start
$ npm run start-dev
$ npm run start-test
```

For the testing the application uses the `mocha` library.
