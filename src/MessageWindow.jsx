import React, { useRef, useEffect } from 'react'

function MessageWindow({ messages = [], username }) {
  const messageWindow = useRef(null)

  const Message = ({ text, username, self }) => (
    <div className={'message' + (self ? ' message-self' : '')} style={self ? { backgroundColor: '#d1beb0',padding: '10px',alignSelf:'flex-end',border:'1px',color:'black',width:'80%', borderRadius: '10px',marginBottom: '5px' } : {alignSelf:'flex-start',backgroundColor:'#f5fbef', padding: '10px', borderRadius: '10px', marginBottom: '5px',width:'80%',color:'black'}}>
      <div className='message-content'>
        <span className='message-username' style={{ fontWeight: 'bold', marginRight: '35px' }}>{username}</span> <br />
        <span className='message-text'>{text}</span>
      </div>
    </div>
  )

  useEffect(() => {
    const { current } = messageWindow
    if (current) {
      current.scrollTop = current.scrollHeight - current.clientHeight
    }
  }, [messages])

  return (
    <div className='message-window' ref={messageWindow} style={{ overflowY: 'auto',display:'flex',flexDirection:'column', maxHeight: '500px'}}>
      {messages.map((msg, i) => (
        <Message key={i} text={msg.text} username={msg.username} self={username === msg.username} />
      ))}
    </div>
  )
}

export default MessageWindow;
