import React, { useEffect, useRef } from 'react';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';
import type { FormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, message } from 'antd';
import ImgCropUploadFormItem from '@/pages/admin/components/ImgCropUploadFormItem';
import { updateWikiProject } from '@/pages/admin/Wiki/service';

export type EditorModalFormType = {
  project: WikiProject;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onEditSuccess: () => void;
};

const EditorModalForm: React.FC<EditorModalFormType> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue(props.project);
  });

  return (
    <ModalForm
      formRef={formRef}
      title="编辑 Wiki 信息"
      visible={props.visible}
      onFinish={async (formData) => {
        updateWikiProject(formData).then((resp) => {
          if (resp.code === 0) {
            message.success('修改成功');
            props.onVisibleChange(false);
            props.onEditSuccess();
          } else {
            message.error(`修改信息失败：${resp.message}`);
          }
        });
      }}
      onVisibleChange={(value) => props.onVisibleChange(value)}
    >
      <ProFormText
        width="lg"
        name="name"
        label="Wiki 名称"
        placeholder="请输入 Wiki 名称"
        rules={[
          {
            required: true,
            message: '请输入 Wiki 名称',
          },
        ]}
      />
      <ProFormTextArea
        width="lg"
        name="description"
        label="Wiki 描述"
        placeholder="请输入 Wiki 描述"
        rules={[
          {
            required: true,
            message: '请输入 Wiki 描述',
          },
        ]}
      />
      <Form.Item
        name="thumb"
        label="Wiki 封面"
        rules={[
          {
            required: true,
            message: '请选择 Wiki 封面',
          },
        ]}
      >
        <ImgCropUploadFormItem />
      </Form.Item>
      <ProFormText width="lg" name="docCount" label="文档数量" readonly />
      <ProFormDateTimePicker width="lg" name="createTime" label="创建时间" readonly />
      <ProFormDateTimePicker width="lg" name="updateTime" label="修改时间" readonly />
      <ProFormText width="lg" name="hashKey" label="项目标识" hidden />
    </ModalForm>
  );
};

export default EditorModalForm;
