import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUserSearch = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        const token = localStorage.getItem("token");

        axios
          .get(`https://localhost:7168/api/Admin/search-users?username=${search}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => setUsers(res.data))
          .catch((err) => console.error(err));
      } else {
        setUsers([]); // clear if input is empty
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="container">
      <h4> Search Users</h4>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Type username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.length > 0 && (
        <ul className="list-group">
          {users.map((u) => (
            <li key={u.id} className="list-group-item d-flex justify-content-between">
              <span>{u.username} - {u.email} - {u.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserSearch;
