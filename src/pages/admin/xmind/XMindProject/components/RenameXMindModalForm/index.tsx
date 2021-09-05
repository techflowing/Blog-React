import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { renameXMind } from '@/pages/admin/xmind/service';
import type { RenameXMindBody } from '@/pages/admin/xmind/xmind-typings';

export type RenameXMindModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onRenameSuccess: () => void;
  xMindId: number;
};

/**
 * 重命名
 */
const RenameXMindModalForm: React.FC<RenameXMindModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({
      name: undefined,
      id: props.xMindId,
    });
  });

  return (
    <ModalForm
      formRef={formRef}
      title={'重命名'}
      visible={props.visible}
      onFinish={async (formData) => {
        renameXMind(formData as RenameXMindBody).then((resp) => {
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
      <ProFormText name="id" hidden={true} />
    </ModalForm>
  );
};

export default RenameXMindModalForm;
