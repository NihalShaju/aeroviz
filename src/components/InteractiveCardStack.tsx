/**
 * InteractiveCardStack Component
 * A premium, smooth, and interactive card stack with drag-to-back physics.
 * Supports random rotation, autoplay, and mobile interactions.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'framer-motion';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [25, -25]);
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export interface InteractiveCardStackProps {
  /** Array of card contents */
  cards?: React.ReactNode[];
  /** Enable random rotation for each card */
  randomRotation?: boolean;
  /** Sensitivity for the drag-to-back action (pixels) */
  sensitivity?: number;
  /** Whether clicking a card sends it to the back */
  sendToBackOnClick?: boolean;
  /** Spring animation configuration */
  animationConfig?: { stiffness: number; damping: number };
  /** Enable automatic cycling of cards */
  autoplay?: boolean;
  /** Delay between cycles in milliseconds */
  autoplayDelay?: number;
  /** Pause autoplay when hovering */
  pauseOnHover?: boolean;
  /** Disable drag on mobile devices and only allow clicks */
  mobileClickOnly?: boolean;
  /** Viewport width breakpoint for mobile detection */
  mobileBreakpoint?: number;
  /** Custom class for the container */
  className?: string;
}

export function InteractiveCardStack({
  cards = [],
  randomRotation = false,
  sensitivity = 180,
  sendToBackOnClick = false,
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  className = ""
}: InteractiveCardStackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Initialize stack with IDs to track items correctly
  const [stack, setStack] = useState<{ id: string; content: React.ReactNode; randomRot: number }[]>([]);
  const prevCardsLengthRef = useRef(cards.length);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (cards.length > 0) {
      setStack(cards.map((content, index) => ({
        id: `card-${index}`,
        content,
        randomRot: randomRotation ? (Math.random() * 8 - 4) : 0
      })));
    }
  }, [cards.length, randomRotation]);

  const sendToBack = (id: string) => {
    setStack(prev => {
      const index = prev.findIndex(card => card.id === id);
      if (index === -1) return prev;
      
      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);
      
      // Update random rotation for the card when it goes to back
      const updatedCard = {
        ...card,
        randomRot: randomRotation ? (Math.random() * 8 - 4) : 0
      };
      
      newStack.unshift(updatedCard);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setStack(current => {
          if (current.length <= 1) return current;
          const topCard = current[current.length - 1];
          const newStack = [...current];
          newStack.pop();
          newStack.unshift({
            ...topCard,
            randomRot: randomRotation ? (Math.random() * 8 - 4) : 0
          });
          return newStack;
        });
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack.length, isPaused, randomRotation]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  if (stack.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence>
        {stack.map((card, index) => {
          // index 0 is bottom, stack.length - 1 is top
          const isTop = index === stack.length - 1;
          const depth = stack.length - 1 - index;
          
          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={!isTop || shouldDisableDrag}
            >
              <motion.div
                className="rounded-2xl overflow-hidden w-full h-full bg-white border border-slate-200 shadow-xl"
                onClick={(e) => {
                  // Only send to back if click wasn't on an anchor / button
                  const target = e.target as HTMLElement;
                  if (target.closest('a') || target.closest('button')) {
                    return;
                  }
                  if (isTop && shouldEnableClick) {
                    sendToBack(card.id);
                  }
                }}
                style={{
                  zIndex: index,
                }}
                animate={{
                  rotateZ: depth * -2.5 + card.randomRot,
                  scale: 1 - depth * 0.04,
                  y: depth * -10,
                  opacity: depth > 3 ? 0 : 1 - depth * 0.12,
                  transformOrigin: 'center center'
                }}
                transition={{
                  type: 'spring',
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping
                }}
              >
                {card.content}
              </motion.div>
            </CardRotate>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default InteractiveCardStack;
