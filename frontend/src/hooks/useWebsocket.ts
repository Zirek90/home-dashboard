import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketOptions {
  reconnect?: boolean;
  reconnectInterval?: number;
}

export const useWebsocket = <T>(url: string, listener: string, options: WebSocketOptions = {}) => {
  const { reconnect = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, { reconnection: reconnect });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket Error", err);
      setError(err);
    });

    socket.on(listener, (message) => {
      setData(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, reconnect, listener]);

  return { data, isConnected, error };
};
