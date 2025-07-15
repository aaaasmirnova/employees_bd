import React, { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/submit-form/', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
      <input type="email" name="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
      <textarea name="message" onChange={(e) => setFormData({...formData, message: e.target.value})} />
      <button type="submit">Отправить</button>
    </form>
  );
}
