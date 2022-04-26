// NODE MODULES
const mongoose = require("mongoose")
const express = require('express')
const dotenv = require('dotenv')


//Configuring the environment variable for the mongo URI connection string
dotenv.config();

//creating the express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to access url encoded form request bodies with req.body

//Port to be used for requests
const PORT = process.env.PORT;

//connection String to mongoDB via URI
const mongoURI = process.env.MONGO_URI_STRING;

//async function to connecto the DB using mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Apollo Server is listening on port ${PORT}`)))
  .catch((err) => console.log(err));

  
// Unexpected URLs
app.use('*', (req, res) => {
  res.status(404).send(`Resource not found, "${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}" 
  is not a valid url`);
});