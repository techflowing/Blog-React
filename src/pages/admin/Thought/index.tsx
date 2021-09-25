import React, { useRef, useState } from 'react';
import { Button, Divider, message, Modal, Tag, Typography } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import AdminContentWrapper from '@/components/layout/AdminSecurityLayout/components/AdminContentWrapper';
import type { Thought } from '@/pages/Thought/thought-typing';
import { getThoughtList } from '@/pages/Thought/service';
import { getRandomPresetColor } from '@/utils/common-util';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import ThoughtEditor from '@/pages/admin/Thought/components/ThoughtEditor';
import { deleteThought } from '@/pages/admin/Thought/service';

const { Title, Text } = Typography;

const ThoughtAdmin: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showEditor, setShowEditor] = useState<{ visible: boolean; value?: Thought }>({
    visible: false,
    value: undefined,
  });

  const columns: ProColumns<Thought>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (_, entity) => {
        return <Text strong>{entity.title}</Text>;
      },
    },
    {
      title: '标签',
      dataIndex: 'tag',
      render: (_, entry) => [
        <div style={{ display: 'flex', gap: 8 }} key={'option'}>
          {entry.tag?.map((value, index) => (
            <Tag key={`${value}-${index}`} color={getRandomPresetColor()}>
              {value}
            </Tag>
          ))}
        </div>,
      ],
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
              setShowEditor({ visible: true, value: entry });
            }}
          />
          <DeleteOutlined
            onClick={() => {
              Modal.confirm({
                title: '删除',
                icon: <ExclamationCircleOutlined />,
                content: `确认要删除 ${entry.title} 吗？`,
                okText: '删除',
                cancelText: '取消',
                onOk: () => {
                  deleteThought(entry.hashKey).then((resp) => {
                    if (resp.code === 0) {
                      message.success('删除成功');
                      actionRef.current?.reload();
                    } else {
                      message.error(`删除失败：${resp.message}`);
                    }
                  });
                },
              });
            }}
          />
        </div>,
      ],
    },
  ];

  return (
    <AdminContentWrapper>
      {showEditor.visible ? (
        <ThoughtEditor
          defaultThought={showEditor.value}
          onEditSuccess={() => {
            actionRef.current?.reload();
            setShowEditor({ visible: false });
          }}
          onBackButtonOnclick={() => {
            setShowEditor({ visible: false });
          }}
        />
      ) : (
        <div>
          <Title level={5}>随想录数据管理</Title>
          <Divider dashed />
          <ProTable<Thought>
            actionRef={actionRef}
            rowKey={(row) => row.hashKey}
            columns={columns}
            request={(params) => {
              return getThoughtList({
                params: { pageSize: params.pageSize, page: params.current },
              }).then((resp) => {
                return {
                  success: resp.code === 0,
                  data: resp.data.content,
                  total: resp.data.total,
                };
              });
            }}
            pagination={{
              pageSize: 20,
            }}
            search={false}
            toolBarRender={() => [
              <Button
                type="primary"
                key="createNew"
                onClick={() => {
                  setShowEditor({ visible: true });
                }}
              >
                有想法了
              </Button>,
            ]}
          />
        </div>
      )}
    </AdminContentWrapper>
  );
};
export default ThoughtAdmin;
