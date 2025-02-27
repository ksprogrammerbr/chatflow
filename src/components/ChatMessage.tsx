import React from 'react';
import { cn } from '../utils/cn';
import { Avatar } from './ui/Avatar';
import { MessageSquare } from 'lucide-react';

interface ChatMessageProps {
  message: {
    type: string;
    userId: string;
    userName: string;
    message?: string;
    timestamp?: string;
  };
  isCurrentUser: boolean;
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
          {message.message}
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "flex items-start gap-2 mb-4",
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      {!isCurrentUser ? (
        <Avatar 
          fallback={message.userName} 
          size="sm"
          className={cn(
            "mt-1",
            message.userId === 'system' && "bg-gray-300"
          )}
        />
      ) : null}
      
      <div className={cn(
        "flex flex-col max-w-[75%]",
        isCurrentUser && "items-end"
      )}>
        {!isCurrentUser && (
          <span className="text-xs text-gray-500 mb-1 ml-1">
            {message.userName}
          </span>
        )}
        
        <div className={cn(
          "rounded-2xl px-4 py-2.5 break-words",
          isCurrentUser 
            ? "bg-blue-600 text-white rounded-tr-none" 
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}>
          <p>{message.message}</p>
        </div>
        
        {message.timestamp && (
          <span className="text-xs text-gray-500 mt-1 mx-1">
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}