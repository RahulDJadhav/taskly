import React, { useState } from 'react';
import CategoryControls from './CategoryControls';
import TodoListCard from './TodoListCard';
import TaskFilterCard from './TaskFilterCard';
const MainContent = ({ tasks, onDelete, onEdit, onDone }) => {
  // Pass the handlers down to TodoListCard

  return (
    <div className="row">
      {/* Task List Area */}
      <div className="col-md-9 h-75">
        <CategoryControls />
        <TodoListCard data={tasks} onEdit={onEdit}
          onDelete={onDelete} onDone={onDone} />
      </div>

      {/* Filter Sidebar */}
      <div className="col-md-3 d-flex justify-content-center h-75">
        <TaskFilterCard />

      </div>

    </div>


  );
};

export default MainContent;
