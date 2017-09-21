/**
 * Created by disordia on 2017/5/6.
 */
'use strict';

var windowTemp='<div class="window-container">\
    <div class="window-title-bar" draggable="false">\
        <div class="window-caption" draggable="false">\
            <div class="window-title-image" draggable="false"></div>\
                <label class="window-title-caption" onselectstart="return false;" draggable="false">undefined</label>\
        </div>\
        <div class="commonBtn windowBarBtn minWindowBtn"></div>\
        <div class="commonBtn windowBarBtn maxWindowBtn"></div>\
        <div class="commonBtn windowBarBtn closeBtn"></div>\
    </div>\
    <div class="window-content">\
        <iframe></iframe>\
        <div class="iframe-cover" style="left:0;top:0;z-index: 9000000; height: 100% ; position: absolute; width: 100%; opacity: 1; background: transparent;"></div>\
    </div>\
</div>'
;

var taskTemp='<div class="task-item">\
    <div></div>\
    </div>'
;

var deskItemTemp='<div class="desktop-item">\
    <div class="item-logo"></div>\
    <label class="app-name">undefined</label>\
    </div>';

var reSizeBarTemp='\
    <div class="t window-resize-bar" resizetype="t"></div>\
    <div class="r window-resize-bar" resizetype="r"></div>\
    <div class="l window-resize-bar" resizetype="l"></div>\
    <div class="b window-resize-bar" resizetype="b"></div>\
    <div class="lt window-resize-bar" resizetype="lt"></div>\
    <div class="rt window-resize-bar" resizetype="rt"></div>\
    <div class="lb window-resize-bar" resizetype="lb"></div>\
    <div class="rb window-resize-bar" resizetype="rb"></div>';

var Templates={};
Templates.taskTemp=taskTemp;
Templates.windowTemplate=windowTemp;
Templates.deskItemTemp=deskItemTemp;
Templates.resizeBarTemplate=reSizeBarTemp;
// module.exports=Templates;