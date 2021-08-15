import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { getWikiDocumentContent, getWikiDocumentTree } from '@/pages/wiki/WikiDocument/service';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';
import { Tree } from 'antd';
import BothSiderContentFooterLayout from '@/components/layout/BothSiderContentFooterLayout';
import styles from './index.less';
import EditorMarkdownHtml from '@/components/editormd/EditorMarkdownHtml';

const { DirectoryTree } = Tree;

const WikiDocumentDetail: React.FC = () => {
  const [treeData, setTreeData] = useState<WikiDocument[]>();
  const [content, setContent] = useState<string>('');

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
    <BothSiderContentFooterLayout
      leftSider={
        <DirectoryTree
          className={styles.wikiCatalogue}
          multiple={false}
          defaultExpandAll
          treeData={treeData}
          onSelect={(keys, info) => {
            if (info.node.isLeaf && keys?.length === 1) {
              getWikiDocumentContent(keys[0] as string).then((resp) => {
                if (resp.code === 0) {
                  // consoleLog(resp.data);
                  setContent(resp.data);
                }
              });
            }
          }}
        />
      }
      content={
        <div className={styles.wikiDocumentHtmlContent}>
          <EditorMarkdownHtml content={content} tocm={true} tocContainer={'#toc-container'} />
        </div>
      }
      rightSider={
        <div className={styles.wikiDocumentToc}>
          <p className={styles.wikiDocumentTocTitle}>目录</p>
          <div id="toc-container"></div>
        </div>
      }
    />
  );
};

export default WikiDocumentDetail;
