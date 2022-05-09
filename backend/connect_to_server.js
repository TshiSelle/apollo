// NODE MODULES
const mongoose = require("mongoose")
const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');


const page = require('./routes/pageRouting');
const verifyJWT = require('./middleware/TokenVerification');
const { verifyLoggedInUser } = require('./helpers/verifyToken');
const { getUser } = require('./controllers/userController');


//Configuring the environment variable for the mongo URI connection string
dotenv.config();

//creating the express app
const app = express();


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to access url encoded form request bodies with req.body
app.use(helmet());                                    //secure app by setting http headers
app.use(hpp());                                       //prevent http parameter pollution
app.use(cors());                                      //enable cross-origin resource sharing



//Port to be used for requests
const PORT = process.env.PORT;

//connection String to mongoDB via URI
const mongoURI = process.env.MONGO_URI_STRING;

//async function to connecto the DB using mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Apollo Server is listening on port ${PORT}`)))
  .catch((err) => console.log(err));

// Routing
app.use('/page', verifyJWT, page);
app.get('/verifyToken', verifyLoggedInUser);
app.get('/user-info', verifyJWT, getUser);


// Unexpected URLs
app.use('*', (req, res) => {
  res.status(404).send(`Resource not found, "${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}" 
  is not a valid url`);
});