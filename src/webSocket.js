// src/websocket.js

// Determine the host based on the environment
const host = process.env.NODE_ENV === 'production' ? window.location.host.replace(/^http/, 'ws') : 'ws://localhost:5173';

export let send;
let onMessageCallback;

export const startWebsocketConnection = () => {
  // Initialize WebSocket connection
  const ws = new WebSocket(host + '/chat'); // Make sure '/chat' is the correct endpoint on your server

  // WebSocket event handlers
  ws.onopen = () => {
    console.log('opened ws connection');
  };

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };

  ws.onmessage = (e) => {
    // Call registered message callback when a message is received
    onMessageCallback && onMessageCallback(e.data);
  };

  // Bind send method to exported variable
  send = ws.send.bind(ws);
};

// Register callback function to handle incoming messages
export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn;
};
