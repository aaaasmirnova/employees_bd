import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-records/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmployees(response.data.records);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        if (token) fetchEmployees();
    }, [token]);

    return (
        <div className="employees-container">
            <h2>Список сотрудников</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Сообщение</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.message}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesList;