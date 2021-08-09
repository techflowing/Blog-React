import React, { useEffect, useState } from 'react';
import { Image, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';
import { getWikiProjectList } from '@/pages/wiki/WikiProject/service';
import styles from './index.less';
import { history } from 'umi';
import ContentFooterLayout from '@/components/layout/ContentFooterLayout';

const { Title, Text } = Typography;

const WikiProjectList: React.FC = () => {
  // 列表数据
  const [wikiProjectList, setWikiProjectList] = useState<WikiProject[]>([]);

  useEffect(() => {
    getWikiProjectList().then((resp) => {
      if (resp?.code === 0) {
        setWikiProjectList(resp.data);
      }
    });
  }, []);

  const buildWikiProjectItem = (project: WikiProject) => {
    return (
      <ProCard
        key={project.name}
        colSpan={'20%'}
        hoverable
        onClick={() => {
          history.push(`/wiki/detail/${project.name}`);
        }}
      >
        <div>
          <Image src={project.thumb} preview={false} width={'100%'} />
          <div className={styles.wikiProjectInfoContainer}>
            <Title level={5}>{project.name}</Title>
            <div>
              <Text type={'success'}>{`文档总数：${project.docCount}`}</Text>
            </div>
            <div className={styles.wikiProjectDesc}>
              <Text type={'secondary'}>{project.description}</Text>
            </div>
          </div>
        </div>
      </ProCard>
    );
  };

  return (
    <ContentFooterLayout>
      <div className={styles.wikiProjectListContainer}>
        <ProCard
          className={styles.wikiProjectList}
          key={'Wiki项目列表'}
          gutter={[
            { xs: 8, sm: 8, md: 16, lg: 24 },
            { xs: 16, sm: 16, md: 16, lg: 16 },
          ]}
          wrap={true}
        >
          {wikiProjectList?.map((item) => buildWikiProjectItem(item))}
        </ProCard>
      </div>
    </ContentFooterLayout>
  );
};
export default WikiProjectList;
