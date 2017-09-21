/**
 * Created by disordia on 2017/5/5.
 */
;(function (window) {
    var Core=function (options) {

    }

    Core.prototype={
        contructor:Core,

        init:function () {
            $("#system").load('./mainWindow.html');
        }
    }

    window.Core=Core;
})(window)

var core=new Core();
core.init();