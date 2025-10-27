import { useState, useRef, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';
import styles from './Chat.module.css';

let typingTimeout = null;

export default function Chat() {
  const [message, setMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const { messages, typingUsers, sendMessage, sendTyping, sendStopTyping } = useSocket();
  const { user } = useAuth();

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && !showScrollToBottom) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingUsers, showScrollToBottom]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Show button if user has scrolled up more than one message height
      setShowScrollToBottom(scrollHeight - scrollTop > clientHeight + 100);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      sendStopTyping();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    } else {
      sendTyping();
    }

    typingTimeout = setTimeout(() => {
      sendStopTyping();
      typingTimeout = null;
    }, 2000);
  };

  return (
    <div className={styles.chat}>
      <h2 className={styles.chat__title}>Chat</h2>

      <div className={styles.chat__messages} ref={scrollRef} onScroll={handleScroll}>
        <div className={styles.chat__notice}>
          Los mensajes se guardan durante 7 días.
        </div>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`${styles.chat__message} ${msg.userId === user?._id ? styles['chat__message--sent'] : styles['chat__message--received']}`}>
            <div className={styles['chat__message-container']}>
              {msg.userId !== user?._id && (
                <div className={styles.chat__avatar}>{msg.userName.charAt(0)}</div>
              )}
              <div className={styles['chat__message-content']}>
                {msg.userId !== user?._id && (
                  <div className={styles['chat__message-sender']}>{msg.userName}</div>
                )}
                <div className={styles['chat__message-bubble']}>
                  <p>{msg.message}</p>
                </div>
                <div className={styles['chat__message-time']}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {typingUsers.map((userName, index) => (
          <div key={`typing-${index}`} className={styles.chat__typing_indicator}>
            {userName} está escribiendo...
          </div>
        ))}
      </div>

      {showScrollToBottom && (
        <button onClick={scrollToBottom} className={styles['scroll-to-bottom-button']}>
          ↓
        </button>
      )}

      <form onSubmit={handleSubmit} className={styles.chat__form}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className={styles.chat__input}
          rows="1"
        />
        <button type="submit" className={styles.chat__button}>Enviar</button>
      </form>
    </div>
  );
}
