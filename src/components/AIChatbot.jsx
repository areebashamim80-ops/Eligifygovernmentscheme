import { useState } from 'react'

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hello! I'm Eligify AI. I can help you find government schemes for your business."
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || loading) return

    const userMessage = message.trim()

    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: userMessage
      }
    ])

    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/ai/chat?message=${encodeURIComponent(userMessage)}`,
        {
          method: 'POST'
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: data.reply
          }
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: 'Sorry, something went wrong.'
          }
        ])
      }

    } catch (error) {

      console.error(error)

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Backend se connection nahi ho raha.'
        }
      ])

    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            right: '30px',
            bottom: '90px',
            width: '360px',
            height: '500px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000
          }}
        >

          {/* Header */}
          <div
            style={{
              background: '#09254a',
              color: 'white',
              padding: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >

            <div>
              <strong style={{ display: 'block' }}>
                ✦ Eligify AI
              </strong>

              <small style={{ opacity: 0.75 }}>
                AI Scheme Assistant
              </small>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

          </div>


          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '18px',
              overflowY: 'auto',
              background: '#f5f8fc'
            }}
          >

            {messages.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent:
                    item.type === 'user'
                      ? 'flex-end'
                      : 'flex-start',
                  marginBottom: '12px'
                }}
              >

                <div
                  style={{
                    maxWidth: '80%',
                    padding: '11px 13px',
                    borderRadius: '12px',
                    background:
                      item.type === 'user'
                        ? '#1769e0'
                        : 'white',
                    color:
                      item.type === 'user'
                        ? 'white'
                        : '#263b53',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    boxShadow:
                      item.type === 'bot'
                        ? '0 2px 8px rgba(0,0,0,0.05)'
                        : 'none'
                  }}
                >
                  {item.text}
                </div>

              </div>
            ))}


            {loading && (
              <div
                style={{
                  background: 'white',
                  padding: '10px 13px',
                  borderRadius: '12px',
                  width: 'fit-content',
                  fontSize: '13px',
                  color: '#718096'
                }}
              >
                Eligify AI is thinking...
              </div>
            )}

          </div>


          {/* Input */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '8px'
            }}
          >

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend()
                }
              }}
              placeholder="Ask Eligify AI..."
              style={{
                flex: 1,
                border: '1px solid #d5dee9',
                borderRadius: '9px',
                padding: '11px',
                outline: 'none'
              }}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                width: '42px',
                border: 'none',
                borderRadius: '9px',
                background: '#1769e0',
                color: 'white',
                cursor: loading ? 'default' : 'pointer'
              }}
            >
              ➤
            </button>

          </div>

        </div>
      )}


      {/* Chat Button */}
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(true)}
      >
        <span>✦</span>

        <div>
          <strong>Eligify AI</strong>
          <small>Ask me anything</small>
        </div>

      </button>

    </>
  )
}

export default AIChatbot