import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddButton = ({ label = "Add Task", onClick }) => {
  return (
    <button className="btn text-white d-flex align-items-center" style={{backgroundColor: '#4d46e1'}}  onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} className="me-2" />
      {label}
    </button>
  );
};

export default AddButton;
