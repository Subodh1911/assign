// AdminDashboard.js
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
      console.log(idsOnCurrentPage)

    if (selectAllChecked) {
      // Deselect all rows if "Select All" is checked
      for (const rowId of idsOnCurrentPage) {
        await onDeselectRow(rowId);
      }
    } else {
      // Select all rows if "Select All" is not checked
      for (const rowId of idsOnCurrentPage) {
         onSelectRow(rowId);
      }
    }
    // Toggle the state of "Select All" checkbox
    setSelectAllChecked(!selectAllChecked);
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
                  <button className="save" onClick={() => handleSave(user.id)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(user.id, user.name, user.email, user.role)}>
                      Edit
                    </button>
                    
                    <button className="delete" onClick={() => {
                      onSelectRow(user.id);
                      handleDelete();
                    }}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange(1)}>&lt;&lt; First</button>
        <button onClick={() => handlePageChange(currentPage - 1)}>&lt; Previous</button>
        {/* <span>{`Page ${currentPage}`}</span> */}
        <button onClick={() => handlePageChange(1)}>1;</button>
        <button onClick={() => handlePageChange(1 + 1)}>2</button>
        <button onClick={() => handlePageChange(2 + 1)}>3</button>
        <button onClick={() => handlePageChange(3 + 1)}>4</button>
        <button onClick={() => handlePageChange(4 + 1)}>5</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</button>
        <button onClick={() => handlePageChange(Math.ceil(allusers.length/itemsPerPage ))}>
          Last &gt;&gt;
        </button>
      </div>
      <button onClick={onDeleteSelected} className="delete-selected">
        Delete Selected
      </button>
    </div>
  );
};

export default AdminDashboard;

