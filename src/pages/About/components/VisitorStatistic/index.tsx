import React from 'react';
import { Typography } from 'antd';
import styles from './index.less';

const { Title, Text } = Typography;

export type VisitorStatisticType = {
  title: string;
  pv: number;
  uv: number;
};

/**
 * 访问统计数据
 */
const VisitorStatistic: React.FC<VisitorStatisticType> = (props) => {
  return (
    <div className={styles.statisticContainer}>
      <Title level={5}>{props.title}</Title>
      <div className={styles.statisticItem}>
        <Text>访问总次数</Text>
        <Text strong>{props.pv}</Text>
      </div>
      <div className={styles.statisticItem}>
        <Text>访问总人数</Text>
        <Text strong>{props.uv}</Text>
      </div>
    </div>
  );
};

export default VisitorStatistic;
