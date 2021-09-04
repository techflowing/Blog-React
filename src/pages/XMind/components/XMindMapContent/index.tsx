import React from 'react';
import KityMinderView from '@/components/kityminder/KityMinderView';

export type XMindMapContentType = {
  title?: string;
  content?: string;
};

const XMindMapContent: React.FC<XMindMapContentType> = (props) => {
  return <KityMinderView content={props.content} title={props.title} />;
};

export default XMindMapContent;
