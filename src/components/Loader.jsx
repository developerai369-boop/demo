import React from 'react';

export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader">
      <span className="loader-spinner"></span>
      <span>{label}</span>
    </div>
  );
}
