import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost/taskly/taskly/backend/';

export default function AdminPanel({ onClose }) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    fetch(`${API_BASE}getUsers.php`)
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setUsers(data) : setUsers([]))
      .catch(() => setUsers([]));
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    const qs = new URLSearchParams();
    if (status) qs.append('status', status);
    if (userId) qs.append('user_id', userId);
    if (q) qs.append('q', q);

    fetch(`${API_BASE}getTasksAdmin.php?` + qs.toString())
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setTasks(data) : setTasks([]))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial load

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold"> Admin Dashboard</h3>
        <button className="btn btn-outline-dark" onClick={onClose}>Close</button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Total Tasks</h6>
            <h3 className="fw-bold text-primary">{tasks.length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Open</h6>
            <h3 className="fw-bold text-info">{tasks.filter(t => t.status === "Open").length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>In Progress</h6>
            <h3 className="fw-bold text-warning">{tasks.filter(t => t.status === "In Progress").length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Completed</h6>
            <h3 className="fw-bold text-success">{tasks.filter(t => t.status === "Completed").length}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">User</label>
            <select className="form-select" value={userId} onChange={e => setUserId(e.target.value)}>
              <option value="">All Users</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Status</label>
            <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Search</label>
            <input
              className="form-control"
              placeholder="Title / Description"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100" onClick={fetchTasks} disabled={loading}>
              {loading ? 'Loading...' : 'Apply'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {tasks.length === 0 ? (
            <p className="text-muted p-3">No tasks found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Title</th>
                    <th>Due</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => (
                    <tr key={t.id}>
                      <td>
                        <small>{t.user_name} <br />
                          <span className="text-muted">{t.user_email}</span>
                        </small>
                      </td>
                      <td>{t.title}</td>
                      <td><span className="text-muted small">{t.due_date || '-'}</span></td>
                      <td>
                        <span className={`badge ${t.priority === 'High' ? 'bg-danger' :
                          t.priority === 'Medium' ? 'bg-warning text-dark' :
                            'bg-secondary'}`}>
                          {t.priority || '-'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${t.status === 'Completed' ? 'bg-success' :
                          t.status === 'In Progress' ? 'bg-info text-dark' :
                            t.status === 'Open' ? 'bg-primary' :
                              'bg-secondary'}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        {t.is_important && <span className="badge bg-danger me-1">Important</span>}
                        {t.is_favorite && <span className="badge bg-warning text-dark me-1">★ Fav</span>}
                        {t.is_done && <span className="badge bg-success">✓ Done</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
