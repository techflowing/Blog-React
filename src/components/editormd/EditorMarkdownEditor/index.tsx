// @ts-nocheck
import React from 'react';
import { consoleLog, insertScriptWithNoRepeat } from '@/utils/common-util';
import '../../../../public/assets/editor.md/css/editormd.css';
import '../EditorMarkdownHtml/index.css';
import './index.css';

interface EditorMarkdownEditorProps {
  content?: string;
  onChange: () => void;
  onSaveClick: (content: string) => Promise<boolean>;
}

class EditorMarkdownEditor extends React.Component<EditorMarkdownEditorProps> {
  updateSaveStatus(enable: boolean) {
    if (enable) {
      document.getElementById('markdown-save')?.setAttribute('class', 'change');
    } else {
      document.getElementById('markdown-save')?.setAttribute('class', 'disabled');
    }
  }

  showEditorMdEditor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ref = this;
    this.editor = editormd('editormd', {
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
        save() {
          ref.props.onSaveClick(ref.editor.getMarkdown()).then((result) => {
            ref.updateSaveStatus(!result);
          });
        },
      },
      onchange() {
        if (ref.ignoreChange) {
          ref.ignoreChange = false;
          return;
        }
        ref.updateSaveStatus(true);
        ref.props.onChange();
      },
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
      this.showEditorMdEditor();
    });
  }

  shouldComponentUpdate(nextProps: Readonly<EditorMarkdownEditorProps>): boolean {
    return nextProps.content !== this.props.content;
  }

  componentDidUpdate() {
    consoleLog('EditorMarkdownEditor Update');
    if (this.props.content !== undefined) {
      this.updateSaveStatus(false);
      this.ignoreChange = true;
      this.editor?.setValue(this.props.content);
    }
  }

  render() {
    return (
      <div id="editormd">
        <input type="hidden" name="doc_id" id="documentId" value="" />
        <textarea style={{ display: 'none' }} />
      </div>
    );
  }
}

export default EditorMarkdownEditor;
// @ts-check
