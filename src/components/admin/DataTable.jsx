import React from 'react';

/**
 * Generic admin table.
 * columns: [{ key, label, render?: (row) => ReactNode }]
 * rows: array of plain objects (each needs a unique `id`)
 */
export default function DataTable({ columns, rows, emptyMessage = 'No records found.' }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="data-table-empty">{emptyMessage}</div>}
    </div>
  );
}
