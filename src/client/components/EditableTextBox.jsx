import React, { useState } from 'react';

const EditableText = ({
  initialText,
  className,
  editboxClassName,
  showEdit,
  showEditFn,
  updateProjectFn,
  updateSubtaskFn,
  isProject,
  item,
}) => {
  const [text, setText] = useState(initialText);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (isProject) {
      if (item.title !== text) {
        updateProjectFn.mutate({ projectId: item.id, title: text });
      }
    } else {
      updateSubtaskFn.mutate({ id: item.id, title: text });
    }
    showEditFn(false);
  };

  return (
    <div className={`cursor-default ${className}`}>
      {showEdit ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          className={`${editboxClassName} w-[90%] p-2 pl-2 bg-white border border-accent rounded-md shadow-md input-ghost bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-10px focus:outline-accent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] text-start`}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
