import React, { useEffect, useRef, useState } from 'react';
import JSONEditorReact from '@/components/JsonEditor/JSONEditorReact';
import { Button, message, Typography } from 'antd';
import { isJsonString } from '@/utils/common-util';

const { Title } = Typography;

export type JsonConfigType = {
  title: string;
  desc?: React.ReactNode;
  configTitle: string;
  configType: 'array' | 'object';
  getConfig: () => Promise<any>;
  updateConfig: (content: any) => Promise<boolean>;
};

const JsonConfig: React.FC<JsonConfigType> = (props) => {
  const [plaintext, setPlaintext] = useState('');
  const contentRef = useRef<string>('');

  const schema = {
    title: props.configTitle,
    type: props.configType,
  };

  useEffect(() => {
    props.getConfig().then((data) => {
      const dataStr = JSON.stringify(data);
      if (!isJsonString(dataStr)) {
        return;
      }
      contentRef.current = dataStr;
      // 为了格式化显示
      setPlaintext(JSON.stringify(JSON.parse(dataStr), null, 2));
    });
  }, []);

  return (
    <div>
      <Title level={5} style={{ display: 'inline-block' }}>
        {props.title}
      </Title>
      <Button
        type={'primary'}
        style={{ float: 'right' }}
        onClick={() => {
          const content = contentRef.current;
          if (!isJsonString(content)) {
            message.error('数据异常，不是JSON格式数据');
            return;
          }
          props.updateConfig(JSON.parse(content)).then((result) => {
            if (result) {
              message.success('数据更新成功');
            } else {
              message.error('数据更新失败');
            }
          });
        }}
      >
        提交修改
      </Button>

      {props.desc}

      {props.desc === undefined ? <br /> : ''}
      <br />

      <JSONEditorReact
        search={false}
        enableSort={false}
        enableTransform={false}
        schema={schema}
        text={plaintext}
        mode={'code'}
        modes={['code', 'tree']}
        indentation={2}
        onChangeText={(jsonString: string) => {
          contentRef.current = jsonString;
        }}
      />
    </div>
  );
};

export default JsonConfig;
