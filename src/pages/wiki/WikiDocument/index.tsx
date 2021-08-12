import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { getWikiDocumentTree } from '@/pages/wiki/WikiDocument/service';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';
import { Tree } from 'antd';
import SiderContentFooterLayout from '@/components/layout/SiderContentFooterLayout';
import styles from './index.less';
import { consoleLog } from '@/utils/common-util';

const { DirectoryTree } = Tree;

const WikiDocumentDetail: React.FC = () => {
  const [treeData, setTreeData] = useState<WikiDocument[]>();

  useEffect(() => {
    const projectName = history.location.query?.projectName;
    if (projectName === undefined) {
      return;
    }
    getWikiDocumentTree(projectName as string).then((resp) => {
      if (resp.code === 0) {
        setTreeData(resp.data);
      }
    });
  }, []);

  return (
    <SiderContentFooterLayout
      sider={
        <DirectoryTree
          className={styles.wikiCatalogue}
          multiple={false}
          defaultExpandAll
          treeData={treeData}
          onSelect={(keys, info) => {
            if (info.node.isLeaf && keys?.length === 1) {
              consoleLog(`点击了：${keys[0]}`);
            }
          }}
        />
      }
      content={<p>测试</p>}
    />
  );
};

export default WikiDocumentDetail;
