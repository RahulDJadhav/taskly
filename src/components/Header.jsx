import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import AddButton from './AddButton';
import CreateTaskForm from './CreateTaskForm';


const Header = ({onAddClick}) => {

return(
<nav className="navbar navbar-dark px-3">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    
   
    <span className="navbar-brand mb-0 h1 text-dark">TASK FLOW</span>
    
   
    <form className="d-flex w-50 mx-3 col-md-4">
      <input className="form-control me-2" type="search" placeholder="Search tasks..." aria-label="Search"/>
      {/* <button className="btn btn-outline-dark" type="submit">Search</button> */}
    </form>
    
    <div className='d-flex align-items-center'>
        <FontAwesomeIcon icon={faBell} className="me-4" style={{ cursor: 'pointer' }} onClick={() => alert('Bell clicked!')} />
        {/* <FontAwesomeIcon icon={faUser} className="me-4" style={{ cursor: 'pointer' }} onClick={() => alert('Profile clicked!')}/> */}
        <AddButton label='Add Task' onClick={onAddClick} className='me-4'/>
     </div>
    
  </div>
</nav>
);
};

export default Header;
