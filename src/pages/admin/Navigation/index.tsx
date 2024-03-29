import React from 'react';
import JsonConfig from '@/pages/admin/components/JsonConfig';
import { readConfig, writeConfig } from '@/services/config-service';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';
import { ConfigKey } from '@/pages/common-constants';

const NavigationAdmin: React.FC = () => {
  return (
    <AdminContentWrapper>
      <JsonConfig
        title={'导航站数据配置'}
        configTitle={'导航站数据配置'}
        configType={'array'}
        getConfig={() => {
          return readConfig(ConfigKey.Navigation).then((resp) => {
            return resp.data?.content;
          });
        }}
        updateConfig={(content) => {
          return writeConfig(ConfigKey.Navigation, content, '导航站数据').then((resp) => {
            return resp.code === 0;
          });
        }}
      />
    </AdminContentWrapper>
  );
};

export default NavigationAdmin;
