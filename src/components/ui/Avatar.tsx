import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ 
  src, 
  alt = "Avatar", 
  fallback, 
  size = 'md',
  className 
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);
  
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };
  
  const getFallbackInitials = () => {
    return fallback
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className={cn(
      "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200",
      sizes[size],
      className
    )}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-medium text-gray-600">
          {getFallbackInitials()}
        </span>
      )}
    </div>
  );
}