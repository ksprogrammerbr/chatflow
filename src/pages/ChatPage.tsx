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
  const [isConnecting, setIsConnecting] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 3;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const connectWebSocket = useCallback(
    (initialUserName: string = "") => {
      // Prevent multiple connection attempts
      if (isConnecting || wsRef.current?.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket is already connecting");
        return;
      }

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already connected");
        return;
      }

      setIsConnecting(true);

      try {
        // Update WebSocket URL to use the specific path
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//localhost:3000/ws`;

        console.log("Connecting to WebSocket at:", wsUrl);
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        // Add connection timeout
        const connectionTimeout = setTimeout(() => {
          if (ws.readyState !== WebSocket.OPEN) {
            console.log("Connection timeout, closing socket");
            ws.close();
          }
        }, 5000);

        ws.onopen = () => {
          clearTimeout(connectionTimeout);
          console.log("WebSocket connection established");
          setConnected(true);
          setIsConnecting(false);
          setReconnectAttempts(0);

          // Send initial message to confirm connection
          ws.send(JSON.stringify({ type: "init", name: initialUserName }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Mensagem recebida (client):", data);

            switch (data.type) {
              case "chat":
                // Atualizar tratamento de mensagens de chat
                setMessages((prev) => [
                  ...prev,
                  {
                    type: "message",
                    userId: data.userId,
                    userName: data.userName,
                    message: data.message,
                    timestamp: data.timestamp || new Date().toISOString(),
                  },
                ]);
                break;

              case "welcome":
                setUserId(data.userId);
                setUserName(data.userName);
                setUserCount(data.userCount);
                setConnected(true);
                break;

              case "connection_ack":
                // Acknowledge the connection
                console.log("Connection acknowledged by server");
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

        ws.onclose = (event) => {
          clearTimeout(connectionTimeout);
          console.log("WebSocket connection closed:", event.code, event.reason);
          setConnected(false);
          setIsConnecting(false);

          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }

          // Only attempt to reconnect if the closure code is not normal (1000/1005) and within retry limits
          if (
            event.code !== 1000 &&
            event.code !== 1005 &&
            reconnectAttempts < maxReconnectAttempts
          ) {
            const timeout = Math.min(
              1000 * Math.pow(2, reconnectAttempts),
              30000
            );
            console.log(`Attempting to reconnect in ${timeout}ms`);
            setReconnectAttempts((prev) => prev + 1);
            reconnectTimeoutRef.current = setTimeout(
              () => connectWebSocket(initialUserName),
              timeout
            );
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setIsConnecting(false);
        };
      } catch (error) {
        console.error("Error creating WebSocket:", error);
      } finally {
        setIsConnecting(false);
      }
    },
    [reconnectAttempts, initialUserName, isConnecting]
  );

  useEffect(() => {
    connectWebSocket(initialUserName);

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initialUserName, connectWebSocket]);

  const handleManualReconnect = useCallback(() => {
    setReconnectAttempts(0);
    connectWebSocket(initialUserName);
  }, [initialUserName, connectWebSocket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <ChatHeader
        userName={userName}
        onLogout={onLogout}
        userCount={userCount}
        connected={connected}
        isConnecting={isConnecting}
        onReconnect={handleManualReconnect}
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
            // Enviar mensagem com tipo 'chat' em vez de 'message'
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                message: message,
                timestamp: new Date().toISOString(),
              })
            );
          }
        }}
        disabled={!connected}
      />
    </div>
  );
}
