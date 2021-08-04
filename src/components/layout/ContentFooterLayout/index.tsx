import Footer from '@/components/Footer';
import React from 'react';

const ContentFooterLayout: React.FC = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ flex: '1 1 auto' }}>{props.children}</div>
      <div style={{ flex: '0 0 auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default ContentFooterLayout;
