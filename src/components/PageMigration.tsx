import { motion } from 'motion/react';
import { type ReactNode, useEffect, useState } from 'react';

interface PageMigrationProps {
  children: ReactNode;
}

export default function PageMigration({ children }: PageMigrationProps) {
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  useEffect(() => {
    // ナビゲーション方向を検知
    const handleNavigation = () => {
      setDirection('back');
    };

    // 通常のリンククリックは forward
    const handleClick = () => {
      setDirection('forward');
    };

    window.addEventListener('popstate', handleNavigation);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <motion.div
      key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}