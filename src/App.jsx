import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startWebsocketConnection, send, registerOnMessageCallback } from './webSocket'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { addMessage, setUsername } from './Redux/slice'

function App() {
  const dispatch = useDispatch()
  const { messages, username } = useSelector(state => state.messages)

  React.useEffect(() => {
    startWebsocketConnection()
    registerOnMessageCallback(onMessageReceived)
    return () => {
      registerOnMessageCallback(null)
    };
  }, []);

  const onMessageReceived = (msg) => {
    msg = JSON.parse(msg);
    dispatch(addMessage(msg))
  };

  const setUserName = (name) => {
    dispatch(setUsername(name))
    const welcomeMessage = {
      
      text : `Welcome, ${name}!`
    }
    dispatch(addMessage(welcomeMessage))
  }

  const sendMessage = (text) => {
    const message = {
      username : username,
      text: text
    };
    send(JSON.stringify(message))
  }

  return (
    <div className='container  border mt-5' style={{ height: "550px", display: "flex", flexDirection: "column",width:'400px',alignItems:'stretch' }}>
      {username === null ? (
        <div className='container-title' style={{textAlign:'center'}}>Enter username</div>
      ) : (
        <div className='container-title' style={{textAlign:'center'}}>Messages</div>
      )}
    <div className='m-3' >  <MessageWindow messages={messages} username={username} /></div>
     <div className='mt-auto'> <TextBar onSend={username === null ? setUserName : sendMessage} /></div>
    </div>
  )
}

export default App