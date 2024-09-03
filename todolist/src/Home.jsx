import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'; // Importing the delete icon

function Home() {
    const [todos, setTodos] = useState([]); // Ensure todos is initialized as an empty array

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => {
                // Ensure that result.data is an array
                if (Array.isArray(result.data)) {
                    setTodos(result.data);
                } else {
                    setTodos([]); // Default to an empty array if data is not in expected format
                }
            })
            .catch(err => console.log(err));
    };

    const handleComplete = (id, completed) => {
        axios.put(`http://localhost:3001/update/${id}`, { completed: !completed })
            .then(() => fetchTodos())  // Refresh the list after updating
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => fetchTodos())  // Refresh the list after deleting
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>TO DO LIST</h2>
            <Create fetchTodos={fetchTodos} />
            {todos.length === 0 ? (
                <div><h3>No tasks found</h3></div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleComplete(todo._id, todo.completed)}
                        />
                        <span>{todo.task}</span>
                        <button className="delete-btn" onClick={() => handleDelete(todo._id)}>
                            <FaTrashAlt />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
