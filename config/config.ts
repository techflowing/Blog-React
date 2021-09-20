// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    dark: true, // 开启暗色主题
    compact: false, // 开启紧凑主题
  },
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 272,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'text-color': '#C6C9CF',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [],
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  webpack5: {},
  exportStatic: {},
  chainWebpack: (memo, { env, webpack, createCSSRule }) => {
    memo.plugin('provide-plugin').use(webpack.ProvidePlugin, [
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      },
    ]);
  },
});
