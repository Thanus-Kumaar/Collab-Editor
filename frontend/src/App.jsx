import { useState, useEffect } from 'react'
import TextEditor from './components/TextEditor'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('Connected to WebSocket')
      ws.send("Hello there")
    }

    ws.onmessage = (event) => {
      console.log('Received:', event.data)
    }

    setSocket(ws)

    // Cleanup on component unmount
    return () => {
      ws.close()
    }
  }, [])

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message)
      setMessage('')
    }
  }

  return (
    <div className="p-4 h-full">
      <TextEditor />
    </div>
  )
}

export default App
