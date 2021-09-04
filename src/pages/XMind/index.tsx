import React, { useEffect, useState } from 'react';
import SiderContentFooterLayout from '@/components/layout/SiderContentFooterLayout';
import XMindMenu from '@/pages/XMind/components/XMindMenu';
import type { Xmind } from '@/pages/XMind/components/XMindMenu/xmind-typings';
import { getXmindContent, getXmindTree } from '@/pages/XMind/service';
import { message } from 'antd';
import XMindMapContent from '@/pages/XMind/components/XMindMapContent';

const XMind: React.FC = () => {
  // 数据
  const [xmindTree, setXMindTree] = useState<Xmind[]>([]);
  // 默认站开的节点
  const [expandKey, setExpandKey] = useState<string>();
  // 内容
  const [content, setContent] = useState<any>();

  /**
   * 查找第一个非空父节点
   */
  const findFirstNotEmptyDirNode = (data: Xmind[]): Xmind | undefined => {
    return data?.find(
      (value) => !value.isLeaf && value.children !== undefined && value.children.length > 0,
    );
  };

  /**
   * 查找任意节点，根目录下
   */
  const findAnyLeafNode = (data: Xmind[]) => {
    return data?.find((value) => value.isLeaf);
  };

  /**
   * 加载文档内容
   * @param key 节点Key
   */
  const loadXmindContentByKey = (key: string) => {
    getXmindContent(key).then((resp) => {
      if (resp.code === 0 && resp.data !== null) {
        setContent(resp.data);
      } else {
        message.error(`获取导图内容失败：${resp.message}`);
      }
    });
  };

  /**
   * 加载文档内容
   * @param node 节点数据
   */
  const loadXmindContent = (node?: Xmind) => {
    if (node === undefined) {
      return;
    }
    loadXmindContentByKey(node.key);
  };

  /**
   * 初始状态数据
   */
  const setInitData = (data: Xmind[]) => {
    if (data === undefined || data.length <= 0) {
      return;
    }
    setXMindTree(data);
    const first = findFirstNotEmptyDirNode(data);
    if (first === undefined) {
      loadXmindContent(findAnyLeafNode(data));
    } else {
      setExpandKey(first.key);
      loadXmindContent(findAnyLeafNode(first.children as Xmind[]));
    }
  };

  useEffect(() => {
    getXmindTree().then((resp) => {
      if (resp.code === 0) {
        setInitData(resp.data);
      } else {
        message.error(`数据获取失败：${resp.message}`);
      }
    });
  }, []);

  return (
    <SiderContentFooterLayout
      sider={
        <XMindMenu
          menuData={xmindTree}
          expandKey={expandKey}
          onXMindSelect={(key) => {
            loadXmindContentByKey(key);
          }}
        />
      }
      content={<XMindMapContent content={content} />}
    />
  );
};
export default XMind;
