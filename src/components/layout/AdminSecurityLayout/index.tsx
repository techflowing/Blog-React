import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { Link, useAccess, Redirect, history } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import Footer from '@/components/Footer';
import { useModel } from '@@/plugin-model/useModel';
import Logo from '@/components/Logo';
import styles from './index.less';

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return localItem as MenuDataItem;
  });

const AdminSecurityLayout: React.FC<any> = (props) => {
  const { initialState } = useModel('@@initialState');

  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const access = useAccess();

  if (!access.canAdmin) {
    return <Redirect to={'/user/login?redirect=/admin'} />;
  }

  return (
    <>
      <ProLayout
        className={styles.adminLayout}
        {...props}
        {...initialState?.settings}
        siderWidth={272}
        title={'管理后台'}
        logo={<Logo />}
        menuDataRender={menuDataRender}
        onMenuHeaderClick={() => {
          history.push('/');
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        footerRender={() => <Footer />}
        collapsedButtonRender={false}
        layout={'mix'}
        splitMenus={false}
      >
        {children}
      </ProLayout>
    </>
  );
};
export default AdminSecurityLayout;
