import React from 'react';

const AdminContentWrapper: React.FC = (props) => {
  return (
    <div style={{ height: '100%', width: '100%', padding: '16px 16px 0' }}>{props.children}</div>
  );
};

export default AdminContentWrapper;
