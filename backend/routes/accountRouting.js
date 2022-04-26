const express = require('express');

const accounts = require('../controllers/accountController');

const router = express.Router();

router.post('/login', accounts.login);




module.exports = router;