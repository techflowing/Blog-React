import React, { useState } from 'react';
import KityMinderEditor from '@/components/kityminder/KityMinderEditor';
import { getXmindContent } from '@/pages/XMind/service';
import { Button, message, Typography, Upload } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import { exportXMind, updateXMind } from '@/pages/admin/xmind/service';
import { dataURLtoBlob, getBaseUrl } from '@/utils/common-util';

const { Text } = Typography;

const XMindEditor: React.FC = () => {
  // 内容
  const [content, setContent] = useState<any>();

  const fetchXMindContent = () => {
    const key = history.location.query?.hashKey;
    if (key === undefined) {
      return;
    }
    getXmindContent(key as string).then((resp) => {
      if (resp.code === 0) {
        setContent(resp.data);
      } else {
        message.error(`加载内容失败：${resp.message}`);
      }
    });
  };

  const getEditotMinder = () => {
    // @ts-ignore
    return window.editor?.minder;
  };

  /**
   * 保存操作
   */
  const onSaveButtonClick = () => {
    getEditotMinder()
      ?.exportData('json')
      .then((data: any) => {
        updateXMind({ content: data, hashKey: history.location.query?.hashKey as string }).then(
          (resp) => {
            if (resp.code === 0) {
              message.success('更新成功');
            } else {
              message.error(`更新内容失败：${resp.message}`);
            }
          },
        );
      });
  };

  /**
   * 导出图片
   */
  const onExportImageButtonClick = () => {
    getEditotMinder()
      ?.exportData('png')
      .then((data: any) => {
        const blob = dataURLtoBlob(data);
        // 建立标签，模拟点击下载
        const a = document.createElement('a');
        a.download = `${history.location.query?.name}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
      });
  };

  /**
   * 导出为Markdown
   */
  const onExportMarkdownButtonClick = () => {
    getEditotMinder()
      ?.exportData('markdown')
      .then((data: any) => {
        const blob = new Blob([data]);
        // 建立标签，模拟点击下载
        const a = document.createElement('a');
        a.download = `${history.location.query?.name}.md`;
        a.href = URL.createObjectURL(blob);
        a.click();
      });
  };

  /**
   * 下载文件
   * @param name 文件名称
   */
  const downloadXMindFile = (name: string) => {
    const url = `${getBaseUrl()}/blog/v1/xmind/download?name=${encodeURIComponent(name)}`;
    // 建立标签，模拟点击下载
    const a = document.createElement('a');
    a.href = url;
    a.click();
  };

  /**
   * 导出为Xmind文件，转出JSON后自己转 xmind
   */
  const onExportXMindButtonClick = () => {
    getEditotMinder()
      ?.exportData('json')
      .then((data: any) => {
        exportXMind(JSON.parse(data)).then((resp) => {
          if (resp.code === 0) {
            downloadXMindFile(resp.data);
          } else {
            message.error(`导出错误：${resp.message}`);
          }
        });
      });
  };

  return (
    <div>
      <div className={styles.topBarContainer}>
        <Text className={styles.title}>{history.location.query?.name}</Text>
        <div className={styles.optionButtonContainer}>
          <Upload
            accept={'.xmind'}
            maxCount={1}
            multiple={false}
            showUploadList={false}
            customRequest={(options) => {
              getEditotMinder()?.importData('xmind', options.file).then();
            }}
          >
            <Button type={'primary'}>导入XMind</Button>
          </Upload>
          <Button type={'primary'} onClick={() => onExportXMindButtonClick()}>
            导出XMind
          </Button>
          <Button type={'primary'} onClick={() => onExportMarkdownButtonClick()}>
            导出Markdown
          </Button>
          <Button type={'primary'} onClick={() => onExportImageButtonClick()}>
            导出图片
          </Button>
          <Button type={'primary'} onClick={() => onSaveButtonClick()}>
            保存
          </Button>
        </div>
      </div>
      <KityMinderEditor content={content} onEnvReady={() => fetchXMindContent()} />
    </div>
  );
};
export default XMindEditor;
