import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta dist (após o build)
app.use(express.static(join(__dirname, 'dist')));

// Criar servidor HTTP
const server = createServer(app);

// Inicializar o servidor WebSocket
const wss = new WebSocketServer({ server });

// Armazenar usuários conectados
const clients = new Map();
let userCount = 0;

// Gerenciar conexões WebSocket
wss.on('connection', (ws) => {
  // Atribuir ID único para cada usuário
  const userId = `user_${++userCount}`;
  const userData = { id: userId, name: `Usuário ${userCount}` };
  
  // Armazenar informações do cliente
  clients.set(ws, userData);
  
  console.log(`Novo usuário conectado: ${userData.name} (${userId})`);
  
  // Enviar mensagem de boas-vindas para o novo usuário
  ws.send(JSON.stringify({
    type: 'welcome',
    userId: userId,
    userName: userData.name,
    userCount: clients.size
  }));
  
  // Notificar todos os usuários sobre o novo participante
  broadcastMessage({
    type: 'userJoined',
    userId: userId,
    userName: userData.name,
    userCount: clients.size
  }, ws);
  
  // Lidar com mensagens recebidas
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Processar diferentes tipos de mensagens
      switch (data.type) {
        case 'chat':
          // Transmitir mensagem de chat para todos
          broadcastMessage({
            type: 'chat',
            userId: userData.id,
            userName: userData.name,
            message: data.message,
            timestamp: new Date().toISOString()
          });
          break;
          
        case 'changeName':
          // Atualizar nome do usuário
          const oldName = userData.name;
          userData.name = data.name;
          clients.set(ws, userData);
          
          // Notificar todos sobre a mudança de nome
          broadcastMessage({
            type: 'nameChanged',
            userId: userData.id,
            oldName: oldName,
            newName: userData.name
          });
          break;
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  });
  
  // Lidar com desconexão
  ws.on('close', () => {
    const userData = clients.get(ws);
    clients.delete(ws);
    
    console.log(`Usuário desconectado: ${userData.name} (${userData.id})`);
    
    // Notificar todos sobre a saída do usuário
    broadcastMessage({
      type: 'userLeft',
      userId: userData.id,
      userName: userData.name,
      userCount: clients.size
    });
  });
  
  // Lidar com erros
  ws.on('error', (error) => {
    console.error(`Erro na conexão WebSocket: ${error.message}`);
  });
});

// Função para transmitir mensagens para todos os clientes
function broadcastMessage(message, excludeClient = null) {
  const messageStr = JSON.stringify(message);
  
  clients.forEach((userData, client) => {
    // Enviar para todos, exceto o cliente excluído (se especificado)
    if (client !== excludeClient && client.readyState === 1) {
      client.send(messageStr);
    }
  });
}

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Servidor WebSocket iniciado na porta ${PORT}`);
});