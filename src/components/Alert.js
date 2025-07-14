import React from 'react';

const Alert = ({ msg, type = 'success' }) => {
  if (!msg) return null;
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {msg}
    </div>
  );
};

export default Alert;
