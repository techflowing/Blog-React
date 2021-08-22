import React, { useRef, useState } from 'react';
import { Button, Divider, Image, message, Modal, Typography } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';
import { getWikiProjectList } from '@/pages/wiki/WikiProject/service';
import {
  FormOutlined,
  DeleteOutlined,
  FileWordOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import AddNewModalForm from '@/pages/admin/wiki/WikiProject/components/AddNewModalForm';
import { deleteWikiProject } from '@/pages/admin/wiki/service';
import EditorModalForm from '@/pages/admin/wiki/WikiProject/components/EditorModalForm';
import { history } from '@@/core/history';

const { Text, Title } = Typography;

const WikiProjectAdmin: React.FC = () => {
  const [showCreateModalForm, setShowCreateModalForm] = useState(false);
  const [showEditorModalForm, setShowEditorModalForm] = useState(false);
  const actionRef = useRef<ActionType>();
  const editorProject = useRef<WikiProject>();

  /**
   * 点击删除按钮
   * @param project 项目
   */
  const onDeleteWikiProjectClick = (project: WikiProject) => {
    Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除 ${project.name}" 吗？删除后不可恢复`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteWikiProject(project).then((resp) => {
          if (resp.code === 0) {
            message.success('删除成功');
            actionRef.current?.reload();
          } else {
            message.error(`删除失败：${resp.message}`);
          }
        });
      },
    });
  };

  const columns: ProColumns<WikiProject>[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: (_, entity) => {
        return <Text strong>{entity.name}</Text>;
      },
    },
    {
      title: '项目描述',
      dataIndex: 'description',
    },
    {
      title: '文档数量',
      dataIndex: 'docCount',
    },
    {
      title: '封面图',
      dataIndex: 'thumb',
      render: (_, entry) => {
        return <Image src={entry.thumb} width={32} preview={false} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, entry) => [
        <div style={{ display: 'flex', gap: 8 }} key={'option'}>
          <FormOutlined
            onClick={() => {
              editorProject.current = entry;
              setShowEditorModalForm(true);
            }}
          />
          <FileWordOutlined
            onClick={() => {
              history.push(`/admin/wiki/document?projectKey=${entry.hashKey}`);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteWikiProjectClick(entry);
            }}
          />
        </div>,
      ],
    },
  ];

  return (
    <div>
      <Title level={5}>Wiki 数据管理</Title>
      <Divider dashed />
      <ProTable<WikiProject>
        actionRef={actionRef}
        columns={columns}
        request={() => {
          return getWikiProjectList().then((resp) => {
            return {
              success: resp.code === 0,
              data: resp.data,
            };
          });
        }}
        rowKey="name"
        pagination={{
          pageSize: 20,
        }}
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            type="primary"
            key="createNew"
            onClick={() => {
              setShowCreateModalForm(true);
            }}
          >
            新建 Wiki
          </Button>,
        ]}
      />
      <AddNewModalForm
        visible={showCreateModalForm}
        onVisibleChange={(visible) => setShowCreateModalForm(visible)}
        onAddSuccess={() => {
          actionRef.current?.reload();
        }}
      />
      <EditorModalForm
        project={editorProject.current as WikiProject}
        visible={showEditorModalForm}
        onVisibleChange={(visible) => {
          setShowEditorModalForm(visible);
        }}
        onEditSuccess={() => {
          actionRef.current?.reload();
        }}
      />
    </div>
  );
};

export default WikiProjectAdmin;
