import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    });

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const res = await axios.get(`/api/tasks/${id}`);
                    setFormData(res.data);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            };

            fetchTask();
        }
    }, [id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/api/tasks/${id}`, formData);
            } else {
                await axios.post('/api/tasks', formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'Add Task'}</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={onChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={onChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <select 
                        name="status" 
                        value={formData.status} 
                        onChange={onChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                    <input 
                        type="date" 
                        name="dueDate" 
                        value={formData.dueDate} 
                        onChange={onChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {id ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
