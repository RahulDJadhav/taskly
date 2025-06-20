import React, { useState, useEffect } from 'react';

const LocalStorageExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem('myData');
    if (stored) {
      setSavedValue(stored);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save data to localStorage
  const handleSave = () => {
    localStorage.setItem('myData', inputValue);
    setSavedValue(inputValue); // Update screen immediately
  };

  return (
    <div className="container mt-4">
      <h2>LocalStorage Example</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Type something"
      />
      <button onClick={handleSave} className="btn btn-primary mb-3">Save to localStorage</button>
      <h4>Stored Value:</h4>
      <p>{savedValue || 'No data stored yet'}</p>
    </div>
  );
};

export default LocalStorageExample;
