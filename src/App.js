import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState(null);

  return (
    <div className="App">
      <h1>Medical Doc Chatbot</h1>
      {!sessionId ? (
        <UploadForm onUpload={setSessionId} />
      ) : (
        <ChatInterface sessionId={sessionId} />
      )}
    </div>
  );
}

export default App;
