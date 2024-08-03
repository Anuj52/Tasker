const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Route to get tasks
router.get('/', getTasks);

// Route to create a new task
router.post('/', createTask);

// Route to update a specific task
router.put('/:id', updateTask);

// Route to delete a specific task
router.delete('/:id', deleteTask);

module.exports = router;
