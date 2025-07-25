import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CreateTaskForm from './components/CreateTaskForm';
import './App.css';
import Login from './components/Login';


const App = () => {

  const API_BASE = 'http://localhost/taskly/taskly/backend/';
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
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE}getTasks.php`)
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddTask = (newTask) => {
    const taskWithDefaults = {
      ...newTask,
      due_date: newTask.dueDate, // Ensure snake_case for backend
      is_important: false,
      is_favorite: false,
      is_done: false,
    };

    fetch(`${API_BASE}addTask.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskWithDefaults)
    })
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        if (data.message.includes("successfully")) {
          // Re-fetch tasks only on success
          fetch(`${API_BASE}getTasks.php`)
            .then(res => res.json())
            .then(data => {
              setTasks(data);
              setSuccessMessage("Task Created Successfully!");
              setTimeout(() => setSuccessMessage(""), 1000);
            });
        } else {
          // Server returned an error message
          console.error("Server Error:", data.message);
          alert(`Error: ${data.message}`);
        }
      })
      .catch(error => {
        console.error("Error adding task:", error);
        alert("Something went wrong while adding the task.");
      });
  };

  // UPDATE
  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await fetch(`${API_BASE}updateTask.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updatedTask,
          due_date: updatedTask.dueDate // Ensure snake_case for backend
        })
      });

      const result = await res.json();

      if (result.message && result.message.toLowerCase().includes("success")) {
        // Refresh task list
        const taskRes = await fetch(`${API_BASE}getTasks.php`);
        const data = await taskRes.json();
        setTasks(data);
        setSuccessMessage("Task updated successfully!");
        setTimeout(() => setSuccessMessage(""), 1000);
      } else {
        alert("Something went wrong while updating the task.");
      }

    } catch (error) {
      console.error("Error updating task:", error);
      alert("Something went wrong.");
    }
  };

  // DELETE
  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}deleteTask.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (result.message && result.message.toLowerCase().includes("success")) {
        // Refresh the task list
        const taskRes = await fetch(`${API_BASE}getTasks.php`);
        const data = await taskRes.json();
        setTasks(data);
        setSuccessMessage("Task deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 1000);
      } else {
        alert("Something went wrong: " + result.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the task.");
    }
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
  // const handleDoneTask = (id) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map(task => {
  //       if (task.id === id) {
  //         // Toggle the status: if 'Done', set to 'Open', otherwise set to 'Done'
  //         const newStatus = task.status === 'Done' ? 'Open' : 'Done';
  //         setSuccessMessage(`Task marked as ${newStatus} Successfully!`); // Update success message
  //         return { ...task, status: newStatus };
  //       }
  //       return task;
  //     })
  //   );
  //   setSuccessMessage('Task Done Successfully!');
  //   setTimeout(() => setSuccessMessage(''), 1000);
  // };
  // const handleDoneTask = async (id, isCurrentlyDone) => {
  //   const newDoneStatus = (Number(isCurrentlyDone) === 1) ? 0 : 1;

  //   const confirmMessage = newDoneStatus === 1
  //     ? "Are you sure you want to mark this task as Done?"
  //     : "Are you sure you want to mark this task as Open?";

  //   if (!window.confirm(confirmMessage)) {
  //     return; // User cancelled
  //   }

  //   try {
  //     const res = await fetch(`${API_BASE}updateStatus.php`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id, is_done: newDoneStatus })
  //     });
  //     const result = await res.json();
  //     if (result.message === 'Done status updated') {
  //       const taskRes = await fetch(`${API_BASE}getTasks.php`);
  //       const data = await taskRes.json();
  //       setTasks(data);
  //       // setSuccessMessage(`Task marked as ${newDoneStatus ? 'Done' : 'Open'} successfully!`);
  //       setSuccessMessage(
  //         (Number(isCurrentlyDone) === 1)
  //           ? "Task marked as Open successfully!"
  //           : "Task marked as Done successfully!"
  //       );
  //       setTimeout(() => setSuccessMessage(''), 1000);
  //     } else {
  //       throw new Error(result.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Failed to update task done status');
  //   }
  // };

  const handleDoneTask = async (id, isCurrentlyDone) => {
    const newDoneStatus = Number(isCurrentlyDone) === 1 ? 0 : 1;
    const newStatus = newDoneStatus === 1 ? 'Completed' : 'Open';

    const confirmMessage = newDoneStatus === 1
      ? "Are you sure you want to mark this task as Done?"
      : "Are you sure you want to mark this task as Open?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}updateStatus.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_done: newDoneStatus, status: newStatus })
      });

      const result = await res.json();

      if (result.message && result.message.toLowerCase().includes("updated")) {
        const taskRes = await fetch(`${API_BASE}getTasks.php`);
        const data = await taskRes.json();
        setTasks(data);

        setSuccessMessage(
          newDoneStatus === 1
            ? "Task marked as Done and Completed successfully!"
            : "Task reopened and status set to Open."
        );
        setTimeout(() => setSuccessMessage(''), 1000);
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update task status');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleToggleImportant = async (id, isCurrentlyImportant) => {
    const newImportantStatus = isCurrentlyImportant ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}toggleImportant.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_important: newImportantStatus })
      });
      const result = await res.json();
      if (res.ok && result.message === 'Important status updated') {
        // Re-fetch tasks to update UI
        const taskRes = await fetch(`${API_BASE}getTasks.php`);
        const data = await taskRes.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // Optional: clear success message when filter changes
    setSuccessMessage('');
  };

  // Toggle Favorite status
  // const handleToggleFavorite = (id) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map(task =>
  //       task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
  //     )
  //   );
  //   setSuccessMessage('Task favorite status updated!');
  //   setTimeout(() => setSuccessMessage(''), 1000);
  // };
  const handleToggleFavorite = async (id, isCurrentlyFavorite) => {
    const newFavoriteStatus = isCurrentlyFavorite ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}toggleFavorite.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_favorite: newFavoriteStatus })
      });
      const result = await res.json();
      if (res.ok && result.message === 'Favorite status updated') {
        // Re-fetch tasks to update UI
        const taskRes = await fetch(`${API_BASE}getTasks.php`);
        const data = await taskRes.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    }
  };






  // Calculate dynamic counts for TaskFilterCard
  const allTasksCount = tasks.length;
  const importantTasksCount = tasks.filter(task => task.is_important).length;
  const favoritesCount = tasks.filter(task => task.is_favorite).length;
  const doneTasksCount = tasks.filter(task => task.is_done).length;
  const dueSoonTasksCount = tasks.filter(task => {
    if (!task.due_date || task.is_done) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999);
    const taskDueDate = new Date(task.due_date);
    taskDueDate.setHours(0, 0, 0, 0);
    return taskDueDate >= today && taskDueDate <= sevenDaysFromNow;
  }).length;

  const taskCounts = {
    "All": allTasksCount,
    "Important": importantTasksCount,
    "Favorites": favoritesCount,
    "Done": doneTasksCount,
    "Due Soon": dueSoonTasksCount,
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
                onToggleFavorite={handleToggleFavorite}
                onToggleImportant={handleToggleImportant}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                taskCounts={taskCounts}
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
