import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

export type AddNewTagModalType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onCreateSuccess: (value: string) => void;
};

const AddNewTagModal: React.FC<AddNewTagModalType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({ tag: undefined });
  });

  return (
    <ModalForm
      formRef={formRef}
      title={'新建标签'}
      visible={props.visible}
      onFinish={async (formData) => {
        props.onCreateSuccess(formData.tag);
      }}
      onVisibleChange={(value) => {
        props.onVisibleChange(value);
      }}
    >
      <ProFormText
        width="lg"
        name="tag"
        placeholder={'请输入标签名'}
        rules={[
          {
            required: true,
            message: '请输入标签名',
          },
        ]}
      />
    </ModalForm>
  );
};
export default AddNewTagModal;
