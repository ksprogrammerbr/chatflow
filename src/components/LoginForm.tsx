import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email, password);
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <LogIn className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao ChatFlow</h1>
        <p className="text-gray-600 mt-2">Faça login para continuar</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          required
        />
        
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          required
        />
        
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          Entrar
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-center text-gray-600">
          Usuários de teste:
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-medium">Email:</p>
            <p>usuario@exemplo.com</p>
            <p className="font-medium mt-1">Senha:</p>
            <p>123456</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-medium">Email:</p>
            <p>teste@teste.com</p>
            <p className="font-medium mt-1">Senha:</p>
            <p>teste123</p>
          </div>
        </div>
      </div>
    </div>
  );
}