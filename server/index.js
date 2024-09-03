const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo.js'); // Ensure the path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rushi:0oo7DHVHSWquEZx9@cluster0.v2lfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Get all tasks
app.get('/get', async (req, res) => {
    try {
        const result = await Todo.find();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
});

// Add a new task
app.post('/add', async (req, res) => {
    const { task } = req.body;
    try {
        const result = await Todo.create({ task });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add task', details: err.message });
    }
});

// Update task completion status
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task', details: err.message });
    }
});

// Delete a task
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Todo.findByIdAndDelete(id);
        res.json({ message: 'Task deleted', result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task', details: err.message });
    }
});

// Start server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
