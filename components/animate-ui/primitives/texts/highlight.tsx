'use client';

import { motion, useReducedMotion } from 'framer-motion';

export interface HighlightTextProps {
  text: string;
  delay?: number;
  className?: string;
  textClassName?: string;
}

export function HighlightText({ text, delay = 0, className = '', textClassName = '' }: HighlightTextProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`highlight-text ${className}`}>
      <motion.span
        aria-hidden="true"
        className="highlight-text-mark"
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ amount: 0.8, once: false }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className={`highlight-text-content ${textClassName}`}>{text}</span>
    </span>
  );
}
