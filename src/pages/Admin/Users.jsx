import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchUsers, updateUserRole } from '../../api/userApi';

export default function Users() {
  const [users, setUsers] = useState(null);

  function load() {
    fetchUsers().then(setUsers);
  }

  useEffect(load, []);

  async function handleRoleChange(id, role) {
    await updateUserRole(id, role);
    load();
  }

  return (
    <AdminLayout title="Users">
      {!users ? (
        <Loader label="Loading users…" />
      ) : (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            {
              key: 'role', label: 'Role', render: (row) => (
                row.is_protected ? (
                  <span className="badge badge-admin" title="Primary admin account — role is locked">
                    🔒 admin
                  </span>
                ) : (
                  <select
                    value={row.role}
                    onChange={(e) => handleRoleChange(row.id, e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--line)' }}
                  >
                    <option value="customer">customer</option>
                    <option value="admin">admin</option>
                  </select>
                )
              )
            },
          ]}
          rows={users}
          emptyMessage="No users yet."
        />
      )}
    </AdminLayout>
  );
}
