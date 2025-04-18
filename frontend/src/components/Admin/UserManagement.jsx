import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123", // In real apps, never store plain passwords
      role: "admin",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingId ? { ...formData, id: editingId } : user
      ));
      setEditingId(null);
    } else {
      // Add new user
      const newUser = {
        id: Date.now(), // Better ID generation
        ...formData
      };
      setUsers([...users, newUser]);
    }
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setEditingId(user.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      <hr className='mb-6' />
      
      {/* Add/Edit User Form */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <h3 className='text-lg font-bold mb-4'>
          {editingId ? "Edit User" : "Add New User"}
        </h3>     
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-gray-700 mb-2'>Name</label>
              <input 
                type='text' 
                name='name' 
                value={formData.name} 
                onChange={handleChange} 
                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                required 
              />
            </div>
            
            <div>
              <label className='block text-gray-700 mb-2'>Email</label>
              <input 
                type='email' 
                name='email' 
                value={formData.email} 
                onChange={handleChange} 
                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                required 
              />
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-gray-700 mb-2'>Password</label>
              <input 
                type='password' 
                name='password' 
                value={formData.password} 
                onChange={handleChange} 
                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                required={!editingId} // Not required when editing (unless changing password)
                placeholder={editingId ? "Leave blank to keep current" : ""}
              />
            </div>
            
            <div>
              <label className='block text-gray-700 mb-2'>Role</label>
              <select 
                name='role' 
                value={formData.role} 
                onChange={handleChange} 
                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>
          
          <div className='flex space-x-3'>
            <button 
              type='submit' 
              className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors'
            >
              {editingId ? "Update User" : "Add User"}
            </button>
            
            {editingId && (
              <button
                type='button'
                onClick={cancelEdit}
                className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors'
              >
                Cancel
              </button>
            )}
          </div>
        </form>  
      </div>
      
      {/* Users Table */}
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-bold mb-4'>Current Users</h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'editor'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap space-x-2'>
                      <button 
                        onClick={() => handleEdit(user)}
                        className='text-blue-600 hover:text-blue-900 mr-3'
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='px-6 py-4 text-center text-gray-500'>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;