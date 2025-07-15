import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RecordsList.module.css';

function RecordsList() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const fetchRecords = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8000/get-records/?page=${page}&per_page=${perPage}`);
      setRecords(response.data.records);
      setTotalPages(Math.ceil(response.data.total / perPage));
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete-record/${id}`);
      fetchRecords(currentPage); // Обновляем список после удаления
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  useEffect(() => {
    fetchRecords(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <h2>Existing Records</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.message}</td>
              <td>
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecordsList;
