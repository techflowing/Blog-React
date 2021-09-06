import React, { useEffect, useState } from 'react';
import { Divider, message, Modal, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';
import { Tree } from 'antd';
import type { Xmind } from '@/pages/XMind/components/XMindMenu/xmind-typings';
import { getXmindTree } from '@/pages/XMind/service';
import styles from './index.less';
import type { DataNode } from 'rc-tree/lib/interface';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import CreateXMindModalForm from '@/pages/admin/xmind/XMindProject/components/CreateXMindModalForm';
import RenameXMindModalForm from '@/pages/admin/xmind/XMindProject/components/RenameXMindModalForm';
import { deleteXMind } from '@/pages/admin/xmind/service';
import { traverseAllChildrenId } from '@/utils/react-tree-util';
import { history } from 'umi';

const { DirectoryTree } = Tree;
const { Title, Text } = Typography;

const XMindProject: React.FC = () => {
  // 数据
  const [xmindTree, setXMindTree] = useState<Xmind[]>([]);
  // 控制新建Modal是否显示
  const [showCreateModal, setShowCreateModal] = useState<{
    visible: boolean;
    isDir: boolean;
    parentId: number;
  }>({ visible: false, isDir: false, parentId: 0 });
  // 控制重命名 Modal
  const [showRenameModal, setShowRenameModal] = useState<{
    visible: boolean;
    xMindId: number;
  }>({ visible: false, xMindId: 0 });

  const fetchXMindTree = () => {
    getXmindTree().then((resp) => {
      if (resp.code === 0) {
        setXMindTree(resp.data);
      } else {
        message.error(`'获取数据失败：${resp.message}`);
      }
    });
  };

  useEffect(() => {
    fetchXMindTree();
  }, []);

  /**
   * 创建新的文档
   * @param parentId 父级ID
   * @param isDir 是否是文件夹分类
   */
  const onCreateNewBottonClick = (parentId: number, isDir: boolean) => {
    setShowCreateModal({ visible: true, parentId, isDir });
  };

  /**
   * 重命名
   */
  const onRenameBottonClick = (id: number) => {
    setShowRenameModal({ visible: true, xMindId: id });
  };

  /**
   * 删除弹窗确认
   */
  const showDeleteConfirmModal = (isDir: boolean, node: DataNode) => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: isDir ? '是否删除当前目录以及目录下所有思维导图？' : '是否删除此思维导图？',
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
        deleteXMind({ id: ids }).then((resp) => {
          if (resp.code === 0) {
            message.success('删除成功');
            fetchXMindTree();
          } else {
            message.error(`删除失败：${resp.message}`);
          }
        });
      },
    });
  };

  /**
   * 渲染分类节点
   */
  const renderDirTitle = (node: DataNode) => {
    return (
      <div className={styles.xMindTitleContainer}>
        <Text>{node.title}</Text>
        <div className={styles.xMindActionContainer}>
          <FileAddOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              onCreateNewBottonClick(node.id, true);
            }}
          />
          <FileExcelOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              onCreateNewBottonClick(node.id, false);
            }}
          />
          <FileTextOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              onRenameBottonClick(node.id);
            }}
          />
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              showDeleteConfirmModal(true, node);
            }}
          />
        </div>
      </div>
    );
  };

  /**
   * 渲染思维导图节点
   */
  const renderLeafTitle = (node: DataNode) => {
    return (
      <div className={styles.xMindTitleContainer}>
        <Text>{node.title}</Text>
        <div className={styles.xMindActionContainer}>
          <EditOutlined
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/admin/xmind/editor?hashKey=${node.key}&name=${node.title}`);
              // window.open(, '_blank');
            }}
          />
          <FileTextOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              onRenameBottonClick(node.id);
            }}
          />
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              showDeleteConfirmModal(false, node);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <AdminContentWrapper>
      <Title level={5}>思维导图数据管理</Title>
      <Divider dashed />
      <ProCard
        className={styles.xMindTreeContainer}
        extra={
          <div className={styles.xMindActionContainer}>
            <FileAddOutlined
              onClick={(e) => {
                e.stopPropagation();
                onCreateNewBottonClick(0, true);
              }}
            />
            <FileExcelOutlined
              onClick={(e) => {
                e.stopPropagation();
                onCreateNewBottonClick(0, false);
              }}
            />
          </div>
        }
      >
        <DirectoryTree
          className={styles.xMindTree}
          multiple={false}
          treeData={xmindTree}
          titleRender={(node: DataNode) => {
            return node.isLeaf ? renderLeafTitle(node) : renderDirTitle(node);
          }}
        />
      </ProCard>
      <CreateXMindModalForm
        visible={showCreateModal.visible}
        onVisibleChange={(visible) => {
          setShowCreateModal({ ...showCreateModal, visible });
        }}
        onCreateSuccess={() => {
          setShowCreateModal({ ...showCreateModal, visible: false });
          fetchXMindTree();
        }}
        isDir={showCreateModal.isDir}
        parentId={showCreateModal.parentId}
      />
      <RenameXMindModalForm
        visible={showRenameModal.visible}
        onVisibleChange={(visible) => {
          setShowRenameModal({ ...showRenameModal, visible });
        }}
        onRenameSuccess={() => {
          setShowRenameModal({ ...showRenameModal, visible: false });
          fetchXMindTree();
        }}
        xMindId={showRenameModal.xMindId}
      />
    </AdminContentWrapper>
  );
};
export default XMindProject;
