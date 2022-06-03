const express = require('express');
const Page = require('../controllers/pageController');
const router = express.Router();

router.post('/create', Page.addPage);
router.get('/read', Page.getPages);
router.patch('/update', Page.updatePage);
router.delete('/delete', Page.deletePage);

module.exports = router;