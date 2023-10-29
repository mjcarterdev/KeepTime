import { Reorder } from 'framer-motion';
import { useState } from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ data }) => {
  const [items, setItems] = useState([...data]);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="min-w-full"
    >
      {items.map((item) => {
        <ProjectItem key={item.id} item={item} />;
      })}
    </Reorder.Group>
  );
};

export default ProjectList;
