import React, { useState, useEffect } from 'react';
import { querySession, checkStatus } from '../api';

function ChatInterface({ sessionId }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let interval;
    async function poll() {
      const processed = await checkStatus(sessionId);
      if (processed) {
        setReady(true);
        clearInterval(interval);
      }
    }
    interval = setInterval(poll, 1000);
    poll();
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setProcessing(true);
    setMessages((msgs) => [...msgs, { from: 'user', text: question }]);
    const answer = await querySession(sessionId, question);
    setMessages((msgs) => [...msgs, { from: 'bot', text: answer }]);
    setQuestion('');
    setProcessing(false);
  };

  if (!ready) return <p>Processing document, please wait...</p>;

  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'user-msg' : 'bot-msg'}>
            <strong>{m.from === 'user' ? 'You:' : 'Bot:'}</strong> {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={processing}
        />
        <button type="submit" disabled={processing}>
          {processing ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
