import React, { useState } from 'react';
import CategoryControls from './CategoryControls';
import TodoListCard from './TodoListCard';
import TaskFilterCard from './TaskFilterCard';

// 1. Accept new props: activeFilter, onFilterChange, taskCounts
const MainContent = ({ tasks, onDelete, onEdit, onDone, onToggleFavorite, activeFilter, onFilterChange, taskCounts }) => {

  // 2. Filter tasks based on activeFilter
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'All') {
      return true; // Show all tasks
    }
    if (activeFilter === 'Done') {
      return task.status === 'Done'; // Show only tasks with status 'Done'
    }
    if (activeFilter === 'My Task') {
      // Assuming 'My Task' means tasks assigned to 'Rahul Jadhav' AND not yet 'Done'
      return task.assignee === 'Rahul Jadhav' && task.status !== 'Done';
    }
    if (activeFilter === 'Favorites') {
      return task.isFavorite === true; // Show only favorited tasks
    }
    // Add logic for 'Deleted' here if you introduce a 'deleted' status later
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
        />
      </div>

      {/* Filter Sidebar */}
      <div className="col-md-3 d-flex justify-content-center">
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