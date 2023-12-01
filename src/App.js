// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // You can create this CSS file for styling
import AdminDashboard from './AdminDashboard';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [len, setLen] = useState(0);
  useEffect(() => {
  // Fetch data from the API endpoint
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        setLen(users.length)
        }, []);
    console.log("len is " + len )
  // Handle search
  useEffect(() => {
    const filteredResults = users.filter(user =>
      Object.values(user).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filteredResults);
    setCurrentPage(1); // Reset to the first page after a new search
  }, [searchTerm, users]);

  // Calculate current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  // Handle pagination
  const paginate = page => setCurrentPage(page);

  return (
    <div className="App">
      <AdminDashboard
        len={len}
        users={currentItems}
        setUsers={setUsers}
        selectedRows={selectedRows}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectRow={rowId => setSelectedRows([...selectedRows, rowId])}
        onDeselectRow={rowId =>
          setSelectedRows(selectedRows.filter(id => id !== rowId))
        }
        onDeleteSelected={() => console.log('Deleting selected rows:', selectedRows)}
        onPageChange={paginate}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default App;
