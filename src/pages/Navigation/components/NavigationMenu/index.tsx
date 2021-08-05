import React, { useEffect, useState } from 'react';
import type { NavigationNode } from '@/pages/Navigation/navigation-typings';
import { Menu } from 'antd';
import styles from './index.less';

const { SubMenu } = Menu;

export type NavigationMenuType = {
  data: NavigationNode[];
};

/**
 * 侧边菜单
 */
const NavigationMenu: React.FC<NavigationMenuType> = (props) => {
  // 当前展开的 SubMenu 菜单项 key 数组
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  /**
   * 判断是否是子分类节点
   * @param node 节点
   */
  const isSubCategory = (node: NavigationNode) => {
    if (node === undefined || node.children === undefined || node.children.length === 0) {
      return false;
    }
    const child = node.children[0];
    return child.hasOwnProperty('children');
  };

  const recursiveSubCategoryKey = (node: NavigationNode, keys: string[]) => {
    if (isSubCategory(node)) {
      keys.push(node.title);
      node.children?.forEach((child) => {
        recursiveSubCategoryKey(child as NavigationNode, keys);
      });
    }
  };

  const buildMenuItem = (item: NavigationNode) => {
    if (isSubCategory(item)) {
      return (
        <SubMenu key={item.title} title={item.title}>
          {item.children.map((subCategory) => buildMenuItem(subCategory as NavigationNode))}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.title}>{item.title}</Menu.Item>;
  };

  useEffect(() => {
    const subCategoryKey = new Array<string>();
    props.data?.forEach((item) => {
      recursiveSubCategoryKey(item, subCategoryKey);
    });
    setOpenKeys(subCategoryKey);
  }, [props.data]);

  return (
    <Menu
      className={styles.navigationMenu}
      mode={'inline'}
      theme={'dark'}
      onClick={(item) => {
        const view = window.document.getElementById(item.key);
        view?.scrollIntoView(true);
      }}
      openKeys={openKeys}
      expandIcon={<></>}
    >
      {props.data?.map((item) => buildMenuItem(item))}
    </Menu>
  );
};

export default NavigationMenu;
