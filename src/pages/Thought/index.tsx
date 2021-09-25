import React from 'react';
import RichTextEditor from '@/components/RichTextEditor';

const Thought: React.FC = () => {
  // const content = {
  //   __html: '<p>你好，<strong><span style="font-size:64px">世界!</span></strong></p><p></p>\n',
  // };

  return (
    // <div>
    //   <div className="html-wrap" dangerouslySetInnerHTML={content}></div>
    // </div>
    <RichTextEditor />
  );
};
export default Thought;
