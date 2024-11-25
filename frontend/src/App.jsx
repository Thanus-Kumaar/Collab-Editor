import { useState, useEffect } from 'react'

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
    <div className="p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
          placeholder="Enter message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
