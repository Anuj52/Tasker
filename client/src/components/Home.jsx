import React, { useState, useEffect } from 'react';

function ToDoFast() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('todo')) || []);
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [todo, notes]);

  const addTask = () => {
    if (newTask.trim()) {
      setTodo([...todo, { text: newTask.trim(), disabled: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTodo = [...todo];
    updatedTodo[index].disabled = !updatedTodo[index].disabled;
    setTodo(updatedTodo);
  };

  const deleteAllTasks = () => {
    setTodo([]);
  };

  const editTask = (index, newText) => {
    const updatedTodo = [...todo];
    updatedTodo[index].text = newText;
    setTodo(updatedTodo);
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">To-do list</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Add</button>
        </div>
        <ul className="overflow-y-auto max-h-60 mb-4">
          {todo.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.disabled}
                  onChange={() => toggleTask(index)}
                  className="mr-2"
                />
                {item.disabled ? (
                  <s className="text-gray-500">{item.text}</s>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
              <button
                onClick={() => editTask(index, prompt('Edit task', item.text))}
                className="ml-2 text-blue-500 hover:underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-4">
          <span>{todo.length} items total</span>
          <button onClick={deleteAllTasks} className="text-red-500 hover:underline">Delete All</button>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Notes</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
          />
          <button onClick={addNote} className="bg-green-500 text-white px-4 py-2 rounded-r-md">Add Note</button>
        </div>
        <ul className="overflow-y-auto max-h-60">
          {notes.map((note, index) => (
            <li key={index} className="mb-2">{note}</li>
          ))}
        </ul>
      </section>
      <footer className="mt-4">
        <p className="text-white">Made By John Doe</p>
      </footer>
    </div>
  );
}

export default ToDoFast;
