import React, { useState } from 'react';

const TaskTextToggle = ({ text, maxLength = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <span>
      {displayText}
      {shouldTruncate && (
        <>
          {!isExpanded ? '... ' : ' '}
          <span onClick={() => setIsExpanded(!isExpanded)} style={{ color: 'blue', cursor: 'pointer' }} >
            {isExpanded ? 'less' : 'more'}
          </span>
        </>
      )}
    </span>
  );
};

export default TaskTextToggle;
