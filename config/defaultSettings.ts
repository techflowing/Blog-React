import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  headerTheme: 'dark',
  navTheme: 'dark',
  // NEUQer蓝
  primaryColor: '#424242',
  layout: 'mix',
  splitMenus: true,
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '啊哈哈的小站',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
};

export default Settings;
