"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedPage({ children, className, stagger = false }) {
  if (stagger) {
    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.05
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 16 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 140
        }
      }
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -20 }}
        className={className}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          // Render comments, null, or fragments safely
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
