// src/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(email, password);
        if (success) navigate('/login');
    };

    return (
        <div className="auth-form">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>
                Уже есть аккаунт? <a href="/login">Войти</a>
            </p>
        </div>
    );
};

export default Register;