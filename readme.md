Note about installing MongoDB

Since the update of MongoDB to 3.6 there have been a few changes to the installation process.

Now, in order to get it working you'll need to run the following commands:

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org
You should now have mongo 3.6.2 or newer, you can double check with mongo --version

Now type cd in the terminal and hit enter to go into the root directory ~

Enter the following:

mkdir data
// this one didn't work: echo "mongod --dbpath=data --nojournal" > mongod
//try the below command:
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal "$@"' > mongod
chmod a+x mongod
Now, in order to run mongod you'll first need to cd into root ~ then run ./mongod

//BASICS MONGO COMMANDS
mongo //it opens the mongo shell
* mongod //start the mongo deamon. It must be run where the data file was created. Ex. in root
* help
* show dbs
* show collections
* use //uses the db passed or it creates the db if it doesn't exist.
* insert
* find //ex db.bikes.find() //where bikes is the name of the db
* update // db.bikes.update({model: "899 panigale"}, {$set:{model: "959 panigale"}})
  //if you don't use $set, but just pass the update object, all the previous stored values will be discarded. $set preserve the other values
* remove //ex. db.bikes.remove({model: "panigale V4"})
* if you want to perform a search by text to a specific collection, for example you want to give the users the ability
  to search for an artist name (full name, last name or first name for instance) you must first create an index in that
  collection. To create the index open the db in the mongo shell and use the createIndex method
  For example: db.artists.createIndex({ name: "text" }) ==> this will create a text index to a key called name


CRUD (Create, Read, Update, Destroy)

What is mongoose:
Elegant mongodb object modeling for node.js (ODM >> Object Document Modeling)
It's a package that help us to interact with the db inside the js file
Is like jQuery that make easier the interaction with the DOM, mongoose make easier the intercation with the db, although it is not necessary.

//Connect to the db. Makes sure that mongod is running. ./mongod (typed in root because is where the data directory reside)
mongoose.connect("mongodb://localhost:27017/bikes", {useNewUrlParser: true});
