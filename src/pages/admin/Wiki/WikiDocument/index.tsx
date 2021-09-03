import React, { useEffect, useState } from 'react';
import SiderContentFooterLayout from '@/components/layout/SiderContentFooterLayout';
import WikiDocumentEditor from '@/pages/admin/wiki/WikiDocument/components/WikiDocumentEditor';
import WikiDocumentToc from '@/pages/admin/wiki/WikiDocument/components/WikiDocumentToc';
import { history } from '@@/core/history';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const WikiDocumentAdmin: React.FC = () => {
  const [projectKey, setProjectKey] = useState<string>('');
  const [docKey, setDocKey] = useState<string>();
  // 控制 DocTree 目录是否可点击
  const [docSelectable, setDocSelectable] = useState<boolean>(true);

  useEffect(() => {
    const key = history.location.query?.projectKey;
    if (key === undefined) {
      return;
    }
    setProjectKey(key as string);
  }, []);

  return (
    <SiderContentFooterLayout
      sider={
        <WikiDocumentToc
          projectKey={projectKey}
          selectable={docSelectable}
          onDocumentSelect={(key) => {
            setDocKey(key);
          }}
          onDocumentClick={(selectable) => {
            if (!selectable) {
              Modal.confirm({
                title: '确认',
                icon: <ExclamationCircleOutlined />,
                content: '当前有未保存的内容，是否丢弃？',
                okText: '丢弃',
                onOk() {
                  setDocSelectable(true);
                },
              });
            }
          }}
        />
      }
      content={
        <WikiDocumentEditor
          docKey={docKey}
          onEditorStatusChange={(editor) => {
            setDocSelectable(!editor);
          }}
        />
      }
      hideFooter={true}
    />
  );
};

export default WikiDocumentAdmin;
