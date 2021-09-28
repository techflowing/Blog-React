import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Typography, message, Tag } from 'antd';
import styles from './index.less';
import ContentFooterLayout from '@/components/layout/ContentFooterLayout';
import ProCard from '@ant-design/pro-card';
import type { AboutConfig } from '@/pages/About/about-typing';
import { readConfig } from '@/services/config-service';
import { ConfigKey } from '@/pages/common-constants';
import ThoughtList from '@/pages/Thought/components/ThoughtList';
import { getThoughtOverview, getThoughtTags } from '@/pages/Thought/service';

const { Text, Title } = Typography;

const Thought: React.FC = () => {
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>();
  const [tags, setTags] = useState<Record<string, number>>();
  const [overview, setOverview] = useState<{ tags: number; count: number }>();

  useEffect(() => {
    readConfig(ConfigKey.About).then((resp) => {
      if (resp.code === 0) {
        setAboutConfig(resp.data?.content);
      } else {
        message.error(`获取配置数据失败：${resp.message}`);
      }
    });
    getThoughtTags().then((resp) => {
      if (resp.code === 0 && resp.data !== undefined) {
        setTags(resp.data);
      }
    });
    getThoughtOverview().then((resp) => {
      if (resp.code === 0 && resp.data !== undefined) {
        setOverview(resp.data);
      }
    });
  }, []);

  return (
    <ContentFooterLayout>
      <Row gutter={[16, 16]} className={styles.container}>
        <Col offset={2} span={15}>
          <ThoughtList />
        </Col>
        <Col span={5}>
          <ProCard>
            <div className={styles.overviewContainer}>
              <Image width={140} src={aboutConfig?.avatar} preview={false} />
              <Title level={3} className={styles.username}>
                {aboutConfig?.username}
              </Title>
              <Text type={'secondary'} className={styles.slogan}>
                {aboutConfig?.slogan}
              </Text>
              <div className={styles.thoughtOverview}>
                <div className={styles.overviewItem}>
                  <Text type={'secondary'} strong>
                    {overview?.count}
                  </Text>
                  <Text type={'secondary'}>随想</Text>
                </div>
                <div className={styles.overviewItem}>
                  <Text type={'secondary'} strong>
                    {overview?.tags}
                  </Text>
                  <Text type={'secondary'}>标签</Text>
                </div>
              </div>
            </div>
          </ProCard>
          <ProCard className={styles.tagsContainer} title={'标签'}>
            {tags &&
              Object.keys(tags).map((key) => (
                <Tag>
                  {key} {tags[key] === 1 ? '' : tags[key]}
                </Tag>
              ))}
          </ProCard>
        </Col>
      </Row>
    </ContentFooterLayout>
  );
};
export default Thought;
