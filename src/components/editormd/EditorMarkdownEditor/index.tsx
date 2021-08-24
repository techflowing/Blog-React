import React from 'react';
import { consoleLog, insertScript } from '@/utils/common-util';
import '../css/editormd.css';
import '../EditorMarkdownHtml/index.css';
import './index.css';

interface EditorMarkdownEditorProps {}

class EditorMarkdownEditor extends React.PureComponent<EditorMarkdownEditorProps> {
  showEditorMdEditor() {
    // @ts-ignore
    editormd('editormd', {
      path: '/assets/editor.md/lib/',
      placeholder: '本编辑器支持Markdown编辑，左边编写，右边预览',
      imageUpload: true,
      imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'JPG', 'JPEG', 'GIF', 'PNG'],
      imageUploadURL: '/admin/wiki/upload/img',
      fileUpload: true,
      fileUploadURL: '/admin/wiki/upload/file',
      htmlDecode: true,
      emoji: false,
      tocStartLevel: 1,
      tocm: true,
      theme: 'dark',
      previewTheme: 'dark',
      editorTheme: 'pastel-on-dark',
      toolbarIcons: [
        'save',
        '|',
        'undo',
        'redo',
        '|',
        'bold',
        'del',
        'italic',
        'quote',
        '|',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        '|',
        'list-ul',
        'list-ol',
        'hr',
        '|',
        'link',
        'reference-link',
        'image',
        'file',
        'code',
        'preformatted-text',
        'code-block',
        'table',
        'datetime',
        'html-entities',
        'pagebreak',
        '|',
        'goto-line',
        'watch',
        'preview',
        'fullscreen',
        'clear',
        'search',
        '|',
        'help',
        'info',
      ],
      toolbarIconsClass: {
        bold: 'fa-bold',
      },
      toolbarIconTexts: {
        bold: 'a',
      },
      toolbarCustomIcons: {
        save: '<a href="javascript:;" title="保存" id="markdown-save" class="disabled"> <i class="fa fa-save" name="save"></i></a>',
      },
      toolbarHandlers: {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        save(cm, icon, cursor, selection) {
          consoleLog('点击保存');
        },
      },
    });
  }

  componentDidMount() {
    Promise.all([
      insertScript('/assets/editor.md/js/jquery.js'),
      insertScript('/assets/editor.md/js/editormd.js'),
      insertScript('/assets/editor.md/lib/marked.min.js'),
      insertScript('/assets/editor.md/lib/prettify.min.js'),
      insertScript('/assets/editor.md/lib/raphael.min.js'),
      insertScript('/assets/editor.md/lib/underscore.min.js'),
      insertScript('/assets/editor.md/lib/sequence-diagram.min.js'),
      insertScript('/assets/editor.md/lib/flowchart.min.js'),
      insertScript('/assets/editor.md/lib/jquery.flowchart.min.js'),
    ]).then(() => {
      consoleLog('加载依赖JS完成');
      this.showEditorMdEditor();
    });
  }

  render() {
    return (
      <div id="editormd">
        <textarea style={{ display: 'none' }} />
      </div>
    );
  }
}

export default EditorMarkdownEditor;
