import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  // Load from localStorage or use defaults
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'Rahul Jadhav');
  const [email, setEmailAddress] = useState(() => localStorage.getItem('userEmail') || 'admin@xts.com');
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic') || '');
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state for loading indicator

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('userName', name); // Corrected key
    localStorage.setItem('userEmail', email); // Corrected key
    localStorage.setItem('profilePic', profilePic);
  }, [name, email, profilePic]);

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
    setIsSaving(true); // Set saving to true when form is submitted
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage

    if (!userId) {
      console.error("User ID not found in localStorage.");
      setIsSaving(false); // Reset saving state
      return;
    }

    // Prepare data to send to backend
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('name', name);
    // Optionally, handle profile picture if a new one is selected
    // if (newFile) { // Assuming 'newFile' state would exist if we had a modal
    //   formData.append('profilePic', newFile);
    // }

    fetch('http://localhost/taskly/backend/update_profile.php', {
      method: 'POST',
      body: formData,
      // Do not set Content-Type for FormData; browser sets it automatically
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Profile updated successfully:", data.message);
          // Update localStorage with new name
          localStorage.setItem('userName', name);
          // Optionally, show a temporary success message to the user
        } else {
          console.error("Error updating profile:", data.message);
          // Optionally, show a temporary error message to the user
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        // Optionally, show a temporary error message to the user
      })
      .finally(() => {
        setIsSaving(false); // Reset saving to false after fetch completes
        setShowForm(false); // Ensure form closes after operation
      });
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.profilePicContainer}>
        {profilePic ? (
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
        ) : (
          <div className={styles.profilePicPlaceholder}>No Image</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePicChange}
          className={styles.fileInput}
        />
      </div>
      {!showForm ? (
        <div className={styles.profileInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.email}>{email}</p>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.editIcon}
            onClick={() => setShowForm(true)}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={styles.inputField}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Email"
            className={styles.inputField}
            disabled // Disable the email field
          />
          <button type="submit" className={styles.primaryButton} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
}
