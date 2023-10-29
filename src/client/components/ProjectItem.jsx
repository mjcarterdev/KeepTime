import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from '../hooks/useRaisedShadow';

export const ProjectItem = ({ item }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      style={{ boxShadow, y }}
      className="border border-gray-600 border-solid min-h-12 bg-neutral-100"
    >
      {item.title}
    </Reorder.Item>
  );
};

export default ProjectItem;
