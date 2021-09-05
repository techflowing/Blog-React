import React from 'react';
import { consoleLog, insertScriptWithNoRepeat } from '@/utils/common-util';
import '../../../../public/assets/editor.md/css/editormd.css';
import './index.css';

interface EditorMarkdownHtmlProps {
  content: string;
  tocm?: boolean;
  tocContainer?: string;
}

class EditorMarkdownHtml extends React.PureComponent<EditorMarkdownHtmlProps> {
  /**
   * 清除之前渲染的 Dom
   */
  clearRenderDom() {
    const htmlView = document.getElementById('editormd-html-view');
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
    // @ts-ignore
    editormd.markdownToHTML('editormd-html-view', {
      markdown: this.props.content,
      htmlDecode: 'style,script,iframe',
      tocm: this.props.tocm,
      tocContainer: this.props.tocContainer,
      emoji: false,
      taskList: true,
      tex: true,
      flowChart: true,
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
      <div id="editormd-html-view" className={`editormd-preview-theme-dark`}>
        <textarea style={{ display: 'none' }} />
      </div>
    );
  }
}

export default EditorMarkdownHtml;
