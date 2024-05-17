const express = require('express');
const { createList, uploadUsers } = require('../controllers/listsController');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

router.post('/', createList);
router.post('/:id', upload.single('file'), uploadUsers);

module.exports = router;
