/*!
 * File (upload) dialog plugin for Editor.md
 *
 * @file        file-dialog.js
 * @author      minho
 * @version     0.1.0
 * @updateTime  2017-01-06
 * {@link       https://github.com/lifei6671/SmartWiki}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

        var pluginName   = "file-dialog";

        exports.fn.fileDialog = function() {

            var _this       = this;
            var cm          = this.cm;
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var fileLang   = lang.dialog.file;
            var classPrefix = this.classPrefix;
            var iframeName  = classPrefix + "file-iframe";
            var dialogName  = classPrefix + pluginName, dialog;

            cm.focus();

            var loading = function(show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

            if (editor.find("." + dialogName).length < 1)
            {
                var guid   = (new Date).getTime();
                var action = settings.fileUploadURL + (settings.fileUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid;

                if (settings.crossDomainUpload)
                {
                    action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-file-dialog-" + guid;
                }

                var dialogContent = ( (settings.fileUpload) ? "<form action=\"" + action +"\" target=\"" + iframeName + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
                    ( (settings.fileUpload) ? "<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></iframe>" : "" ) +
                    "<label>" + fileLang.url + "</label>" +
                    "<input type=\"text\" data-url />" + (function(){
                        return (settings.fileUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                            "<input type=\"file\" name=\"" + classPrefix + "file-file\" />" +
                            "<input type=\"submit\" value=\"" + fileLang.uploadButton + "\" />" +
                            "</div>" : "";
                    })() +
                    "<br/>" +
                    "<label>" + fileLang.alt + "</label>" +
                    "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                    "<br/>" +
                    "<input type='hidden' data-icon>"+
                    ( (settings.fileUpload) ? "</form>" : "</div>");

                //var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + fileLang.managerButton + "</button>";

                dialog = this.createDialog({
                    title      : fileLang.title,
                    width      : (settings.fileUpload) ? 465 : 380,
                    height     : 254,
                    name       : dialogName,
                    content    : dialogContent,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons : {
                        enter : [lang.buttons.enter, function() {
                            var url  = this.find("[data-url]").val();
                            var alt  = this.find("[data-alt]").val();
                            var icon  = this.find("[data-icon]").val();

                            if (url === "")
                            {
                                alert(fileLang.fileURLEmpty);
                                return false;
                            }

                            var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";


                            if (icon === "" || !icon)
                            {
                                cm.replaceSelection("[" + alt + "](" + url + altAttr + ")");
                            }
                            else
                            {
                                cm.replaceSelection("[![" + alt + "](" + icon +  ")"+ alt +"](" + url + altAttr + ")");
                            }


                            if (alt === "") {
                                cm.setCursor(cursor.line, cursor.ch + 2);
                            }

                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {
                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }]
                    }
                });

                dialog.attr("id", classPrefix + "file-dialog-" + guid);

                if (!settings.fileUpload) {
                    return ;
                }

                var fileInput  = dialog.find("[name=\"" + classPrefix + "file-file\"]");

                fileInput.bind("change", function() {
                    var fileName  = fileInput.val();

                    if (fileName === "")
                    {
                        alert(fileLang.uploadFileEmpty);

                        return false;
                    }

                    loading(true);

                  var submitHandler = function() {
                    var form = dialog.find("[enctype=\"multipart/form-data\"]")[0];
                    var formData = new FormData(form);

                    $.ajax({
                      type: 'post',
                      url: settings.fileUploadURL + (settings.fileUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid,
                      data: formData,
                      cache: false,
                      processData: false,
                      contentType: false,
                      success: function (data, textStatus, jqXHR) {
                        if (data.success === 1) { // 上传成功
                          dialog.find("[data-url]").val(data.url); // 设置图片地址
                        } else {
                          alert(data.message); // 上传失败，弹出警告信息
                        }
                      },
                      error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(errorThrown);
                      }
                    });

                    loading(false); // 关闭加载效果
                    return false;
                  };

                    dialog.find("[type=\"submit\"]").bind("click", submitHandler).trigger("click");
                });
            }

            dialog = editor.find("." + dialogName);
            dialog.find("[type=\"text\"]").val("");
            dialog.find("[type=\"file\"]").val("");

            this.dialogShowMask(dialog);
            this.dialogLockScreen();
            dialog.show();

        };

    };

    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    {
        module.exports = factory;
    }
    else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) { // for Require.js

            define(["editormd"], function(editormd) {
                factory(editormd);
            });

        } else { // for Sea.js
            define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
        }
    }
    else
    {
        factory(window.editormd);
    }

})();
