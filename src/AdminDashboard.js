// AdminDashboard.js
import React, { useState, useEffect } from 'react';

const AdminDashboard = ({
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
  const [editableRowId, setEditableRowId] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleEdit = rowId => {
    setEditableRowId(rowId);
  };

  const handleSave = () => {
    setEditableRowId(null);
  };
  const handleDelete = rowId => {
    const updatedUsers = users.filter(user => user.id !== rowId  );
    setUsers(updatedUsers); // Update the users state to reflect the deletion
    console.log(users)
    onDeleteSelected([rowId]);
  };

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
        await onSelectRow(rowId);
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
              <td>{editableRowId === user.id ? <input type="text" value={user.name} /> : user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {editableRowId === user.id ? (
                  <button className="save" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(user.id)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => handleDelete(user.id)}>
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
        <span>{`Page ${currentPage}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</button>
        <button onClick={() => handlePageChange(Math.ceil(46/10))}>
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

