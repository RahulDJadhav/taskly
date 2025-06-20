import React, { useState } from 'react';
import CategoryControls from './CategoryControls';
import TodoListCard from './TodoListCard';
import TaskFilterCard from './TaskFilterCard';
const MainContent = ({ tasks, onDelete, onEdit }) => {
  // Pass the handlers down to TodoListCard

  return (
    <div className="row">
      {/* Task List Area */}
      <div className="col-md-9">
        <CategoryControls />
        <TodoListCard data={tasks} onEdit={onEdit}
          onDelete={onDelete} />
      </div>

      {/* Filter Sidebar */}
      <div className="col-md-3 d-flex justify-content-center">
        <TaskFilterCard />

      </div>

    </div>


  );
};

export default MainContent;
