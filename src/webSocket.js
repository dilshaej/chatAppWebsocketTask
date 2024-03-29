// src/websocket.js

// Create a queue to hold messages while the WebSocket connection is still connecting
const messageQueue = [];

let ws; // Declare ws outside the function to make it accessible globally

export const startWebsocketConnection = () => {
  ws = new WebSocket('wss://' + host + '/chat'); // Use wss:// instead of ws://

  ws.onopen = () => {
    console.log('opened ws connection');

    // Send any queued messages
    while (messageQueue.length > 0) {
      const message = messageQueue.shift();
      ws.send(JSON.stringify(message));
    }
  };

  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  };

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };

  send = (message) => {
    // If WebSocket is not open, queue the message
    if (ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket connection is not open yet. Queuing message:', message);
      messageQueue.push(message);
    } else {
      ws.send(message);
    }
  };
};

export const registerOnMessageCallback = (fn) => {
  // The callback function is supplied as an argument and assigned to the 
  // onMessageCallback variable we declared earlier
  onMessageCallback = fn
};

export const send = ws.send.bind(ws);
