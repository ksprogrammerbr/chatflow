import { useState, useEffect, useRef, useCallback } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInput } from "../components/ChatInput";
import { ChatMessage } from "../components/ChatMessage";

interface ChatMessage {
  type: string;
  userId: string;
  userName: string;
  message?: string;
  timestamp?: string;
  oldName?: string;
  newName?: string;
}

interface ChatPageProps {
  userName: string;
  onLogout: () => void;
}

export function ChatPage({
  userName: initialUserName,
  onLogout,
}: ChatPageProps) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userName, setUserName] = useState(initialUserName);
  const [userId, setUserId] = useState("");
  const [userCount, setUserCount] = useState(0);
  // Remover variáveis não utilizadas
  // const [showNameInput, setShowNameInput] = useState(false);
  // const [newName, setNewName] = useState('');
  // const [isConnecting, setIsConnecting] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Função para conectar ao WebSocket
  const connectWebSocket = useCallback(
    (initialUserName: string = "") => {
      // setIsConnecting(true);

      // Determinar o endereço do WebSocket (produção vs desenvolvimento)
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl =
        process.env.NODE_ENV === "production"
          ? `${protocol}//${window.location.host}`
          : `${protocol}//localhost:3000`;

      // Criar nova conexão WebSocket
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // Manipulador de evento de abertura de conexão
      ws.onopen = () => {
        console.log("Conectado ao servidor WebSocket");
        setConnected(true);
        // setIsConnecting(false);

        // Se temos um nome de usuário inicial, enviar para o servidor
        if (initialUserName) {
          setTimeout(() => {
            ws.send(
              JSON.stringify({
                type: "changeName",
                name: initialUserName,
              })
            );
          }, 500);
        }

        // Adicionar mensagem do sistema
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            userId: "system",
            userName: "Sistema",
            message: "Conectado ao servidor de chat",
            timestamp: new Date().toISOString(),
          },
        ]);
      };

      // Manipulador de evento de mensagem recebida
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Mensagem recebida:", data);

          // Processar diferentes tipos de mensagens
          switch (data.type) {
            case "welcome":
              setUserId(data.userId);
              if (!initialUserName) {
                setUserName(data.userName);
              }
              setUserCount(data.userCount);
              break;
            case "userJoined":
              setMessages((prev) => [
                ...prev,
                {
                  type: "system",
                  userId: "system",
                  userName: "Sistema",
                  message: `${data.userName} entrou no chat`,
                  timestamp: new Date().toISOString(),
                },
              ]);
              setUserCount(data.userCount);
              break;
            case "userLeft":
              setMessages((prev) => [
                ...prev,
                {
                  type: "system",
                  userId: "system",
                  userName: "Sistema",
                  message: `${data.userName} saiu do chat`,
                  timestamp: new Date().toISOString(),
                },
              ]);
              setUserCount(data.userCount);
              break;
            case "message":
              setMessages((prev) => [
                ...prev,
                {
                  type: "message",
                  userId: data.userId,
                  userName: data.userName,
                  message: data.message,
                  timestamp: data.timestamp,
                },
              ]);
              break;
            case "nameChanged":
              setMessages((prev) => [
                ...prev,
                {
                  type: "system",
                  userId: "system",
                  userName: "Sistema",
                  message: `${data.oldName} mudou seu nome para ${data.newName}`,
                  timestamp: new Date().toISOString(),
                },
              ]);
              if (data.userId === userId) {
                setUserName(data.newName);
              }
              break;
            default:
              console.log("Tipo de mensagem desconhecido:", data.type);
          }
        } catch (error) {
          console.error("Erro ao processar mensagem:", error);
        }
      };

      ws.onclose = () => {
        console.log("Desconectado do servidor WebSocket");
        setConnected(false);
        // setIsConnecting(false);
        // Adicione lógica de reconexão aqui, se necessário
      };

      ws.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
        // setIsConnecting(false);
        // Lidar com o erro, como mostrar uma mensagem ao usuário
      };
    },
    [userId]
  );

  // Efeito para conectar ao WebSocket no carregamento do componente
  useEffect(() => {
    connectWebSocket(initialUserName);

    // Função para desconectar ao desmontar o componente
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initialUserName, connectWebSocket]); // Adicionar connectWebSocket como dependência

  return (
    <div>
      <ChatHeader
        userName={userName}
        onLogout={onLogout}
        userCount={userCount}
        connected={connected}
        isConnecting={false} // Ajustar conforme necessário
        onReconnect={() => connectWebSocket(userName)}
        onChangeName={() => {
          const newName = prompt("Digite o novo nome:");
          if (newName && wsRef.current && connected) {
            wsRef.current.send(
              JSON.stringify({
                type: "changeName",
                name: newName,
              })
            );
          }
        }}
      />
      <div ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
            isCurrentUser={msg.userId === userId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={(message) => {
          if (wsRef.current && connected) {
            wsRef.current.send(
              JSON.stringify({
                type: "message",
                message,
              })
            );
          }
        }}
        disabled={!connected}
      />
    </div>
  );
}
