# JeezCMS

Node.js Content Management System with MongoDB

## Libraries Used
These are the following libraries/APIs I've used in this project, if you're starting with editing my code, make sure you know how to work with these :

- [Edge Templating Engine](https://edge.adonisjs.com/docs/getting-started) (for frontend code)
- [ExpressJS](https://expressjs.com/en/starter/installing.html) (application framework)
- [PassportJS](http://www.passportjs.org/docs/) (login/logout system)
- [MongooseJS](https://mongoosejs.com/docs/guide.html) (for connecting to the database)

## Features
This is a basic boilerplate from what you can build a great Node.js application. Some features it includes are :

- User hierarchy (Namely 3 Levels of Users : `Admin` , `Moderator` and `User`).
- Blog Control Panel (`Admin` and `Moderator` level users are allowed write and publish blog posts).
- Follow/Unfollow (Users can follow eachother)

__Note__: This was my first pet project using Node.js, so the code could get a bit messy and incomplete at someplaces.



## Installation

Clone or download this repository.

- `$ cd jeezcms`

- install `$ npm install`

## Configuration
Go to the file `/config/database.js`. 

```
module.exports = {
	'url' : 'MONGODB' 
};
```
Replace __MONGODB__ with your database url, which usually looks like `mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Jeisosdp`.

## Final Steps

- run `$ npm server`

Now go to `localhost:4000` and check if your app is running.

#### Following steps are required only for first time
Go to `localhost:4000/signup` and create an account (This will be your admin account).
Once finished, go to your database, then to the collection `Users` and find the user you created, edit it and change it's `level` attribute to `Admin` from `User` and save changes.

## Support
I will not be providing any support for this project because I made this project just to practice my skills in Node.js and MongoDB.
## License
The source-code is under [__MIT license__](https://github.com/siddarthsh/jeezcms/blob/master/license.txt).
