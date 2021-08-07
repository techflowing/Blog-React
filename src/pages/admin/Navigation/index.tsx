import React from 'react';
import JsonConfig from '@/pages/admin/components/JsonConfig';
import { readConfig, writeConfig } from '@/services/config-service';

const NavigationAdmin: React.FC = () => {
  const configKey = 'navigation';

  return (
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
  );
};

export default NavigationAdmin;
