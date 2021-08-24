import React from 'react';
import Footer from '@/components/Footer';

export type SiderContentFooterLayoutType = {
  sider: React.ReactNode;
  content: React.ReactNode;
  hideFooter?: boolean;
};

const SiderContentFooterLayout: React.FC<SiderContentFooterLayoutType> = (props) => {
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
        {props.sider}
      </div>
      <div
        className={'contentContainer'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          overflow: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        <div style={{ flex: '1 1 auto' }}>{props.content}</div>
        {!props.hideFooter && (
          <div style={{ flex: '0 0 auto' }}>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default SiderContentFooterLayout;
