import React, { useEffect, useState } from 'react';
import EditorMarkdownEditor from '@/components/editormd/EditorMarkdownEditor';
import { getWikiDocumentContent } from '@/pages/wiki/WikiDocument/service';
import { message } from 'antd';
import { updateDocument } from '@/pages/admin/wiki/WikiDocument/service';

export type WikiDocumentEditorType = {
  docKey?: string;
  onEditorStatusChange: (editor: boolean) => void;
};

const WikiDocumentEditor: React.FC<WikiDocumentEditorType> = (props) => {
  // 初始Doc 内容
  const [docInitContent, setDocInitContent] = useState<string>();

  useEffect(() => {
    if (props.docKey === undefined) {
      return;
    }
    getWikiDocumentContent(props.docKey).then((resp) => {
      if (resp.code === 0) {
        setDocInitContent(resp.data);
        props.onEditorStatusChange(false);
      } else {
        message.error(`获取文档内容失败：${resp.message}`);
      }
    });
  }, [props.docKey]);

  /**
   * 点击保存按钮
   * @param content markdown 内容
   */
  const onSaveDocumentClick = (content: string) => {
    return new Promise<boolean>((resolve) => {
      updateDocument({ content, hashKey: props.docKey as string }).then((resp) => {
        if (resp.code === 0) {
          resolve(true);
          props.onEditorStatusChange(false);
          message.success('更新文档成功');
        } else {
          resolve(false);
          message.error(`文档保存失败：${resp.message}`);
        }
      });
    });
  };

  return (
    <EditorMarkdownEditor
      content={docInitContent}
      onChange={() => {
        props.onEditorStatusChange(true);
      }}
      onSaveClick={(content) => {
        return onSaveDocumentClick(content);
      }}
    />
  );
};

export default WikiDocumentEditor;
