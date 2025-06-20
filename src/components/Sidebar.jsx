import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const sidebarItems = ['My Tasks', 'Completed', 'Analytics'];
  const sidebarIcons = [faList, faSquareCheck, faTrash];

  return (
    <div className="p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <Profile />
      <h6 className="ps-2 text-muted mt-3">Menu</h6>
      <ul className="nav flex-column">
        {sidebarItems.map((task, index) => (
          <li key={index} className={`nav-item ${styles.sidebarItem}`}>
            <a className={`nav-link d-flex align-items-center ${styles.sidebarItem}`} >
              <FontAwesomeIcon icon={sidebarIcons[index]} className="me-2" />
              {task}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
