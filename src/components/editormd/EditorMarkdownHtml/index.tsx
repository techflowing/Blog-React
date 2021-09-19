import React from 'react';
import { consoleLog, insertScriptWithNoRepeat } from '@/utils/common-util';
import '../../../../public/assets/editor.md/css/editormd.css';
import './index.css';

interface EditorMarkdownHtmlProps {
  name: string;
  content: string;
  tocm?: boolean;
  tocContainer?: string;
}

class EditorMarkdownHtml extends React.PureComponent<EditorMarkdownHtmlProps> {
  /**
   * 构建容器ID
   */
  buildViewId() {
    return `editormd-html-view-${this.props.name}`;
  }

  /**
   * 清除之前渲染的 Dom
   */
  clearRenderDom() {
    const htmlView = document.getElementById(this.buildViewId());
    if (htmlView) {
      // 清除
      htmlView.innerHTML = '';
      const textarea = document.createElement('textarea');
      textarea.style.display = 'none';
      htmlView.appendChild(textarea);
    }
  }

  /**
   * 转换 HTML
   */
  markdownToHTML() {
    this.clearRenderDom();
    // 同以页面多组件时，因为动态加载JS的问题，editormd 可能获取不到，此处循环等待，兼容方案
    // @ts-ignore
    if (window.editormd === undefined) {
      setTimeout(() => {
        this.markdownToHTML();
      }, 100);
      return;
    }
    // @ts-ignore
    window.editormd?.markdownToHTML(this.buildViewId(), {
      markdown: this.props.content,
      htmlDecode: 'style,script,iframe',
      tocm: this.props.tocm,
      tocContainer: this.props.tocContainer,
      emoji: false,
      taskList: true,
      tex: true,
      flowChart: false,
      sequenceDiagram: true,
    });
  }

  componentDidMount() {
    const js = [
      '/assets/common/js/jquery.js',
      '/assets/editor.md/js/editormd.js',
      '/assets/editor.md/lib/marked.min.js',
      '/assets/editor.md/lib/prettify.min.js',
      '/assets/editor.md/lib/raphael.min.js',
      '/assets/editor.md/lib/underscore.min.js',
      '/assets/editor.md/lib/sequence-diagram.min.js',
      '/assets/editor.md/lib/flowchart.min.js',
      '/assets/editor.md/lib/jquery.flowchart.min.js',
    ];
    insertScriptWithNoRepeat(js).then(() => {
      consoleLog('加载依赖JS完成');
      this.markdownToHTML();
    });
  }

  componentDidUpdate() {
    this.markdownToHTML();
  }

  render() {
    return (
      <div id={this.buildViewId()} className={`editormd-preview-theme-dark`}>
        <textarea style={{ display: 'none' }} />
      </div>
    );
  }
}

export default EditorMarkdownHtml;
