// @ts-nocheck
import React from 'react';
import '../../../../public/assets/common/css/bootstrap.css';
import '../../../../public/assets/common/css/codemirror.css';
import '../../../../public/assets/common/css/hotbox.css';
import '../../../../public/assets/common/css/color-picker.css';
import '../../../../public/assets/kityminder/css/kityminder.core.css';
import '../../../../public/assets/kityminder/css/kityminder.editor.css';
import { consoleLog, insertScriptWithNoRepeat } from '@/utils/common-util';

class KityMinderEditor extends React.PureComponent {
  initKityminderEditor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ref = this;
    angular
      .module('kityminderApp', ['kityminderEditor'])
      .controller('MainController', function ($scope) {
        $scope.initEditor = function (editor, minder) {
          window.editor = editor;
          window.minder = minder;
          ref.loadFinish = true;
        };
      });
    // 偶尔会加载失败，刷新会成功，临时处理下，还不知道原因
    setTimeout(function () {
      if (!ref.loadFinish) {
        window.location.reload();
      }
    }, 1000);
  }

  componentDidMount() {
    this.loadFinish = false;
    const jsArray = [
      '/assets/common/js/jquery.js',
      '/assets/common/js/bootstrap.min.js',
      '/assets/common/js/angular.js',
      '/assets/common/js/ui-bootstrap-tpls.min.js',
      '/assets/common/js/ui-codemirror.min.js',
      '/assets/common/js/codemirror.js',
      '/assets/common/js/color-picker.min.js',
      '/assets/common/js/hotbox.js',
      '/assets/common/js/marked.js',
      '/assets/kityminder/js/kity.min.js',
      '/assets/kityminder/js/kityminder.core.min.js',
      '/assets/kityminder/js/kityminder.editor.min.js',
    ];
    insertScriptWithNoRepeat(jsArray).then(() => {
      consoleLog('加载依赖JS完成');
      this.initKityminderEditor();
    });
  }

  render() {
    return (
      <div id="kityminder-container">
        <div ng-app="kityminderApp" ng-controller="MainController">
          <kityminder-editor on-init="initEditor(editor, minder)"></kityminder-editor>
        </div>
      </div>
    );
  }
}

export default KityMinderEditor;
// @ts-check
