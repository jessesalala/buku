import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
import './DiscussionForum.css';

const DiscussionForum = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setHasJoined(true);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `${username} amejiunga na mazungumzo`,
        username: 'Mfumo',
        isSystem: true
      }]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && username.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        username: username,
        timestamp: new Date().toLocaleTimeString(),
        status: 'sending'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        ));

        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === message.id ? { ...msg, status: 'delivered' } : msg
          ));
        }, 1000);
      }, 500);
    }
  };

  if (!hasJoined) {
    return (
      <div className="forum-join-container">
        <h2>Jukwaa la Majadiliano</h2>
        <p>Jiunge na washiriki wengine kujadiliana mambo mbalimbali</p>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Jina lako"
            required
          />
          <button type="submit">Jiunge</button>
        </form>
      </div>
    );
  }

  return (
    <div className="forum-container">
      <header className="forum-header">
        <h2>Jukwaa la Majadiliano</h2>
        <p>Unaongea kama: {username}</p>
      </header>

      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.isSystem ? 'system' : message.username === username ? 'sent' : 'received'}`}
          >
            {!message.isSystem && message.username !== username && (
              <div className="message-user">
                <FaUser className="user-icon" />
                <span>{message.username}</span>
              </div>
            )}

            <div className="message-content">
              <div className="message-text">
                {message.text}
              </div>
              {!message.isSystem && (
                <div className="message-footer">
                  <span className="message-time">{message.timestamp}</span>
                  {message.username === username && (
                    <span className={`message-ticks ${message.status}`}>
                      {message.status === 'sending' ? '🕒' : message.status === 'sent' ? '✓' : '✓✓'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Andika ujumbe hapa..."
          rows={2}
          style={{ resize: 'vertical' }}
        />
        <button type="submit">
          <FaPaperPlane className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default DiscussionForum;