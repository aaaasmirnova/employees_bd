// src/App.js
import React from 'react';
import Form from './components/Form';
import RecordsList from './components/RecordsList';

function App() {
  return (
    <div className="App">
      <h1>Моя форма</h1>
      <Form />
      <RecordsList />
    </div>
  );
}

export default App; // Эта строка обязательна!
