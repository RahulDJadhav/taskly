import React, { useState, useEffect } from 'react';
import styles from './TodoListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faSquare } from '@fortawesome/free-solid-svg-icons';
import TaskOptions from './TaskOptions';
import TaskTextToggle from './TaskTextToggle';

const TodoListCard = ({ data, onEdit, onDelete, onDone, onToggleFavorite }) => {


  if (data.length === 0) {
    return <div className="row d-flex align-items-center">
      <div className="col text-center">
        <p className="text-muted">No tasks available. Please add a new task.</p>
      </div>
    </div>;
  }

  return (
    <div className="container">
      {data.map(task => (
        <div key={task.id} className={`row d-flex align-items-center mb-3 ${styles.todoList}`}>
          <div className="col-md-1">
            <div className="form-check d-flex align-items-center">
              {/* <input
                className={`form-check-input me-2 ${styles.checkbox}`}
                type="checkbox"
                id={`check-${task.id}`}
              /> */}
              <input
                className={`form-check-input me-2 ${styles.checkbox}`}
                type="checkbox"
                id={`check-${task.id}`}
                checked={task.status === 'Done'} // Check if task is 'Done'
                onChange={() => onDone && onDone(task.id)} // Call onDone when checkbox is clicked
              />
              <FontAwesomeIcon icon={farStar} className="me-2" />
              {/* 3. Make the Heart icon toggle Favorite status */}
              <FontAwesomeIcon
                icon={task.isFavorite ? farHeart : farHeart} // Use solid heart if favorite, outlined if not
                className="me-2"
                style={{ cursor: 'pointer', color: task.isFavorite ? '#ff69b4' : '#6c757d' }} // Pink for favorited, grey for not
                onClick={() => onToggleFavorite && onToggleFavorite(task.id)} // Call handler on click
              />
            </div>
          </div>
          <div className="col-md-10 d-flex  justify-content-evenly">
            <span className={`fw-semibold `}>{task.title}</span>
            {/* <span className={`text-muted small me-3 `}>{task.dueDate}</span>  // Comment this line bcz I dont want to show due date */}
            <span className={`text-muted small me-3 `}><TaskTextToggle text={task.description} maxLength={20} /></span>
            <span 
                className={`badge 
                ${task.priority === 'Urgent' ? 'bg-danger' 
                 : task.priority === 'High' ? 'bg-warning' 
                 : task.priority === 'Medium' ? 'bg-success' 
                 : 'bg-secondary' 
                } `}
                 >{task.priority}
            </span>
            <span className={`text-muted small `}>{task.status}</span>
            <span className={`text-muted small `}>{task.assignee}</span>
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <TaskOptions
              onEdit={() => onEdit && onEdit(task)}
              onDelete={() => onDelete && onDelete(task.id)}
              onDone={() => onDone && onDone(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default TodoListCard;