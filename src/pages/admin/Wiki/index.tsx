import React from 'react';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';
import { getWikiProjectList } from '@/pages/wiki/WikiProject/service';

const WikiAdmin: React.FC = () => {
  const columns: ProColumns<WikiProject>[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
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
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },
  ];

  return (
    <div>
      <Title level={5}>Wiki 数据管理</Title>
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
        rowKey="key"
        pagination={{
          pageSize: 20,
        }}
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button type="primary" key="primary">
            新建项目
          </Button>,
        ]}
      />
    </div>
  );
};

export default WikiAdmin;
