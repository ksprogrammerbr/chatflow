import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { Button } from './ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={disabled}
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
            <div className="absolute right-2 bottom-2.5 flex items-center gap-1">
              <button
                type="button"
                disabled={disabled}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={disabled}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={disabled || !message.trim()}
            className="p-3 rounded-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}