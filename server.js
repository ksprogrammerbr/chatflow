import { WebSocketServer } from "ws";
import { createServer } from "http";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta dist (após o build)
app.use(
  express.static(join(__dirname, "dist"), {
    // Add correct MIME types
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Rota específica para arquivos JavaScript
app.get("*.js", (req, res, next) => {
  res.set("Content-Type", "application/javascript");
  next();
});

// Adicionar rota catch-all para SPA - deve vir DEPOIS do static
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

// Criar servidor HTTP
const server = createServer(app);

// Inicializar o servidor WebSocket com ping/pong
const wss = new WebSocketServer({
  server,
  path: "/ws", // Add specific path for WebSocket connections
  clientTracking: true,
  handleProtocols: () => "chat",
  verifyClient: (info, callback) => {
    // Add connection verification
    console.log("New connection attempt from:", info.req.socket.remoteAddress);
    callback(true);
  },
});

// Armazenar usuários conectados
const clients = new Map();
let userCount = 0;

// Atualizar intervalo de ping
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      const userData = clients.get(ws);
      if (userData) {
        console.log(
          `Terminando conexão inativa: ${userData.name} (${userData.id})`
        );
      }
      clients.delete(ws);
      return ws.terminate();
    }

    ws.isAlive = false;
    try {
      ws.ping();
    } catch (error) {
      console.error("Erro ao enviar ping:", error);
      ws.terminate();
    }
  });
}, 10000); // Reduce interval to 10 seconds

// Gerenciar conexões WebSocket
wss.on("connection", (ws, req) => {
  console.log("New WebSocket connection from:", req.socket.remoteAddress);

  ws.isAlive = true;

  // Setup ping-pong
  ws.on("pong", () => {
    ws.isAlive = true;
  });

  console.log("Novo usuário conectado");

  // Atribuir ID único para cada usuário
  const userId = `user_${++userCount}`;
  const userData = { id: userId, name: `Usuário ${userCount}` };

  // Armazenar informações do cliente
  clients.set(ws, userData);

  console.log(`Novo usuário conectado: ${userData.name} (${userId})`);

  // Enviar mensagem de boas-vindas para o novo usuário
  ws.send(
    JSON.stringify({
      type: "welcome",
      userId: userId,
      userName: userData.name,
      userCount: clients.size,
    })
  );

  // Send immediate welcome message to confirm connection
  ws.send(JSON.stringify({ type: "connection_ack" }));

  // Notificar todos os usuários sobre o novo participante
  broadcastMessage(
    {
      type: "userJoined",
      userId: userId,
      userName: userData.name,
      userCount: clients.size,
    },
    ws
  );

  // Lidar com mensagens recebidas
  ws.on("message", (message) => {
    try {
      const messageStr = message.toString("utf8");
      console.log("Mensagem recebida (raw):", messageStr);

      const data = JSON.parse(messageStr);
      console.log("Mensagem processada:", data);

      switch (data.type) {
        case "chat":
          // Garantir que a mensagem seja transmitida corretamente
          const chatMessage = {
            type: "chat",
            userId: userData.id,
            userName: userData.name,
            message: data.message,
            timestamp: data.timestamp || new Date().toISOString(),
          };

          console.log("Transmitindo mensagem:", chatMessage);
          broadcastMessage(chatMessage);
          break;

        case "init":
          // Update user name on init
          const oldName = userData.name;
          userData.name = data.name;
          clients.set(ws, userData);

          // Notify about name change if different
          if (oldName !== data.name) {
            broadcastMessage({
              type: "nameChanged",
              userId: userData.id,
              oldName: oldName,
              newName: data.name,
            });
          }
          break;

        case "message":
          // Broadcast chat message
          broadcastMessage({
            type: "chat",
            userId: userData.id,
            userName: userData.name,
            message: data.message,
            timestamp: new Date().toISOString(),
          });
          break;

        case "changeName":
          const previousName = userData.name;
          userData.name = data.name;
          clients.set(ws, userData);

          broadcastMessage({
            type: "nameChanged",
            userId: userData.id,
            oldName: previousName,
            newName: data.name,
          });
          break;

        default:
          console.log("Tipo de mensagem desconhecido:", data.type);
      }
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
    }
  });

  // Lidar com desconexão
  ws.on("close", () => {
    const userData = clients.get(ws);
    clients.delete(ws);

    console.log(`Usuário desconectado: ${userData.name} (${userData.id})`);

    // Notificar todos sobre a saída do usuário
    broadcastMessage({
      type: "userLeft",
      userId: userData.id,
      userName: userData.name,
      userCount: clients.size,
    });
  });

  // Lidar com erros
  ws.on("error", (error) => {
    console.error("Erro no WebSocket:", error);
    const userData = clients.get(ws);
    if (userData) {
      console.log(`Erro para usuário: ${userData.name} (${userData.id})`);
    }
    clients.delete(ws);
  });
});

// Função para transmitir mensagens para todos os clientes
function broadcastMessage(message, excludeClient = null) {
  const messageStr = JSON.stringify(message);
  console.log("Broadcasting:", messageStr);

  let sentCount = 0;
  wss.clients.forEach((client) => {
    try {
      if (client !== excludeClient && client.readyState === 1) {
        client.send(messageStr);
        sentCount++;
      }
    } catch (error) {
      console.error("Error broadcasting to client:", error);
    }
  });
  console.log(`Mensagem enviada para ${sentCount} clientes`);
}

// Cleanup on server shutdown
server.on("close", () => {
  clearInterval(interval);
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Servidor WebSocket iniciado na porta ${PORT}`);
});
