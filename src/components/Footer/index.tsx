import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = ' techflowing All rights reserved. 京ICP备20017569号';
  return <DefaultFooter links={[]} copyright={`2021 ${defaultMessage}`} />;
};

export default Footer;
