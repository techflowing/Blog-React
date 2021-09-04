import React from 'react';

export type XMindMapContentType = {
  content: string;
};

const XMindMapContent: React.FC<XMindMapContentType> = (props) => {
  return <p>{props.content}</p>;
};

export default XMindMapContent;
