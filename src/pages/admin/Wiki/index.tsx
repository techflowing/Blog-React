import React, { useState } from 'react';
import { Button, Divider, Image, Typography } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';
import { getWikiProjectList } from '@/pages/wiki/WikiProject/service';
import { FormOutlined, DeleteOutlined, FileWordOutlined } from '@ant-design/icons';
import { consoleLog } from '@/utils/common-util';
import AddNewModalForm from '@/pages/admin/Wiki/components/AddNewModalForm';

const { Text, Title } = Typography;

const WikiAdmin: React.FC = () => {
  const [showCreateModalForm, setShowCreateModalForm] = useState(false);

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
      render: () => [
        <div style={{ display: 'flex', gap: 8 }} key={'option'}>
          <FormOutlined
            onClick={() => {
              consoleLog('点击编辑');
            }}
          />
          <FileWordOutlined />
          <DeleteOutlined />
        </div>,
      ],
    },
  ];

  return (
    <div>
      <Title level={5}>Wiki 数据管理</Title>
      <Divider dashed />
      <ProTable<WikiProject>
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
      />
    </div>
  );
};

export default WikiAdmin;
