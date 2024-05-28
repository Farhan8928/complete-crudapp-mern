const express = require('express');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

// Create a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', getCategory);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
