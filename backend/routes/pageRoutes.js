const express = require('express');
const pageController = require('../controllers/pageController');
const router = express.Router();

router.post('/create', pageController.addPage);
router.get('/read', pageController.getPages);
router.patch('/update', pageController.updatePage);
router.delete('/delete', pageController.deletePage);

module.exports = router;
