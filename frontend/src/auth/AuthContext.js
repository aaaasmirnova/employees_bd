import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            verifyToken();
        }
    }, [token]);

    const verifyToken = async () => {
        try {
            await axios.get('http://localhost:8000/verify-token/');
        } catch (error) {
            logout();
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/token/', {
                username: email,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            setToken(response.data.access_token);
            setUser({ email });
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (email, password) => {
        try {
            await axios.post('http://localhost:8000/register/', {
                email,
                password
            });
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Добавьте этот хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};