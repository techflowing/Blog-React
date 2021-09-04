import React, { useEffect, useState } from 'react';
import type { Key } from 'react';
import { Tree } from 'antd';
import type { Xmind } from '@/pages/XMind/components/XMindMenu/xmind-typings';
import styles from './index.less';

const { DirectoryTree } = Tree;

export type XMindMenuType = {
  menuData: Xmind[];
  expandKey?: string;
  onXMindSelect: (title: string, key: string) => void;
};

/**
 * 思维导图侧边目录菜单
 */
const XMindMenu: React.FC<XMindMenuType> = (props) => {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>();

  useEffect(() => {
    if (props.expandKey !== undefined) {
      setExpandedKeys([props.expandKey]);
    }
  }, [props.expandKey]);

  return (
    <DirectoryTree
      className={styles.xMindMenu}
      multiple={false}
      expandedKeys={expandedKeys}
      treeData={props.menuData}
      onExpand={(keys) => {
        setExpandedKeys(keys);
      }}
      onSelect={(keys, info) => {
        if (info.node.isLeaf && keys?.length === 1) {
          props.onXMindSelect(info.node.title as string, info.node.key as string);
        }
      }}
    />
  );
};

export default XMindMenu;
