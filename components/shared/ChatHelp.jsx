'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './styles/ChatHelp.module.css';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    type: 'bot',
    content: 'Hi there! 👋 I can help you understand this page and available commands. What would you like to know?',
    options: [
      { id: 'features', label: 'What features are available?' },
      { id: 'commands', label: 'Show available commands' },
      { id: 'shortcuts', label: 'Keyboard shortcuts' },
      { id: 'edge', label: 'What are Edge Functions?' }
    ]
  }
];

const RESPONSES = {
  features: {
    content: 'This page shows your device capabilities and provides optimized recommendations. Key features include:',
    list: [
      'Real-time device detection',
      'System capability monitoring',
      'Edge function recommendations',
      'Toast notifications for important events',
      'Keyboard shortcuts for quick actions'
    ]
  },
  commands: {
    content: 'Here are some commands you can use:',
    list: [
      '/help - Show this help dialog',
      '/clear - Clear notification history',
      '/refresh - Refresh device data',
      '/theme - Toggle dark/light theme',
      '/status - Show system status'
    ]
  },
  shortcuts: {
    content: 'Keyboard shortcuts available on any page:',
    list: [
      '? - Toggle help panel',
      'Esc - Close dialogs',
      'Ctrl+R - Refresh data',
      'Ctrl+D - Toggle dark mode',
      'Ctrl+/ - Show keyboard shortcuts'
    ]
  },
  edge: {
    content: 'Edge Functions are serverless functions that run close to users:',
    list: [
      'They detect your device type before page load',
      'Optimize content based on your device',
      'Run in data centers near your location',
      'Provide faster, personalized experiences',
      'Set custom headers for client-side use'
    ]
  }
};

export default function ChatHelp({ onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '?' && e.target.tagName !== 'INPUT') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  const handleOptionClick = (optionId) => {
    const response = RESPONSES[optionId];
    
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        content: INITIAL_MESSAGES[0].options.find(opt => opt.id === optionId).label
      },
      {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: response.content,
        list: response.list,
        options: INITIAL_MESSAGES[0].options
      }
    ]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        content: input
      }
    ]);
    
    // Process commands
    if (input.startsWith('/')) {
      const command = input.slice(1).toLowerCase();
      
      if (command === 'clear') {
        // Show confirmation and clear messages
        setMessages([
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: 'Notifications cleared!',
            options: INITIAL_MESSAGES[0].options
          }
        ]);
        
        // Trigger toast notification
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast('Notifications cleared', 'success');
        }
      } else if (command === 'help') {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: INITIAL_MESSAGES[0].content,
            options: INITIAL_MESSAGES[0].options
          }
        ]);
      } else if (command === 'refresh') {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: 'Refreshing device data...',
            options: INITIAL_MESSAGES[0].options
          }
        ]);
        
        // Trigger toast notification
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast('Refreshing device data', 'info');
        }
        
        // Simulate refresh after delay
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.showToast) {
            window.showToast('Device data refreshed', 'success');
          }
        }, 1500);
      } else {
        // Unknown command
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `Unknown command: ${command}. Type /help to see available commands.`,
            options: INITIAL_MESSAGES[0].options
          }
        ]);
      }
    } else {
      // Regular message - respond with help options
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: `I'm a simple help system. Try clicking one of these options or using a command like /help:`,
          options: INITIAL_MESSAGES[0].options
        }
      ]);
    }
    
    setInput('');
  };
  
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3 className={styles.chatTitle}>Help Assistant</h3>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`${styles.message} ${message.type === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {message.type === 'bot' && <div className={styles.botAvatar}>?</div>}
            
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              
              {message.list && (
                <ul className={styles.messageList}>
                  {message.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              
              {message.options && (
                <div className={styles.optionsContainer}>
                  {message.options.map(option => (
                    <button 
                      key={option.id} 
                      className={styles.optionButton}
                      onClick={() => handleOptionClick(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {message.type === 'user' && <div className={styles.userAvatar}>👤</div>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message or command (/help)"
          className={styles.chatInput}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}