import React from 'react';
import { message, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ImgCropUploadFormItem from '@/pages/admin/components/ImgCropUploadFormItem';
import { createWikiProject } from '@/pages/admin/Wiki/service';

export type AddNewModalFormType = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
};

/**
 * 创建新Wiki项目表单
 */
const AddNewModalForm: React.FC<AddNewModalFormType> = (props) => {
  return (
    <ModalForm
      title="新建 Wiki"
      visible={props.visible}
      onFinish={async (formData) => {
        createWikiProject(formData).then((resp) => {
          if (resp.code === 0) {
            message.success('创建成功');
            props.onVisibleChange(false);
          } else {
            message.error(`创建失败：${resp.message}`);
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
    </ModalForm>
  );
};

export default AddNewModalForm;
