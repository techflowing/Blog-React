import React, { useEffect, useState } from 'react';
import SiderContentFooterLayout from '@/components/layout/SiderContentFooterLayout';
import WikiDocumentEditor from '@/pages/admin/wiki/WikiDocument/components/WikiDocumentEditor';
import WikiDocumentToc from '@/pages/admin/wiki/WikiDocument/components/WikiDocumentToc';
import { history } from '@@/core/history';

const WikiDocumentAdmin: React.FC = () => {
  const [projectKey, setProjectKey] = useState<string>('');

  useEffect(() => {
    const key = history.location.query?.projectKey;
    if (key === undefined) {
      return;
    }
    setProjectKey(key as string);
  }, []);

  return (
    <SiderContentFooterLayout
      sider={<WikiDocumentToc projectKey={projectKey} />}
      content={<WikiDocumentEditor />}
      hideFooter={true}
    />
  );
};

export default WikiDocumentAdmin;
