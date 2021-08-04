import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import './JSONEditorReact.css';

/**
 * 属性参考：https://nicedoc.io/josdejong/jsoneditor/docs/api.md?theme=light#user-content-api-reference
 */
export default class JSONEditorReact extends Component {
  componentDidMount() {
    // copy all properties into options for the editor
    // (except the properties for the JSONEditorReact component itself)
    const options = { ...this.props };
    delete options.json;
    delete options.text;

    this.jsoneditor = new JSONEditor(this.container, options);

    if ('json' in this.props) {
      this.jsoneditor.set(this.props.json);
    }
    if ('text' in this.props) {
      this.jsoneditor.setText(this.props.text);
    }
    this.schema = cloneDeep(this.props.schema);
    this.schemaRefs = cloneDeep(this.props.schemaRefs);
  }

  componentDidUpdate() {
    if ('json' in this.props) {
      this.jsoneditor.update(this.props.json);
    }

    if ('text' in this.props) {
      this.jsoneditor.updateText(this.props.text);
    }

    if ('mode' in this.props) {
      this.jsoneditor.setMode(this.props.mode);
    }

    // store a clone of the schema to keep track on when it actually changes.
    // (When using a PureComponent all of this would be redundant)
    const schemaChanged = !isEqual(this.props.schema, this.schema);
    const schemaRefsChanged = !isEqual(this.props.schemaRefs, this.schemaRefs);
    if (schemaChanged || schemaRefsChanged) {
      this.schema = cloneDeep(this.props.schema);
      this.schemaRefs = cloneDeep(this.props.schemaRefs);
      this.jsoneditor.setSchema(this.props.schema, this.props.schemaRefs);
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    // eslint-disable-next-line no-return-assign
    return <div className="jsoneditor-react-container" ref={(elem) => (this.container = elem)} />;
  }
}
