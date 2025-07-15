import React, { useState, useEffect } from 'react';
import styles from './TodoListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // filled
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // outlined
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
        <div key={task.id} className={`row d-flex align-items-center mb-3 ${styles.todoList}  ${task.priority === 'Urgent' ? 'border border-danger border-2' 
        : task.priority === 'High' ? 'border border-warning border-2' 
        : task.priority === 'Medium' ? 'border border-success border-2' 
        : 'border border-secondary border-2' 
       }`}>
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
  icon={task.isFavorite ? solidHeart : regularHeart}
  className="me-2"
  style={{ cursor: 'pointer', color: task.isFavorite ? '#ff69b4' : '#6c757d' }}
  onClick={() => onToggleFavorite && onToggleFavorite(task.id, task.isFavorite)}
/>
            </div>
          </div>
          <div className="col-md-10 d-flex  justify-content-between align-items-center">
            <span className={`fw-semibold ${styles.fixedWidth}`}><TaskTextToggle text={task.title} maxLength={15} /></span>
            {/* <span className={`text-muted small me-3 `}>{task.dueDate}</span>  // Comment this line bcz I dont want to show due date */}
            <span className={`text-muted small  ${styles.fixedWidth}`}><TaskTextToggle text={task.description} maxLength={20} /></span>
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