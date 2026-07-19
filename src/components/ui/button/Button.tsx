import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export default function Button({
  variant = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantClass = styles[`variant_${variant}`] || styles.variant_default;
  const computedClassName =
    `${styles.button} ${variantClass} ${className}`.trim();

  return (
    <button className={computedClassName} {...props}>
      {children}
    </button>
  );
}
