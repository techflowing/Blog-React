import React, { useEffect, useRef, useState } from 'react';
import { Form, message, Modal, Typography } from 'antd';
import type { FormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import RichTextEditor from '@/components/RichTextEditor';
import styles from './index.less';
import { getThoughtTags } from '@/pages/Thought/service';
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import AddNewTagModal from '@/pages/admin/Thought/components/AddNewTagModal';
import type { Thought } from '@/pages/Thought/thought-typing';
import type { EditorState } from 'braft-editor';
import { createThought, updateThought } from '@/pages/admin/Thought/service';
import BraftEditor from 'braft-editor';

const { Title } = Typography;

export type ThoughtEditorType = {
  defaultThought?: Thought;
  onEditSuccess: () => void;
  onBackButtonOnclick: () => void;
};

/**
 * 编辑页面
 */
const ThoughtEditor: React.FC<ThoughtEditorType> = (props) => {
  const formRef = useRef<FormInstance>();
  const [tags, setTags] = useState<string[]>(['杂记']);
  const [showCreateTagModal, setShowCreateTagModel] = useState<boolean>(false);

  useEffect(() => {
    if (props.defaultThought !== undefined) {
      formRef.current?.setFieldsValue({
        title: props.defaultThought.title,
        tag: props.defaultThought.tag,
        body: BraftEditor.createEditorState(props.defaultThought.content),
      });
    }
  }, []);

  useEffect(() => {
    getThoughtTags().then((resp) => {
      if (resp.code === 0 && resp.data !== undefined) {
        setTags(Object.keys(resp.data));
      }
    });
  }, []);

  const renderTitle = () => {
    return (
      <>
        <ArrowLeftOutlined
          onClick={() => {
            Modal.confirm({
              title: '警告',
              icon: <ExclamationCircleOutlined />,
              content: '返回上一级将丢失所有未保存的内容',
              okText: '返回',
              cancelText: '取消',
              onOk: () => {
                formRef.current?.resetFields();
                props.onBackButtonOnclick();
              },
            });
          }}
        />
        <Title className={styles.editorTitle} level={5}>
          随想录-{props.defaultThought !== undefined ? '编辑' : '新建'}
        </Title>
      </>
    );
  };

  /**
   * 更新请求
   */
  const update = (title: string, tag: string[], body: EditorState) => {
    updateThought({
      ...(props.defaultThought as Thought),
      title,
      content: body.toRAW(),
      html: body.toHTML(),
      tag,
    }).then((resp) => {
      if (resp.code === 0) {
        message.success('修改成功');
        props.onEditSuccess();
      } else {
        message.error(`修改失败：${resp.message}`);
      }
    });
  };

  /**
   * 新建请求
   */
  const createNew = (title: string, tag: string[], body: EditorState) => {
    createThought({ title, content: body.toRAW(), html: body.toHTML(), tag }).then((resp) => {
      if (resp.code === 0) {
        message.success('创建成功');
        props.onEditSuccess();
      } else {
        message.error(`创建失败：${resp.message}`);
      }
    });
  };
  return (
    <div className={styles.editorContainer}>
      <ProCard title={renderTitle()}>
        <ProForm
          formRef={formRef}
          layout={'horizontal'}
          submitter={{
            render: (_, dom) => {
              return <div className={styles.submitterContainer}>{dom}</div>;
            },
          }}
          onFinish={async (formData) => {
            if (formData.title === undefined) {
              message.warning('请输入标题');
              return;
            }
            if (formData.body === undefined) {
              message.warning('请输入正文内容');
              return;
            }
            if (props.defaultThought !== undefined) {
              update(formData.title, formData.tag, formData.body);
            } else {
              createNew(formData.title, formData.tag, formData.body);
            }
          }}
        >
          <ProFormText label={'标题'} name={'title'} />
          <ProFormCheckbox.Group
            label={'标签'}
            name={'tag'}
            options={tags}
            addonAfter={
              <PlusCircleOutlined
                className={styles.addTagIcon}
                onClick={() => setShowCreateTagModel(true)}
              />
            }
          />
          <Form.Item className={styles.richEditorFormItem} name={'body'} label={'正文'}>
            <RichTextEditor className="braft-editor" placeholder="请输入正文内容" />
          </Form.Item>
        </ProForm>
        <AddNewTagModal
          visible={showCreateTagModal}
          onVisibleChange={(value) => setShowCreateTagModel(value)}
          onCreateSuccess={(value) => {
            setTags([...tags, value]);
            setShowCreateTagModel(false);
          }}
        />
      </ProCard>
    </div>
  );
};
export default ThoughtEditor;
