import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'green' | 'none';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick,
  style
}) => {
  const glowClass = 
    glowColor === 'cyan' ? 'cyan-glow-hover' :
    glowColor === 'green' ? 'green-glow-hover' : '';

  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-panel rounded-lg p-6 transition-all duration-300 border border-cyber-border ${glowClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
