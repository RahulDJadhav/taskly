import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CreateTaskForm from './components/CreateTaskForm';
import './App.css';
import Login from './components/Login';

const App = () => {
  // tasks: Array holding all todo tasks
  const [tasks, setTasks] = useState([]);

  // editingTask: Holds the task being edited (for the modal).
  const [editingTask, setEditingTask] = useState(null);

  // successMessage: Stores a message to show after actions (add, edit, delete, done).
  const [successMessage, setSuccessMessage] = useState('');

  // formRef: Reference to control the Create/Edit Task modal.
  const formRef = useRef();

  // isLoggedIn: Tracks if the user is logged in.
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // useEffect: On first render, loads tasks from localStorage (if any) and sets them in state.
  useEffect(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    console.log('Loaded from storage:', storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  // useEffect: Every time tasks changes, saves the updated tasks array to localStorage.
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
    console.log('Saved to storage:', tasks);
  }, [tasks]);

  // CREATE
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setSuccessMessage('Task Created Successfully!');
    setTimeout(() => setSuccessMessage(''), 1000);
  };

  // DELETE
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    setSuccessMessage('Task Deleted Successfully!');
    setTimeout(() => setSuccessMessage(''), 1000);
  };

  // UPDATE
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSuccessMessage('Task Updated Successfully!');
    setTimeout(() => setSuccessMessage(''), 1000);
    setEditingTask(null); // Clear editing state after update
  };

  // EDIT: Open modal with task data
  const handleEditTask = (task) => {
    setEditingTask(task);
    formRef.current.openModal(task);
  };

  // When creating, open modal with no task
  const handleOpenCreate = () => {
    setEditingTask(null);
    formRef.current.openModal();
  };

  // Done
  const handleDoneTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => (task.id === id ? { ...task, status: 'Done' } : task))
    );
    setSuccessMessage('Task Done Successfully!');
    setTimeout(() => setSuccessMessage(''), 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  // Purpose: If the user is not logged in, show the login page.
  // After login: The main app is rendered.
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  return (
    <div className="d-flex flex-column body" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header onAddClick={handleOpenCreate} onLogout={handleLogout} />

      {/* Body: Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="col-md-2 p-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="row mb-3">
            <div className="col">
              {successMessage && (
                <div className="taskSuccess">
                  {successMessage}
                </div>

              )}
              <MainContent
                tasks={tasks}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onDone={handleDoneTask}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Create Task Modal */}
      <CreateTaskForm
        ref={formRef}
        onSubmit={handleAddTask}
        onUpdate={handleUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;
