import React from 'react';
import ValineComment from '@/components/ValineComment';
import ContentFooterLayout from '@/components/layout/ContentFooterLayout';
import { Col, Row } from 'antd';

/**
 * 留言板
 * @constructor
 */
const GuestBook: React.FC = () => {
  return (
    <ContentFooterLayout>
      <Row>
        <Col span={18} offset={3}>
          <ValineComment
            appId={'eTepYschlOxH4zTfyEPOuvE0-gzGzoHsz'}
            appKey={'BSpzIKtUb46oqIrL9GUuALaG'}
            placeholder={'道友请举手发言'}
            avatar={'wavatar'}
            pageSize={20}
          />
        </Col>
      </Row>
    </ContentFooterLayout>
  );
};

export default GuestBook;
