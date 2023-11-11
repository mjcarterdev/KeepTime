import React, { useState } from 'react';
import { useDoubleTap } from 'use-double-tap';

const EditableText = ({
  initialText,
  className,
  showEdit = false,
  updateProjectFn,
  updateSubtaskFn,
  isProject,
  item,
}) => {
  const [isEditing, setIsEditing] = useState(showEdit);
  const [text, setText] = useState(initialText);
  const bind = useDoubleTap((event) => {
    setIsEditing(true);
  });

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (isProject) {
      if (item.title !== text) {
        updateProjectFn.mutate({ projectId: item.id, title: text });
      }
    } else {
      if (item.title !== text) {
        updateSubtaskFn.mutate({ id: item.id, title: text });
      }
    }

    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  return (
    <div {...bind} className={className}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          className="w-full p-2 pl-4 bg-white border border-gray-100 rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] text-start"
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
