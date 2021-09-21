import React from 'react';
import { Typography } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const { Title, Text } = Typography;

const BasicUserInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <div>
      <Title level={5}>基本信息</Title>
      <div>
        <Text strong>用户名：</Text>
        <Text>{initialState?.currentUser?.user?.username}</Text>
      </div>
      <div>
        <Text strong>角色：</Text>
        <Text>{initialState?.currentUser?.user?.roleDesc}</Text>
      </div>
    </div>
  );
};
export default BasicUserInfo;
