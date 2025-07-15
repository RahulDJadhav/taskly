import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  // Load from localStorage or use defaults
  const [name, setName] = useState(() => localStorage.getItem('profileName') || 'Rahul Jadhav');
  const [designation, setDesignation] = useState(() => localStorage.getItem('profileDesignation') || 'Developer');
  const [email, setEmailAddress] = useState(() => localStorage.getItem('emailAddress') || 'admin@xts.com');
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic') || '');
  const [showForm, setShowForm] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileDesignation', designation);
    localStorage.setItem('emailAddress', email);
    localStorage.setItem('profilePic', profilePic);
  }, [name, designation,email, profilePic]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <div>
      <div className={`d-flex align-items-center justify-content-between ${styles.profile}`}>
        <div className="d-flex align-items-center">
          <img
            src={profilePic || " "}
            alt="Profile"
            className={`img-fluid rounded-circle me-3 ${styles.profileImage}`}
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
          <div>
            <span className={`fw-semibold ${styles.profileName}`}>{name}</span>
            <p className="text-muted mb-0 small">{designation}</p>
          </div>
          
        </div>
        <FontAwesomeIcon icon={faEdit} className={`text-primary ${styles.profileEdit}`} onClick={() => setShowForm(true)} />
      </div>

      {/* Modal for editing profile */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h5>Edit Profile</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Designation</label>
                <input className="form-control" value={designation} onChange={e => setDesignation(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={e => setEmailAddress(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Profile Picture</label>
                <input className="form-control" type="file" accept="image/*" onChange={handlePicChange} />
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
