// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// const AddButton = ({ label, onClick }) => {
//   return (
//     <button className="btn text-white d-flex align-items-center" style={{ backgroundColor: '#4d46e1' }} onClick={onClick}>
//       <FontAwesomeIcon className="me-2" />
//       {label}
//     </button>
//   );
// };

// export default AddButton;
export default function AddButton({
  onClick,
  className = '',
  label,
  text,           // support both text and label
  type = 'button',
  style = {},
  ...restProps     // support other props like disabled, id, etc.
}) {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      style={style}
      onClick={onClick}
      {...restProps}
    >
      {label || text}
    </button>
  );
}