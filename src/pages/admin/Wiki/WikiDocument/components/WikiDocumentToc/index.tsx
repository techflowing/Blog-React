import React, { useEffect, useState } from 'react';
import { message, Modal, Tree, Typography } from 'antd';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';
import { getWikiDocumentTree } from '@/pages/wiki/WikiDocument/service';
import { consoleLog } from '@/utils/common-util';
import styles from './index.less';
import { ExclamationCircleOutlined, FileAddOutlined, FileWordOutlined } from '@ant-design/icons';
import { getWikiProjectInfo } from '@/pages/wiki/WikiProject/service';
import CreateDocumentModalForm from '@/pages/admin/wiki/WikiDocument/components/CreateDocumentModalForm';
import type { ContextMenuItem } from '@/pages/admin/wiki/WikiDocument/components/ContextMenu';
import ContextMenu from '@/pages/admin/wiki/WikiDocument/components/ContextMenu';
import type { EventDataNode } from 'rc-tree/lib/interface';
import RenameDocumentModalForm from '@/pages/admin/wiki/WikiDocument/components/RenameDocumentModalForm';
import type { DataNode } from 'rc-tree/lib/interface';
import { deleteDocument } from '@/pages/admin/wiki/WikiDocument/service';

const { DirectoryTree } = Tree;
const { Text } = Typography;

export type WikiDocumentTocType = {
  projectKey: string;
};

/**
 * wiki目录
 */
const WikiDocumentToc: React.FC<WikiDocumentTocType> = (props) => {
  // 控制新建Modal是否显示
  const [showCreateModal, setShowCreateModal] = useState<{
    visible: boolean;
    isDir: boolean;
    parentId: number;
  }>({ visible: false, isDir: false, parentId: 0 });
  // 控制重命名 Modal
  const [showRenameModal, setShowRenameModal] = useState<{
    visible: boolean;
    documentId: number;
  }>({ visible: false, documentId: 0 });
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
   * 遍历获取所有子节点Id
   * @param node 节点
   */
  const traverseAllChildrenId = (node: DataNode): number[] => {
    const result = new Array<number>();
    const nodeQueue = new Array<DataNode>();
    nodeQueue.push(node);
    while (nodeQueue.length !== 0) {
      const curNode = nodeQueue.shift();
      if (curNode !== undefined) {
        // @ts-ignore
        result.push(curNode.id);
        if (!curNode.isLeaf && curNode.children !== undefined && curNode.children.length > 0) {
          curNode?.children.forEach((child) => nodeQueue.push(child));
        }
      }
    }
    return result;
  };

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

  /**
   * 删除弹窗确认
   */
  const showDeleteConfirmModal = (isDir: boolean, node: EventDataNode) => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: isDir ? '是否删除当前目录以及所有子文档？' : '是否删除此文档？',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        const ids = new Array<number>();
        if (isDir) {
          ids.push(...traverseAllChildrenId(node));
        } else {
          // @ts-ignore
          ids.push(node.id);
        }
        deleteDocument({ projectKey: props.projectKey, documentId: ids }).then((resp) => {
          if (resp.code === 0) {
            message.success('删除成功');
            fetchWikiDocumentTreeData();
          } else {
            message.error(`删除失败：${resp.message}`);
          }
        });
      },
    });
  };

  const onRightClickDocument = (event: React.MouseEvent, node: EventDataNode) => {
    // @ts-ignore
    const nodeId = node.id;
    setContextMenu({
      visible: true,
      pageX: event.pageX,
      pageY: event.pageY,
      item: [
        {
          key: 'rename',
          title: '重命名',
          onItemClick: () => {
            setShowRenameModal({ visible: true, documentId: nodeId });
          },
        },
        {
          key: 'delete',
          title: '删除',
          onItemClick: () => {
            showDeleteConfirmModal(false, node);
          },
        },
      ],
    });
  };

  const onRightClickDocumentDir = (event: React.MouseEvent, node: EventDataNode) => {
    // @ts-ignore
    const nodeId = node.id;
    setContextMenu({
      visible: true,
      pageX: event.pageX,
      pageY: event.pageY,
      item: [
        {
          key: 'newDir',
          title: '新建文件夹',
          onItemClick: () => {
            showCreateDocumentDirModal(nodeId);
          },
        },
        {
          key: 'newDocument',
          title: '新建文件',
          onItemClick: () => {
            showCreateDocumentModal(nodeId);
          },
        },
        {
          key: 'rename',
          title: '重命名',
          onItemClick: () => {
            setShowRenameModal({ visible: true, documentId: nodeId });
          },
        },
        {
          key: 'delete',
          title: '删除',
          onItemClick: () => {
            showDeleteConfirmModal(true, node);
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
            onRightClickDocument(info.event, info.node);
          } else {
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
      <RenameDocumentModalForm
        visible={showRenameModal.visible}
        onVisibleChange={(value) => {
          setShowRenameModal({ ...showRenameModal, visible: value });
        }}
        onRenameSuccess={() => {
          setShowRenameModal({ ...showRenameModal, visible: false });
          fetchWikiDocumentTreeData();
        }}
        documentId={showRenameModal.documentId}
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
