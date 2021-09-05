import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { createXMind } from '@/pages/admin/xmind/service';
import type { CreateXMindBody } from '@/pages/admin/xmind/xmind-typings';

export type CreateXMindModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onCreateSuccess: () => void;
  isDir: boolean;
  parentId: number;
};

/**
 * 新建 Modal
 * @param props
 * @constructor
 */
const CreateXMindModalForm: React.FC<CreateXMindModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({
      name: undefined,
      isDir: props.isDir,
      parentId: props.parentId,
    });
  });

  return (
    <ModalForm
      formRef={formRef}
      title={props.isDir ? '新建分类' : '新建思维导图'}
      visible={props.visible}
      onFinish={async (formData) => {
        createXMind(formData as CreateXMindBody).then((resp) => {
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
        placeholder={props.isDir ? '请输入分类名称' : '请输入思维导图名称'}
        rules={[
          {
            required: true,
            message: '请输入名称',
          },
        ]}
      />
      <ProFormText name="isDir" hidden={true} />
      <ProFormText name="parentId" hidden={true} />
    </ModalForm>
  );
};

export default CreateXMindModalForm;
