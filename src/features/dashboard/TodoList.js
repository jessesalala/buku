import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiPlus, 
  FiCheck, 
  FiSend,
  FiCalendar,
  FiClock,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import './TodoList.css'; // We'll create this CSS file

export default function TodoList() {
  const [tasks, setTasks] = useState({
    today: [],
    week: [],
    month: []
  });
  
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('today');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('today');

  // Load saved tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    // Request notification permission on first load
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const showNotification = (taskText) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Kumbuka Kazi Yako!', {
        body: `Bado hujakamilisha: ${taskText}`,
        icon: '/assets/icon-192.png'
      });
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: category === 'today' ? new Date().toISOString() : null
    };

    setTasks(prev => ({
      ...prev,
      [category]: [...prev[category], newTaskObj]
    }));

    // Set notification after 2 hours if not completed
    setTimeout(() => {
      const taskExists = tasks[category].some(t => t.id === newTaskObj.id && !t.completed);
      if (taskExists) showNotification(newTask);
    }, 7200000);

    setNewTask('');
  };

  const toggleTask = (id, listType) => {
    setTasks(prev => ({
      ...prev,
      [listType]: prev[listType].map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const deleteTask = (id, listType) => {
    setTasks(prev => ({
      ...prev,
      [listType]: prev[listType].filter(task => task.id !== id)
    }));
  };

  const handleSubmit = () => {
    const completedTasks = [...tasks.today, ...tasks.week, ...tasks.month].filter(t => t.completed);
    const pendingTasks = [...tasks.today, ...tasks.week, ...tasks.month].filter(t => !t.completed);
    
    // Here you would typically send to backend
    console.log('Completed tasks:', completedTasks);
    console.log('Pending tasks:', pendingTasks);
    
    alert('Taarifa za kazi zimehifadhiwa!');
  };

  const renderTaskItem = (task, listType) => (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox" onClick={() => toggleTask(task.id, listType)}>
        {task.completed ? <FiCheck className="check-icon" /> : <div className="empty-checkbox" />}
      </div>
      <div className="task-content">
        <span className="task-text">{task.text}</span>
        <div className="task-meta">
          {task.dueDate && (
            <span className="task-date">
              <FiClock /> {new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          )}
        </div>
      </div>
      <button 
        className="delete-btn"
        onClick={() => deleteTask(task.id, listType)}
      >
        &times;
      </button>
    </div>
  );

  return (
    <div className={`todo-app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="todo-header">
        <div className="header-left">
          <FiBell className="header-icon" />
          <h1>Orodha ya Kazi</h1>
        </div>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <div className="task-input-container">
        <input
          type="text"
          placeholder="Andika kazi mpya..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className="task-input"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="today"><FiClock /> Leo</option>
          <option value="week"><FiCalendar /> Wiki Hii</option>
          <option value="month"><FiCalendar /> Mwezi Huu</option>
        </select>
        <button onClick={addTask} className="add-btn">
          <FiPlus />
        </button>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Leo
        </button>
        <button 
          className={`tab ${activeTab === 'week' ? 'active' : ''}`}
          onClick={() => setActiveTab('week')}
        >
          Wiki
        </button>
        <button 
          className={`tab ${activeTab === 'month' ? 'active' : ''}`}
          onClick={() => setActiveTab('month')}
        >
          Mwezi
        </button>
      </div>

      <div className="task-lists">
        {activeTab === 'today' && (
          <div className="task-list">
            <h3 className="list-title">
              <FiClock /> Kazi za Leo ({tasks.today.filter(t => !t.completed).length})
            </h3>
            {tasks.today.length > 0 ? (
              tasks.today.map(task => renderTaskItem(task, 'today'))
            ) : (
              <p className="empty-message">Hakuna kazi za leo bado</p>
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="task-list">
            <h3 className="list-title">
              <FiCalendar /> Kazi za Wiki ({tasks.week.filter(t => !t.completed).length})
            </h3>
            {tasks.week.length > 0 ? (
              tasks.week.map(task => renderTaskItem(task, 'week'))
            ) : (
              <p className="empty-message">Hakuna kazi za wiki bado</p>
            )}
          </div>
        )}

        {activeTab === 'month' && (
          <div className="task-list">
            <h3 className="list-title">
              <FiCalendar /> Kazi za Mwezi ({tasks.month.filter(t => !t.completed).length})
            </h3>
            {tasks.month.length > 0 ? (
              tasks.month.map(task => renderTaskItem(task, 'month'))
            ) : (
              <p className="empty-message">Hakuna kazi za mwezi bado</p>
            )}
          </div>
        )}
      </div>

      <button onClick={handleSubmit} className="submit-btn">
        <FiSend /> Hifadhi Taarifa
      </button>
    </div>
  );
}