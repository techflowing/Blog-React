import React, { useEffect, useRef, useState } from 'react';
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
  const projectHashKey = useRef<string>();

  const scrollContentToTop = () => {
    document.getElementById('wikiDocumentHtmlContent')?.scrollIntoView();
  };

  const getDocumentContent = (key: string) => {
    getWikiDocumentContent(key).then((resp) => {
      if (resp.code === 0) {
        // consoleLog(resp.data);
        setContent(resp.data);
        scrollContentToTop();
      }
    });
  };

  /**
   * 深度遍历获取
   * @param doc
   */
  const dfsGetFirstDocument = (doc: WikiDocument): string | undefined => {
    if (doc.isLeaf) {
      return doc.key;
    }
    if (doc.children === undefined) {
      return undefined;
    }
    for (const child of doc.children) {
      const key = dfsGetFirstDocument(child);
      if (key !== undefined) {
        return key;
      }
    }
    return undefined;
  };

  /**
   * 获取首篇文章
   * 1、如果指定了文档，则获取当前指定的文档
   * @param docs doc 树
   */
  const getFirstDocument = (docs: WikiDocument[]) => {
    for (const doc of docs) {
      const key = dfsGetFirstDocument(doc);
      if (key !== undefined) {
        getDocumentContent(key);
        break;
      }
    }
  };

  useEffect(() => {
    const projectKey = history.location.query?.projectKey;
    if (projectKey === undefined) {
      return;
    }
    projectHashKey.current = projectKey as string;
    getWikiDocumentTree(projectKey as string).then((resp) => {
      if (resp.code === 0) {
        setTreeData(resp.data);
        // 获取文档内容
        const docKey = history.location.query?.docKey;
        if (docKey === undefined) {
          getFirstDocument(resp.data);
        } else {
          getDocumentContent(docKey as string);
        }
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
              const key = keys[0] as string;
              history.push(`/wiki/detail?projectKey=${projectHashKey.current}&docKey=${key}`);
              getDocumentContent(key);
            }
          }}
        />
      }
      content={
        <div className={styles.wikiDocumentHtmlContent} id={'wikiDocumentHtmlContent'}>
          <EditorMarkdownHtml
            name={'wiki'}
            content={content}
            tocm={true}
            tocContainer={'#toc-container'}
          />
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
