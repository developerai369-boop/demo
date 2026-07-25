import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchAllReviews, deleteReview } from '../../api/reviewApi';
import { starString } from '../../utils/productHelpers';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);

  function load() {
    fetchAllReviews().then(setReviews);
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    await deleteReview(id);
    load();
  }

  return (
    <AdminLayout title="Ratings &amp; Reviews">
      {!reviews ? (
        <Loader label="Loading reviews…" />
      ) : (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            {reviews.length} store review{reviews.length === 1 ? '' : 's'} from customers — general feedback on shopping with LaptopHub.
          </p>
          <DataTable
            columns={[
              { key: 'author_name', label: 'Reviewer' },
              { key: 'rating', label: 'Rating', render: (row) => starString(row.rating) },
              { key: 'comment', label: 'Feedback', render: (row) => row.comment || <span style={{ color: 'var(--text-muted)' }}>—</span> },
              { key: 'created_at', label: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
              {
                key: 'actions', label: '', render: (row) => (
                  <button className="btn btn-outline btn-sm btn-delete" onClick={() => handleDelete(row.id)}>Delete</button>
                )
              },
            ]}
            rows={reviews}
            emptyMessage="No reviews yet."
          />
        </>
      )}
    </AdminLayout>
  );
}
