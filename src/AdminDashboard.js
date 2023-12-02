// AdminDashboard.js

import last from './img/last.png'
import home from './img/home.png'
import next from './img/next.png'
import prev from './img/prev.png'
import del from './img/del.png'
import dele from './img/dele.png'
import save from './img/save.png'
import edit from './img/edit.png'
import React, { useState, useEffect } from 'react';

const AdminDashboard = ({
  handleDelete,
 allusers,
 setUsers,
  users,
  selectedRows,
  searchTerm,
  setSearchTerm,
  onSelectRow,
  onDeselectRow,
  onDeleteSelected,
  onPageChange,
  currentPage,
  itemsPerPage,
}) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [editableRowId, setEditableRowId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedrole, setEditedrole] = useState('');
  const handleEdit = (rowId, initialName,initialEmail,initialrole) => {
    setEditableRowId(rowId);
    setEditedName(initialName);
    setEditedEmail(initialEmail);
    setEditedrole(initialrole)
  };
  const handleSave = (rowId) => {
    // Save the edited name and email, then reset editableRowId
    // You may want to add validation checks for editedName and editedEmail
    const updatedUsers = users.map(user =>
      user.id === rowId
        ? { ...user, name: editedName, email: editedEmail,role:editedrole }
        : user
    );
    setUsers(updatedUsers);
    setEditableRowId(null);
  }

  const handlePageChange = page => {
    onPageChange(page);
  };
  useEffect(() => {
    // Update the state of "Select All" checkbox when all rows on the current page are selected
    setSelectAllChecked(selectedRows.length === itemsPerPage);
  }, [selectedRows, itemsPerPage]);
  const handleSelectAll = async () => {
    const idsOnCurrentPage = users
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map(user => user.id);
   for (const rowId of idsOnCurrentPage) {
    if (selectAllChecked) {
      // Deselect the row if "Select All" is checked
      await onDeselectRow(rowId);
    } else {
      // Select the row if "Select All" is not checked
      if (!selectedRows.includes(rowId)) {
        await onSelectRow(rowId);
      }
    }
  }
    // Toggle the state of "Select All" checkbox
    setSelectAllChecked(!selectAllChecked);
     console.log(selectedRows)
  };
  return (
    <div>
      <input
        className='search-icon'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAllChecked}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => {
                    selectedRows.includes(user.id)
                      ? onDeselectRow(user.id)
                      : onSelectRow(user.id);
                  }}
                  checked={selectAllChecked || selectedRows.includes(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{editableRowId === user.id ? <input type="text" value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
               /> : user.name}</td>
               <td>{editableRowId === user.id ? <input type="text" value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
               /> : user.email}</td>
              <td>{editableRowId === user.id ? <input type="text" value={editedrole}
                onChange={(e) => setEditedrole(e.target.value)}
               /> : user.role}</td>
              <td>
                {editableRowId === user.id ? (
                  
                    <img src={save} style={{ mouse:'cursor', width: '30px', height: '30px' }} alt="save" onClick={() => handleSave(user.id)} />
                 
                ) : (
                  <>
             <img src={edit} style={{ width: '30px', height: '30px', cursor: 'pointer' }} alt="edit"
              onClick={() => handleEdit(user.id, user.name, user.email, user.role)}/>

                    <img src={del} style={{ width: '30px', height: '30px'}} alt="del" onClick={() => {
                      onSelectRow(user.id);
                      handleDelete();
                    }} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
  <img
    src={home}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '15%',
      cursor: 'pointer',
    }}
    alt="home"
    onClick={() => handlePageChange(1)}
  />
  <img
    src={prev}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '15%',
      cursor: 'pointer',
    }}
    alt="prev"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  />
       <button style={{ borderRadius: '15%',width: '40px',height: '40px',}} onClick={() => handlePageChange(1)}>1</button>
        <button style={{ borderRadius: '15%',width: '40px',height: '40px',}} onClick={() => handlePageChange(1 + 1)}>2</button>
        <button style={{ borderRadius: '15%',width: '40px',height: '40px',}} onClick={() => handlePageChange(2 + 1)}>3</button>
        <button style={{ borderRadius: '15%',width: '40px',height: '40px',}} onClick={() => handlePageChange(3 + 1)}>4</button>
        <button style={{ borderRadius: '15%',width: '40px',height: '40px',}} onClick={() => handlePageChange(4 + 1)}>5</button>
  <img
    src={next}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '15%',
      cursor: 'pointer',
    }}
    alt="next"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === Math.ceil(allusers.length / itemsPerPage)}
  />
  <img
    src={last}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '15%',
      cursor: 'pointer',
    }}
    alt="last"
    onClick={() => handlePageChange(Math.ceil(allusers.length / itemsPerPage))}
  />
</div>

      <img src={dele}  style={{ borderRadius: '15%',width: '40px',height: '40px', position: 'absolute',
    top: 3,right: 67}} onClick={onDeleteSelected}  alt="dele" />
       {/* Footer */}
       <div style={{ position: 'relative', marginTop: '20px', borderTop: '1px solid #ccc' }}>
        <span style={{ position: 'absolute', bottom: '40px', right: '10px' }}>
          Current Page: {currentPage} of {Math.ceil(allusers.length/itemsPerPage )}
        </span>
        </div>
    </div>
  );
};

export default AdminDashboard;

