//import database setup utils
const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');

//import Sequelize instance
const db = require('./database');

//sync and seed
const syncDatabase = async () => {
  try {
    //the {force: true} option will clear the database tables
    //every time we restart the server
    //remove the option if you want the data to persist, ie: 
    //await db.sync();

    await db.sync({force: true});
    console.log('------Synced to db--------')
    await seedDB();
    console.log('--------Successfully seeded db--------');
  } catch (err) {
    console.error('syncDB error:', err);
  }  
}

//import express library
const express = require("express");

//create express server
const app = express();

//initialize express server
const cors = require('cors')

const configureApp = async () => {
  // handle request data
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //ignore browser requests for favicon file
  app.get('/favicon.ico', (req, res) => res.status(204));
  
  // Error-handling middleware: 
  // all express errors get passed to this
  // when next(error) is called 
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  //creates local database if it doesn't exist
  await createDB();

  //calls sync which is a Sequelize method that creates the database tables
  //calls seedDB which will insert initial data into the tables
  await syncDatabase();
};


// PROGRAM STARTS HERE


bootApp();


const PORT = 5001;
app.listen(PORT, console.log(`Server started on ${PORT}`));
