import React, { useEffect, useState } from 'react';
import SiderContentFooterLayout from '@/components/layout/SiderContentFooterLayout';
import type { NavigationNode } from '@/pages/Navigation/navigation-typings';
import { readConfig } from '@/services/config-service';
import { message } from 'antd';
import NavigationMenu from '@/pages/Navigation/components/NavigationMenu';

/**
 * 导航站页面
 */
const Navigation: React.FC = () => {
  // 定义导航站数据
  const [navigation, setNavigation] = useState<NavigationNode[]>([]);

  useEffect(() => {
    readConfig('navigation').then((resp) => {
      if (resp.code === 0 && resp.data?.content !== undefined) {
        setNavigation(resp.data.content as NavigationNode[]);
      } else {
        message.error(`获取导航站数据失败：${resp.message}`);
      }
    });
  }, []);

  const getNavigateCategory = () => {
    return <NavigationMenu data={navigation} />;
  };

  return <SiderContentFooterLayout sider={getNavigateCategory()} content={<p>内容</p>} />;
};

export default Navigation;
