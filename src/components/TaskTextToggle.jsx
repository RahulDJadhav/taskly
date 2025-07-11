import React, { useState } from 'react';

const TaskTextToggle = ({ text, maxLength = 30 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div
    style={{
      overflow: 'hidden',
      transition: 'height 0.3s ease',
      height: isExpanded ? '40px' : 'auto', // Adjust height as needed
    }}
  >
    <span>
      {displayText}
      {shouldTruncate && (
        <>
          {!isExpanded ? '... ' : ' '}
          <span 
            onClick={() => setIsExpanded(!isExpanded)}  
            style={{ 
                color: 'blue',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'normal' 
            }} 
          >
            {isExpanded ? 'less' : 'more'}
          </span>
        </>
      )}
    </span>
    </div>
  );
};

export default TaskTextToggle;
