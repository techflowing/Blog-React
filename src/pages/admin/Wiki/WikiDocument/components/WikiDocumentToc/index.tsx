import React, { useEffect, useState } from 'react';
import { message, Tree, Typography } from 'antd';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';
import { getWikiDocumentTree } from '@/pages/wiki/WikiDocument/service';
import { consoleLog } from '@/utils/common-util';
import styles from './index.less';
import { FileAddOutlined, FileWordOutlined } from '@ant-design/icons';
import { getWikiProjectInfo } from '@/pages/wiki/WikiProject/service';
import CreateDocumentModalForm from '@/pages/admin/wiki/WikiDocument/components/CreateDocumentModalForm';
import type { ContextMenuItem } from '@/pages/admin/wiki/WikiDocument/components/ContextMenu';
import ContextMenu from '@/pages/admin/wiki/WikiDocument/components/ContextMenu';
import type { EventDataNode } from 'rc-tree/lib/interface';

const { DirectoryTree } = Tree;
const { Text } = Typography;

export type WikiDocumentTocType = {
  projectKey: string;
};

const WikiDocumentToc: React.FC<WikiDocumentTocType> = (props) => {
  // 控制新建Modal是否显示
  const [showCreateModal, setShowCreateModal] = useState<{
    visible: boolean;
    isDir: boolean;
    parentId: number;
  }>({ visible: false, isDir: false, parentId: 0 });
  // 控制右键菜单
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    pageX: number;
    pageY: number;
    item: ContextMenuItem[];
  }>({
    visible: false,
    pageX: 0,
    pageY: 0,
    item: [],
  });
  const [treeData, setTreeData] = useState<WikiDocument[]>([]);
  const [projectName, setProjectName] = useState<string>('目录');

  /**
   * 获取文档树数据
   */
  const fetchWikiDocumentTreeData = () => {
    getWikiDocumentTree(props.projectKey).then((resp) => {
      if (resp.code === 0) {
        setTreeData(resp.data);
      } else {
        message.error(`获取数据失败：${resp.message}`);
      }
    });
  };

  useEffect(() => {
    if (props.projectKey === undefined || props.projectKey === '') {
      return;
    }
    fetchWikiDocumentTreeData();
    getWikiProjectInfo(props.projectKey).then((resp) => {
      if (resp.code === 0) {
        setProjectName(resp.data.name);
      }
    });
  }, [props.projectKey]);

  /**
   * 创建文件
   * @param parentId 父级ID
   */
  const showCreateDocumentModal = (parentId: number) => {
    setShowCreateModal({ visible: true, isDir: false, parentId });
  };
  /**
   * 创建文件夹
   * @param parentId 父级ID
   */
  const showCreateDocumentDirModal = (parentId: number) => {
    setShowCreateModal({ visible: true, isDir: true, parentId });
  };

  const onRightClickDocument = (event: React.MouseEvent, node: EventDataNode) => {
    setContextMenu({
      visible: true,
      pageX: event.pageX,
      pageY: event.pageY,
      item: [
        {
          key: 'rename',
          title: '重命名',
          onItemClick: () => {
            consoleLog(`点击重命名${node.isLeaf}`);
          },
        },
        {
          key: 'delete',
          title: '删除',
          onItemClick: () => {
            consoleLog('点击删除');
          },
        },
      ],
    });
  };

  const onRightClickDocumentDir = (event: React.MouseEvent, node: EventDataNode) => {
    setContextMenu({
      visible: true,
      pageX: event.pageX,
      pageY: event.pageY,
      item: [
        {
          key: 'newDir',
          title: '新建文件夹',
          onItemClick: () => {
            // @ts-ignore
            showCreateDocumentDirModal(node.id);
          },
        },
        {
          key: 'newDocument',
          title: '新建文件',
          onItemClick: () => {
            // @ts-ignore
            showCreateDocumentModal(node.id);
          },
        },
        {
          key: 'rename',
          title: '重命名',
          onItemClick: () => {
            consoleLog('点击重命名');
          },
        },
        {
          key: 'delete',
          title: '删除',
          onItemClick: () => {
            consoleLog('点击删除');
          },
        },
      ],
    });
  };

  const dismissContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className={styles.wikiDocumentToc}>
      <div className={styles.wikiDocumentTocTop}>
        <Text className={styles.wikiDocumentTitle}>{projectName}</Text>
        <div className={styles.wikiDocumentTocTopIconContainer}>
          <FileAddOutlined
            onClick={() => {
              showCreateDocumentDirModal(0);
            }}
          />
          <FileWordOutlined
            onClick={() => {
              showCreateDocumentModal(0);
            }}
          />
        </div>
      </div>
      <DirectoryTree
        className={styles.wikiDocumentTocTree}
        draggable
        blockNode={true}
        multiple={false}
        onDrop={() => {
          consoleLog('onDrop');
        }}
        onRightClick={(info) => {
          if (info.node.isLeaf) {
            consoleLog('点击叶子');
            onRightClickDocument(info.event, info.node);
          } else {
            consoleLog('点击文件夹');
            onRightClickDocumentDir(info.event, info.node);
          }
        }}
        treeData={treeData}
      />
      <CreateDocumentModalForm
        visible={showCreateModal.visible}
        onVisibleChange={(value) => {
          setShowCreateModal({ ...showCreateModal, visible: value });
        }}
        onCreateSuccess={() => {
          setShowCreateModal({ ...showCreateModal, visible: false });
          fetchWikiDocumentTreeData();
        }}
        isDir={showCreateModal.isDir}
        parentId={showCreateModal.parentId}
        projectKey={props.projectKey}
      />
      {contextMenu.visible && (
        <ContextMenu
          pageX={contextMenu.pageX}
          pageY={contextMenu.pageY}
          item={contextMenu.item}
          onClickMask={() => {
            dismissContextMenu();
          }}
        />
      )}
    </div>
  );
};

export default WikiDocumentToc;
