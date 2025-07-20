import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import EmployeesList from './components/EmployeesList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <EmployeesList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;