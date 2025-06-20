import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faList, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './TaskFilterCard.module.css';

const TaskFilterCard = () => {

  let taskItems = ["All", "My Task", "Favorites", "Done", "Deleted"];
  let taskItemCounts = [10, 5, 3, 8, 2];
  
  // Use actual icons instead of string names
  const taskIcons = [faList, farStar, farHeart, faSquareCheck, faTrash];

  return (
    <div className="card shadow-sm rounded-4 p-3 w-75 border-0">
      <ul className="list-group list-group-flush">
        {
          taskItems.map((task, index) => (
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${styles.taskItem}`} >
              <div>
                <FontAwesomeIcon icon={taskIcons[index]} className="me-2" />
                {task}
              </div>
              <span className={`badge rounded-pill ${styles.taskBadge}`}>{taskItemCounts[index]}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default TaskFilterCard;