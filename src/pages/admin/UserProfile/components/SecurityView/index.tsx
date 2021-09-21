import React, { useState } from 'react';
import { Typography, List, message } from 'antd';
import styles from './index.less';
import ChangePwdModalForm from '@/pages/admin/UserProfile/components/ChangePwdModalForm';

const { Title } = Typography;

const SecurityView: React.FC = () => {
  const [showChangePwdModal, setShowChangePwdModal] = useState<boolean>(false);

  const data = [
    {
      title: '账户密码',
      actions: [
        <a className={styles.action} onClick={() => setShowChangePwdModal(true)}>
          修改
        </a>,
      ],
    },
    {
      title: '密保手机',
      description: `未绑定手机`,
      actions: [
        <a
          className={styles.action}
          onClick={() => {
            message.warning('暂未支持');
          }}
        >
          修改
        </a>,
      ],
    },
    {
      title: '备用邮箱',
      description: `未绑定邮箱`,
      actions: [
        <a
          className={styles.action}
          onClick={() => {
            message.warning('暂未支持');
          }}
        >
          修改
        </a>,
      ],
    },
  ];

  return (
    <div>
      <Title level={5}>安全设置</Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ChangePwdModalForm
        visible={showChangePwdModal}
        onVisibleChange={(value) => setShowChangePwdModal(value)}
        onChangePwdSuccess={() => setShowChangePwdModal(false)}
      />
    </div>
  );
};
export default SecurityView;
