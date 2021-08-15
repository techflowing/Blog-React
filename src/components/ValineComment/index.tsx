import React from 'react';
import { insertScript } from '@/utils/common-util';
import './index.css';

interface ValineCommentProps {
  appId: string;
  appKey: string;
  placeholder: string;
  avatar: string;
  pageSize: number;
}

/**
 * Valine 评论
 * @constructor
 */
class ValineComment extends React.PureComponent<ValineCommentProps> {
  componentDidMount() {
    insertScript('https://unpkg.com/valine/dist/Valine.min.js').then(() => {
      // @ts-ignore
      // eslint-disable-next-line no-new
      new Valine({
        el: '#vcomments',
        appId: this.props.appId,
        appKey: this.props.appKey,
        placeholder: this.props.placeholder,
        avatar: this.props.avatar,
        pageSize: this.props.pageSize,
      });
    });
  }

  render() {
    return (
      <div>
        <form autoComplete="off">
          <div className="valine-container" id="vcomments"></div>
        </form>
      </div>
    );
  }
}

export default ValineComment;
