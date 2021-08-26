import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { renameDocument } from '@/pages/admin/wiki/WikiDocument/service';
import type { RenameDocumentBody } from '@/pages/admin/wiki/WikiDocument/document-typing';
import { message } from 'antd';

export type RenameDocumentModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onRenameSuccess: () => void;
  documentId: number;
};

/**
 * 重命名
 */
const RenameDocumentModalForm: React.FC<RenameDocumentModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({
      name: undefined,
      documentId: props.documentId,
    });
  });

  return (
    <ModalForm
      formRef={formRef}
      title={'重命名'}
      visible={props.visible}
      onFinish={async (formData) => {
        renameDocument(formData as RenameDocumentBody).then((resp) => {
          if (resp.code === 0) {
            message.success('重命名成功');
            props.onRenameSuccess();
          } else {
            message.error(`重命名失败：${resp.message}`);
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
        placeholder={'请输入新名称'}
        rules={[
          {
            required: true,
            message: '请输入新名称',
          },
        ]}
      />
      <ProFormText name="documentId" hidden={true} />
    </ModalForm>
  );
};

export default RenameDocumentModalForm;
