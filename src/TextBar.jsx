import React, { useRef } from 'react'

function TextBar({ onSend }) {
  const inputRef = useRef(null)

  const sendMessage = () => {
    if (onSend) {
      onSend(inputRef.current.value)
    }
    inputRef.current.value = '';
  };

  const sendMessageIfEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage()
    }
  };

  return (
    <div className='textbar d-flex justify-content-between mb-4'>
      <input className=' form-control' type='text' ref={inputRef} onKeyDown={sendMessageIfEnter} />
      <button className='btn btn-secondary ms-2' onClick={sendMessage}>
        Send
      </button>
    </div>
  )
}

export default TextBar
