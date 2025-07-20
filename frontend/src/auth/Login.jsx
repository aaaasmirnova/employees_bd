import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Теперь будет работать
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) navigate('/');
    };

    return (
        <div className="auth-form">
            <h2>Вход</h2>
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
                <button type="submit">Войти</button>
            </form>
            <p>
                Нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </p>
        </div>
    );
};

export default Login;