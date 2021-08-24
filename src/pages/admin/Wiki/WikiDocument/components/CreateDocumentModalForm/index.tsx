import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { createNewDocument } from '@/pages/admin/wiki/WikiDocument/service';
import type { CreateDocumentBody } from '@/pages/admin/wiki/WikiDocument/document-typing';

export type CreateDocumentModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onCreateSuccess: () => void;
  isDir: boolean;
  parentId: number;
  projectKey: string;
};

/**
 * 新建 Modal
 * @param props
 * @constructor
 */
const CreateDocumentModalForm: React.FC<CreateDocumentModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({
      name: undefined,
      isDir: props.isDir,
      parentId: props.parentId,
      projectKey: props.projectKey,
    });
  });

  return (
    <ModalForm
      formRef={formRef}
      title={props.isDir ? '新建文件夹' : '新建文件'}
      visible={props.visible}
      onFinish={async (formData) => {
        createNewDocument(formData as CreateDocumentBody).then((resp) => {
          if (resp.code === 0) {
            message.success('创建成功');
            props.onCreateSuccess();
          } else {
            message.error(`创建失败：${resp.message}`);
          }
        });
      }}
      onVisibleChange={(value) => {
        props.onVisibleChange(value);
      }}
    >
      <ProFormText
        width="lg"
        name="name"
        placeholder={props.isDir ? '请输入文件夹名称' : '清输入文件名称'}
        rules={[
          {
            required: true,
            message: '请输入名称',
          },
        ]}
      />
      <ProFormText name="projectKey" hidden={true} />
      <ProFormText name="isDir" hidden={true} />
      <ProFormText name="parentId" hidden={true} />
    </ModalForm>
  );
};

export default CreateDocumentModalForm;
