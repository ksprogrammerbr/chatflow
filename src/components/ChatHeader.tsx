import React from 'react';
import { MessageSquare, Users, User, LogOut, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface ChatHeaderProps {
  userName: string;
  userCount: number;
  connected: boolean;
  isConnecting: boolean;
  onReconnect: () => void;
  onChangeName: () => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

export function ChatHeader({
  userName,
  userCount,
  connected,
  isConnecting,
  onReconnect,
  onChangeName,
  onLogout,
  onToggleSidebar
}: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="p-1.5 rounded-full hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">ChatFlow</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-500" />
            <Badge variant="secondary">
              {userCount} online
            </Badge>
          </div>
          
          {connected ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Conectado</span>
              </div>
              
              <div 
                className="flex items-center gap-1.5 cursor-pointer hover:underline"
                onClick={onChangeName}
              >
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{userName}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                leftIcon={<LogOut className="h-4 w-4" />}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-red-600">Desconectado</span>
              </div>
              
              <Button 
                variant="primary" 
                size="sm" 
                onClick={onReconnect}
                isLoading={isConnecting}
              >
                Reconectar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}