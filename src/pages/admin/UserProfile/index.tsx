import React from 'react';
import { Divider, Typography, Tabs } from 'antd';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';
import styles from './index.less';
import BasicUserInfo from '@/pages/admin/UserProfile/components/BasicUserInfo';
import Index from '@/pages/admin/UserProfile/components/SecurityView';

const { Title } = Typography;
const { TabPane } = Tabs;

const UserProfile: React.FC = () => {
  return (
    <AdminContentWrapper>
      <div className={styles.userProfileContainer}>
        <Title level={5}>用户信息管理</Title>
        <Divider dashed />
        <Tabs defaultActiveKey={'base'} tabPosition={'left'} className={styles.userProfileTabs}>
          <TabPane tab={'基础信息'} key={'base'}>
            <BasicUserInfo />
          </TabPane>
          <TabPane tab={'安全设置'} key={'security'}>
            <Index />
          </TabPane>
        </Tabs>
      </div>
    </AdminContentWrapper>
  );
};
export default UserProfile;
