import React, { useEffect, useRef } from 'react';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { changePwd } from '@/pages/admin/UserProfile/service';
import { md5String } from '@/utils/md5-util';

export type ChangePwdModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onChangePwdSuccess: () => void;
};

const ChangePwdModalForm: React.FC<ChangePwdModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.resetFields();
  });

  return (
    <ModalForm
      formRef={formRef}
      title={'修改密码'}
      visible={props.visible}
      onFinish={async (formData) => {
        if (formData.newPassword !== formData.newPasswordVerify) {
          message.error('两次密码输入不一致');
          return;
        }
        changePwd({
          newPassword: md5String(formData.newPassword),
          oldPassword: md5String(formData.oldPassword),
        }).then((resp) => {
          if (resp.code === 0) {
            message.success('修改成功');
            props.onChangePwdSuccess();
          } else {
            message.error(`修改密码失败：${resp.message}`);
          }
        });
      }}
      onVisibleChange={(value) => {
        props.onVisibleChange(value);
      }}
    >
      <ProFormText.Password
        width="lg"
        name="oldPassword"
        placeholder={'请输入旧密码'}
        rules={[
          {
            required: true,
            message: '请输入旧密码',
          },
        ]}
      />
      <ProFormText.Password
        width="lg"
        name="newPassword"
        placeholder={'请输入新密码'}
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
        ]}
      />
      <ProFormText.Password
        width="lg"
        name="newPasswordVerify"
        placeholder={'请再次输入新密码'}
        rules={[
          {
            required: true,
            message: '请再次输入新密码',
          },
        ]}
      />
    </ModalForm>
  );
};

export default ChangePwdModalForm;
