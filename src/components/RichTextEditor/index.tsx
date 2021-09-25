import React from 'react';
import type { BraftEditorProps } from 'braft-editor';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

class RichTextEditor extends React.Component<BraftEditorProps, any> {
  render() {
    return (
      <div className="editor-wrapper">
        <BraftEditor {...this.props} />
      </div>
    );
  }
}

export default RichTextEditor;
