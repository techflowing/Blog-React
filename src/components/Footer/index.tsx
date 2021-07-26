import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = ' techflowing All rights reserved. 京ICP备20017569号';
  return <DefaultFooter links={[]} copyright={`2021 ${defaultMessage}`} />;
};
