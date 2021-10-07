import React, { useEffect } from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { Link, useAccess, Redirect, history } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import Footer from '@/components/Footer';
import { useModel } from '@@/plugin-model/useModel';
import Logo from '@/components/Logo';
import styles from './index.less';
import RightContent from '@/components/RightContent';
import { clearUserInfo, consoleLog, saveUserInfoToLocalStorage } from '@/utils/common-util';
import { refreshToken } from '@/pages/user/Login/service';
import { message } from 'antd';

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return localItem as MenuDataItem;
  });

const AdminSecurityLayout: React.FC<any> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const access = useAccess();

  useEffect(() => {
    if (access.canAdmin) {
      consoleLog('准备刷新Token');
      const token = initialState?.currentUser?.token;
      const needRefresh = history.location.query?.refreshToken;
      if (token && needRefresh !== '0') {
        refreshToken(token).then((resp) => {
          if (resp.code === 0) {
            // 更新数据
            if (initialState && initialState.currentUser) {
              initialState.currentUser.token = resp.data;
              const user = { ...initialState.currentUser, token: resp.data };
              setInitialState({ ...initialState, currentUser: user });
              saveUserInfoToLocalStorage(user);
            }
          } else {
            message.error(`刷新Token失败：${resp.message}`);
            clearUserInfo();
            setInitialState({ ...initialState, currentUser: undefined });
            history.push('/user/login?redirect=/admin?refreshToken=0');
          }
        });
      }
    }
  }, []);

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
        rightContentRender={() => <RightContent />}
        layout={'mix'}
        splitMenus={false}
      >
        {children}
      </ProLayout>
    </>
  );
};
export default AdminSecurityLayout;
