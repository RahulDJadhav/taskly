import React, { useState } from 'react';
import CategoryControls from './CategoryControls';
import TodoListCard from './TodoListCard';
import TaskFilterCard from './TaskFilterCard';

// 1. Accept new props: activeFilter, onFilterChange, taskCounts
const MainContent = ({ tasks, onDelete, onEdit, onDone, onToggleFavorite, activeFilter, onFilterChange, taskCounts, onToggleImportant }) => {

  // 2. Filter tasks based on activeFilter
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'All') {
      return true; // Show all tasks
    }
    if (activeFilter === 'Done') {
      return task.is_done;
    }
    if (activeFilter === 'Important') {
      return task.is_important;
    }
    if (activeFilter === 'Favorites') {
      return task.is_favorite; // Show only favorited tasks
    }
    if (activeFilter === 'Due Soon') { // <-- ADD THIS NEW FILTER LOGIC
      if (!task.dueDate || task.status === 'Done') return false; // Not due soon if no date or already done

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      sevenDaysFromNow.setHours(23, 59, 59, 999);

      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);

      // Task is due soon if its date is today or in future, and within 7 days, and not done
      return taskDueDate >= today && taskDueDate <= sevenDaysFromNow;
    }
    return true; // Default to show all if filter is unknown or not yet implemented
  });

  return (
    <div className="row">
      {/* Task List Area */}
      <div className="col-md-9">
        <CategoryControls />
        <TodoListCard
          data={filteredTasks} // Pass the FILTERED tasks to TodoListCard
          onEdit={onEdit}
          onDelete={onDelete}
          onDone={onDone}
          onToggleFavorite={onToggleFavorite} // Pass this down to TodoListCard
          onToggleImportant={onToggleImportant}
        />
      </div>

      {/* Filter Sidebar */}
      <div className="col-md-3 d-flex justify-content-center" style={{ height: '270px', marginTop: '55px', overflowY: 'auto' }}>
        <TaskFilterCard
          activeFilter={activeFilter}     // <-- Pass activeFilter to TaskFilterCard
          onFilterChange={onFilterChange} // <-- Pass onFilterChange to TaskFilterCard
          taskCounts={taskCounts}         // <-- Pass taskCounts to TaskFilterCard
        />

      </div>
    </div>
  );
};

export default MainContent;