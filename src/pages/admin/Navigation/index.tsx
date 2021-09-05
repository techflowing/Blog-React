import React from 'react';
import JsonConfig from '@/pages/admin/components/JsonConfig';
import { readConfig, writeConfig } from '@/services/config-service';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';

const NavigationAdmin: React.FC = () => {
  const configKey = 'navigation';

  return (
    <AdminContentWrapper>
      <JsonConfig
        title={'导航站数据配置'}
        configTitle={'导航站数据配置'}
        configType={'array'}
        getConfig={() => {
          return readConfig(configKey).then((resp) => {
            return resp.data?.content;
          });
        }}
        updateConfig={(content) => {
          return writeConfig(configKey, content, '导航站数据').then((resp) => {
            return resp.code === 0;
          });
        }}
      />
    </AdminContentWrapper>
  );
};

export default NavigationAdmin;
