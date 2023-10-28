import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBreakpoints } from '../hooks/useBreakpoint';

const transition = { duration: 4, yoyo: Infinity, ease: 'easeInOut' };

export default function AnimatedSun() {
  const { active } = useBreakpoints();
  console.log(active);
  let currentView;

  switch (active) {
    case 'xs':
      currentView = 'w-6 h-6 sun xssun';
      break;
    case 'sm':
      currentView = 'w-8 h-8 sun smsun';
      break;
    case 'md':
      currentView = 'w-10 h-10 sun mdsun';
      break;
    case 'lg':
      currentView = 'w-10 h-10 sun lgsun';
      break;
    default:
      currentView = 'w-8 h-8 lg:w-12 lg:h-12 sun';
      break;
  }

  return (
    <div className="absolute w-full -top-16">
      <motion.svg xmlns="http://www.w3.org/2000/svg" overflow="hidden" viewBox="0 0 0 0">
        <motion.path
          d="M 330 60 C 250 -90 0 -70 0 -70 "
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />
      </motion.svg>
      <motion.div
        className={currentView}
        initial={{ offsetDistance: '0%', scale: 1, opacity: 0.1 }}
        animate={{ offsetDistance: '100%', scale: 1, opacity: 1 }}
        transition={transition}
      />
    </div>
  );
}
