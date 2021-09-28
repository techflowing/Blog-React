import React from 'react';
import { Typography } from 'antd';
import styles from './index.less';
import ProList from '@ant-design/pro-list';
import type { Thought } from '@/pages/Thought/thought-typing';
import { getThoughtList } from '@/pages/Thought/service';
import { CalendarOutlined, TagsOutlined } from '@ant-design/icons';
import { convertDate } from '@/utils/moment-util';

const { Text, Title } = Typography;

const ThoughtList: React.FC = () => {
  return (
    <ProList<Thought>
      className={styles.listContainer}
      itemLayout={'vertical'}
      rowKey={(record) => record.hashKey}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      request={async (params) => {
        return getThoughtList({ params: { pageSize: params.pageSize, page: params.current } }).then(
          (resp) => {
            return {
              success: resp.code === 0,
              data: resp.data.content,
              total: resp.data.total,
            };
          },
        );
      }}
      metas={{
        title: {
          dataIndex: 'title',
          render: (_, entry) => <Title level={5}>{entry.title}</Title>,
        },
        description: {
          render: (_, entry) => (
            <>
              <CalendarOutlined className={styles.calendarOutlinedIcon} />
              {convertDate(entry.createTime)}
              {entry.tag && entry.tag.length > 0 && (
                <>
                  <TagsOutlined rotate={270} className={styles.tagsOutlined} />
                  {entry.tag.map((item) => (
                    <Text type={'secondary'} className={styles.tag}>
                      {item}
                    </Text>
                  ))}
                </>
              )}
            </>
          ),
        },
        content: {
          render: (_, entry) => <div dangerouslySetInnerHTML={{ __html: entry.html }} />,
        },
      }}
    />
  );
};
export default ThoughtList;
