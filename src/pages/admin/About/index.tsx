import React from 'react';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';
import JsonConfig from '@/pages/admin/components/JsonConfig';
import { readConfig, writeConfig } from '@/services/config-service';
import { ConfigKey } from '@/pages/common-constants';

const AboutAdmin: React.FC = () => {
  return (
    <AdminContentWrapper>
      <JsonConfig
        title={'关于页数据配置'}
        configTitle={'关于页数据配置'}
        configType={'object'}
        getConfig={() => {
          return readConfig(ConfigKey.About).then((resp) => {
            return resp.data?.content;
          });
        }}
        updateConfig={(content) => {
          return writeConfig(ConfigKey.About, content, '关于页数据配置').then((resp) => {
            return resp.code === 0;
          });
        }}
      />
    </AdminContentWrapper>
  );
};
export default AboutAdmin;
