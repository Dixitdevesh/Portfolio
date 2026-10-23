import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'green' | 'default';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'default',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-sm border transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    cyan: "border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] bg-transparent",
    green: "border-cyber-green text-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_10px_rgba(0,255,102,0.3)] bg-transparent",
    default: "border-cyber-border text-cyber-dim hover:text-white hover:border-white hover:bg-white/5 bg-transparent"
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
