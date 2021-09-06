// @ts-nocheck
import React from 'react';
import './index.css';
import { consoleLog, insertScriptWithNoRepeat } from '@/utils/common-util';
import { AimOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

interface KityMinderViewProps {
  title?: string;
  content?: string;
}

class KityMinderView extends React.PureComponent<KityMinderViewProps> {
  zoomIn() {
    if (this.minder !== undefined) {
      this.minder.execCommand('ZoomIn');
    }
  }

  zoomForce() {
    if (this.minder !== undefined) {
      this.minder.execCommand('camera', this.minder.getRoot(), 600);
    }
  }

  zoomOut() {
    if (this.minder !== undefined) {
      this.minder.execCommand('ZoomOut');
    }
  }

  setContent(content) {
    if (this.minder !== undefined && content !== undefined) {
      this.minder.importData('json', content);
    }
  }

  showXMindMapContent() {
    this.minder = new kityminder.Minder({
      renderTo: '#xmind-content',
    });
    this.minder.execCommand('hand');
    this.minder.execCommand('Theme', 'classic');
    this.setContent(this.props.content);
  }

  componentDidMount() {
    const js = [
      '/assets/common/js/jquery.js',
      '/assets/kityminder/js/kity.min.js',
      '/assets/kityminder/js/kityminder.core.js',
    ];
    insertScriptWithNoRepeat(js).then(() => {
      consoleLog('加载依赖JS完成');
      this.showXMindMapContent();
    });
  }

  componentDidUpdate() {
    this.setContent(this.props.content);
  }

  render() {
    return (
      <div className="xmind-map-container">
        <p className="xmind-name">{this.props.title}</p>
        <div className="xmind-content" id="xmind-content" />
        <div className="xmind-menu-container">
          <ZoomInOutlined
            className="xmind-menu-item"
            onClick={() => {
              this.zoomIn();
            }}
          />
          <AimOutlined
            className="xmind-menu-item"
            onClick={() => {
              this.zoomForce();
            }}
          />
          <ZoomOutOutlined
            className="xmind-menu-item"
            onClick={() => {
              this.zoomOut();
            }}
          />
        </div>
      </div>
    );
  }
}

export default KityMinderView;
// @ts-check
