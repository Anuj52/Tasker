import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/api/tasks');
                setTasks(res.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="mb-2">
                        <div className="p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
