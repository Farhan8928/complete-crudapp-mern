const express = require('express');
const { createRecord, getRecords, getRecord, updateRecord, deleteRecord, bulkDeleteRecords } = require('../controllers/recordController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createRecord);
router.get('/', auth, getRecords);
router.get('/:id', auth, getRecord);
router.put('/:id', auth, updateRecord);
router.delete('/:id', auth, deleteRecord);
router.delete('/', auth, bulkDeleteRecords);

module.exports = router;
