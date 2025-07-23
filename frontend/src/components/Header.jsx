import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import AddButton from './AddButton';
import CreateTaskForm from './CreateTaskForm';


const Header = ({ onAddClick, onLogout }) => {

  return (
    <nav className="navbar navbar-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">


        <span className="navbar-brand mb-0 h1" style={{ color: '#4d46e1' }}><FontAwesomeIcon icon={faTasks} size="1x" /> Taskly</span>


        <form className="d-flex w-50 mx-3 col-md-4">
          <input className="form-control me-2" type="search" placeholder="Search tasks..." aria-label="Search" />
        </form>

        <div className='d-flex align-items-center justify-content-end'>
          <AddButton label='Add Task' onClick={onAddClick} className="me-4 btn-primary-taskly" />
          <FontAwesomeIcon icon={faBell} className="me-4" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => alert('Bell clicked!')} />

          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" style={{ cursor: 'pointer' }} title="Logout" onClick={onLogout} />
        </div>

      </div>
    </nav>
  );
};

export default Header;
