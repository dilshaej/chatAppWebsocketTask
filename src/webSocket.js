// webSocket.js

const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:5173';
let ws;

export const startWebsocketConnection = () => {
  ws = new window.WebSocket('ws://' + host + '/chat') || {};

  ws.onopen = () => {
    console.log('opened ws connection');
  };

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };
};

export const send = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error('WebSocket connection is not open yet.');
  }
};

export const registerOnMessageCallback = (fn) => {
  if (ws) {
    ws.onmessage = (e) => {
      fn && fn(e.data);
    };
  } else {
    console.error('WebSocket connection is not established.');
  }
};
