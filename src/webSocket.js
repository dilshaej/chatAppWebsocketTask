const host = process.env.NODE_ENV === 'production' ? window.location.host.replace(/^http/, 'ws') : 'ws://localhost:5173';

export let send;
let onMessageCallback;

export const startWebsocketConnection = () => {
  const ws = new WebSocket(host + '/chat'); // Make sure '/chat' is the correct endpoint on your server

  ws.onopen = () => {
    console.log('opened ws connection');
  };

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };

  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  };

  send = ws.send.bind(ws);
};

export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn;
};
