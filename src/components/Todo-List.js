import React, { useState, useEffect } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import '../app.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Auto-clear popup after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAddTask = () => {
  const trimmedTask = task.trim();

  // 1. Check empty
  if (!trimmedTask) {
    setMessage('Please enter a task.');
    return;
  }

  // 2. Check length
  if (trimmedTask.length < 3) {
    setMessage('Task is too short (min 3 characters).');
    return;
  }
  if (trimmedTask.length > 100) {
    setMessage('Task is too long (max 100 characters).');
    return;
  }

  // 3. Check allowed characters (letters, numbers, spaces, basic punctuation)
  const validPattern = /^[a-zA-Z0-9 .,!?-]+$/;
  if (!validPattern.test(trimmedTask)) {
    setMessage('Task contains invalid characters.');
    return;
  }

  // 4. Optional: Check for duplicate (case-insensitive)
  const duplicate = tasks.some(t => t.text.toLowerCase() === trimmedTask.toLowerCase());
  if (duplicate) {
    setMessage('This task already exists.');
    return;
  }

  // Passed all validations — add task
  const newTask = { id: Date.now(), text: trimmedTask, completed: false };
  setTasks([...tasks, newTask]);
  setTask('');
  setMessage('Task added!');
};


  const handleToggle = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
    setMessage('Task marked as completed!');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setMessage('Task removed!');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h2><FaClipboardList style={{ marginRight: '8px' }} /> To-Do List</h2>

      {message && <div className="popup">{message}</div>}

      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filter-section">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(t => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            <span onClick={() => handleToggle(t.id)}>{t.text}</span>
            <button onClick={() => handleDelete(t.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
