import React, { useState, useEffect } from 'react';
import styles from './TodoListCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faSquare } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import TaskOptions from './TaskOptions';
import TaskTextToggle from './TaskTextToggle';

const TodoListCard = ({ data, onEdit, onDelete, onDone, onToggleFavorite, onToggleImportant }) => {


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
              <input
                className={`form-check-input me-2 ${styles.checkbox}`}
                type="checkbox"
                id={`check-${task.id}`}
                checked={!!task.is_done}
                onChange={() => onDone && onDone(task.id, task.is_done)}
              />
              {/* {console.log(`Task ID: ${task.id}, is_done: ${task.is_done}, checked: ${!!task.is_done}`)} */}
              <FontAwesomeIcon
                icon={task.is_important ? solidStar : regularStar}
                style={{ color: task.is_important ? 'gold' : '#6c757d', cursor: 'pointer' }}
                onClick={() => onToggleImportant && onToggleImportant(task.id, task.is_important)}
              />
              <FontAwesomeIcon
                icon={task.is_favorite ? solidHeart : regularHeart}
                style={{ color: task.is_favorite ? 'red' : '#6c757d', cursor: 'pointer' }}
                onClick={() => onToggleFavorite && onToggleFavorite(task.id, task.is_favorite)}
              />
            </div>
          </div>
          <div className="col-md-10 d-flex  justify-content-between align-items-center">
            <span className={`fw-semibold ${styles.fixedWidth}`}><TaskTextToggle text={task.title} maxLength={15} /></span>
            <span className={`text-muted small me-3 `}>{task.dueDate}</span>
            <span className={`text-muted small  ${styles.fixedWidth}`}><TaskTextToggle text={task.description} maxLength={20} /></span>
            <span className={`badge 
              ${task.priority === 'Urgent' ? 'bg-danger'
                : task.priority === 'High' ? 'bg-warning'
                  : task.priority === 'Medium' ? 'bg-success'
                    : 'bg-secondary'
              } `}>{task.priority}</span>
            <span className={`text-muted small `}>{task.status}</span>

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