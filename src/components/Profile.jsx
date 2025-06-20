import React, { useState } from 'react';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className={`d-flex align-items-center justify-content-between ${styles.profile}`}>
        <div className="d-flex align-items-center">
          <img
            src=""
            alt="Profile"
            className={`img-fluid rounded-circle me-3 ${styles.profileImage}`}
          />
          <div>
            <span className={`fw-semibold ${styles.profileName}`}>Rahul Jadhav</span>
            <p className="text-muted mb-0 small">Developer</p>
          </div>
        </div>
        <FontAwesomeIcon  icon={faEdit}  className="text-primary cursor-pointer" onClick={toggleForm}  />
      </div>
      
    </div>
  );
}
