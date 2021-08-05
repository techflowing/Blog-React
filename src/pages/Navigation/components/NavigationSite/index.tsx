import React from 'react';
import ProCard from '@ant-design/pro-card';
import type { NavigationNode, SiteNode } from '@/pages/Navigation/navigation-typings';
import styles from './index.less';
import { TagOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

export type NavigationSiteType = {
  data: NavigationNode[];
};

const NavigationSite: React.FC<NavigationSiteType> = (props) => {
  /**
   * 判断是否是一个叶子分类节点
   */
  const isCategoryLeafNode = (node: NavigationNode): boolean => {
    if (node === undefined || node.children === undefined) {
      return false;
    }
    const child = node.children[0];
    if (child === undefined) {
      return false;
    }
    return !child.hasOwnProperty('children');
  };

  const recursiveCategoryLeafNode = (node: NavigationNode, array: NavigationNode[]) => {
    if (isCategoryLeafNode(node)) {
      array.push(node);
      return;
    }
    node.children?.forEach((value) => {
      recursiveCategoryLeafNode(value as NavigationNode, array);
    });
  };

  /**
   * 提取节点
   * @param data
   */
  const flatNode = (data: NavigationNode[]): NavigationNode[] => {
    const array = new Array<NavigationNode>();
    data?.forEach((value) => {
      recursiveCategoryLeafNode(value, array);
    });
    return array;
  };

  const buildSiteCard = (site: SiteNode) => {
    return (
      <ProCard
        colSpan={6}
        key={site.title}
        hoverable
        onClick={() => {
          window.open(site.url, '_blank');
        }}
      >
        <Text className={styles.navigationSiteTitle}>{site.title}</Text>
        <Text className={styles.navigationSiteDesc}>{site.describe}</Text>
      </ProCard>
    );
  };

  const buildCategoryTitle = (title: string) => {
    return (
      <div id={title}>
        <TagOutlined className={styles.navigationCategoryTag} />
        <Text className={styles.navigationCategoryTitle}>{title}</Text>
      </div>
    );
  };

  const buildNavigationSiteCategory = (node: NavigationNode) => {
    return (
      <ProCard
        key={node.title}
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 16, sm: 16, md: 16, lg: 16 },
        ]}
        title={buildCategoryTitle(node.title)}
        wrap={true}
      >
        {node.children?.map((value) => buildSiteCard(value as SiteNode))}
      </ProCard>
    );
  };

  return (
    <div className={styles.navigationSite}>
      {flatNode(props.data)?.map((value) => buildNavigationSiteCategory(value))}
    </div>
  );
};

export default NavigationSite;
