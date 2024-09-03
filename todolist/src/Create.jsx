import React, { useState } from 'react';
import axios from 'axios';

function Create({ fetchTodos }) {
    const [task, setTask] = useState(''); // Initialize state with an empty string
    const [error, setError] = useState(''); // State for error message
    const [success, setSuccess] = useState(''); // State for success message

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task })
            .then(result => {
                setSuccess('Task added successfully!');
                setTask(''); // Clear the input field
                setError('');
                fetchTodos(); // Refresh the list after adding
            })
            .catch(err => {
                setError('Failed to add task.');
                setSuccess('');
            });
    };

    return (
        <div className="create_form"> {/* Apply the 'create_form' class */}
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={handleAdd}>Add</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default Create;
