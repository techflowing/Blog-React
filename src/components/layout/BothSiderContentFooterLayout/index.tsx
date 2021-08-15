import React from 'react';
import Footer from '@/components/Footer';

export type BothSiderContentFooterLayoutType = {
  leftSider: React.ReactNode;
  content: React.ReactNode;
  rightSider: React.ReactNode;
};

const BothSiderContentFooterLayout: React.FC<BothSiderContentFooterLayoutType> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          width: 272,
          minWidth: 272,
          overflow: 'auto',
        }}
      >
        {props.leftSider}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: '1 1 auto',
          overflow: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '75%', overflow: 'auto' }}>
          <div style={{ flex: '1 1 auto' }}>{props.content}</div>
          <div style={{ flex: '0 0 auto' }}>
            <Footer />
          </div>
        </div>
        <div style={{ width: '25%' }}>{props.rightSider}</div>
      </div>
    </div>
  );
};

export default BothSiderContentFooterLayout;
