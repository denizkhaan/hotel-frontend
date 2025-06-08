import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUserSearch from "./AdminUserSearch";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/admin/all-users`, { headers });
    setUsers(res.data);
  };

  const updateUser = async () => {
    await axios.put(`${API}/admin/edit-user/${selectedUser.id}`, selectedUser, { headers });
    alert("User updated");
    fetchUsers();
    setSelectedUser(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/admin/delete-user/${id}`, { headers });
    alert("User deleted");
    fetchUsers();
  };

  return (
    <div>
      <AdminUserSearch/>
    <div className="container mt-4">
      <h4 className="mt-4">Users</h4>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => setSelectedUser(u)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="border p-3 mb-4">
          <h5>Edit User</h5>
          <input placeholder="Username" className="form-control mb-2"
            value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
          <input placeholder="Email" className="form-control mb-2"
            value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
          <input placeholder="Password" className="form-control mb-2"
            value={selectedUser.passwordHash} onChange={(e) => setSelectedUser({ ...selectedUser, passwordHash: e.target.value })} />
          <input placeholder="Role" className="form-control mb-2"
            value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} />
          <button className="btn btn-success" onClick={updateUser}>Save</button>
        </div>
      )}
    </div>
    </div>
  );
  
}
