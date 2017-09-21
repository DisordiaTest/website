'use strict';
// import * as Templates from './template.js'
function extend(a, b) { for (var key in b) { if (b.hasOwnProperty(key)) { a[key] = b[key]; } } return a; }

var sysglobal={
    onDrag:false,
    onResize:false,
    resizeType:"none",
    width:0,
    height:0,
    left:5,
    top:5,
    lastX:0,
    lastY:0,
    leftmax:0,
    topmax:0,
    minWidth:320,
    minHeight:240,
    maxWidth:320,
    maxHeight:240,
};

document.onmouseup=function (event) {
    sysglobal.onDrag=false;
    sysglobal.onResize=false;
    sysglobal.resizeType='none';
    let activeWindow = document.getElementById('active-window');
    if(activeWindow!=null){
        activeWindow.getElementsByClassName('iframe-cover')[0].classList.add('hide');
        //console.log('clickable');
    }
    document.body.style.cursor='auto';
};


document.onmousemove=function (event) {
    let activeWindow = document.getElementById('active-window');
    let e = event ? event : window.event;
    if(activeWindow!=null) {
        if (sysglobal.onDrag) {
            let nowX = e.clientX, nowY = e.clientY;
            let distX = nowX - sysglobal.lastX;
            let distY = nowY - sysglobal.lastY;
            let tleft = sysglobal.left + distX;
            let ttop = sysglobal.top + distY;
            if (tleft < 10) tleft = 3; else if (tleft > sysglobal.leftmax) tleft = sysglobal.leftmax;
            if (ttop < 10) ttop = 3; else if (ttop > sysglobal.topmax) ttop = sysglobal.topmax;
            activeWindow.style.left = tleft + 'px';
            activeWindow.style.top = ttop + 'px';
        }
        if (sysglobal.onResize) {
            let nowX = e.clientX, nowY = e.clientY;
            if (sysglobal.resizeType.indexOf('l') >= 0 || sysglobal.resizeType.indexOf('r') >= 0) {
                let distX = nowX - sysglobal.lastX;
                if (sysglobal.resizeType.indexOf('l') >= 0) {
                    let calcWidth = sysglobal.width - distX;
                    //left side
                    if (calcWidth < sysglobal.minWidth) {
                        calcWidth = sysglobal.minWidth;
                    }
                    let offsetMax = parseInt(activeWindow.style.left) + parseInt(activeWindow.style.width);
                    if (calcWidth > (offsetMax - 3)) {
                        calcWidth = offsetMax - 3;
                    }
                    activeWindow.style.left = (offsetMax - calcWidth) + 'px';
                    activeWindow.style.width = calcWidth + 'px';
                } else {
                    let calcWidth = sysglobal.width + distX;
                    if (calcWidth < sysglobal.minWidth) {
                        calcWidth = sysglobal.minWidth;
                    }
                    if (calcWidth > sysglobal.maxWidth - 3) {
                        calcWidth = sysglobal.maxWidth - 3;
                    }
                    activeWindow.style.width = calcWidth + 'px';
                }
            }

            if (sysglobal.resizeType.indexOf('b') >= 0 || sysglobal.resizeType.indexOf('t') >= 0) {
                let distY = nowY - sysglobal.lastY;
                if (sysglobal.resizeType.indexOf('b') >= 0) {
                    let calcHeight = sysglobal.height + distY;

                    if (calcHeight < sysglobal.minHeight) {
                        calcHeight = sysglobal.minHeight;
                    }
                    if (calcHeight > sysglobal.maxHeight - 3) {
                        calcHeight = sysglobal.maxHeight - 3;
                    }

                    activeWindow.style.height = calcHeight + 'px';
                } else {
                    let calcHeight = sysglobal.height - distY;

                    if (calcHeight < sysglobal.minHeight) {
                        calcHeight = sysglobal.minHeight;
                    }
                    let offsetMax = parseInt(activeWindow.style.top) + parseInt(activeWindow.style.height);
                    if (calcHeight > (offsetMax - 3)) {
                        calcHeight = offsetMax - 3;
                    }
                    activeWindow.style.top = (offsetMax - calcHeight) + 'px';
                    activeWindow.style.height = calcHeight + 'px';
                }
            }
        }
    }

};


//window definition:
var WindowClass=function (options) {
    let self = this;
    self.params=extend({},self.params);
    extend(self.params,options);
    self.createWindow();
};

WindowClass.prototype={
    constructor:WindowClass,

    params:{
        appID:0,
        logoUrl:null,
        appName:"none",
        srcUrl:"",
        resizable:true,
        //for maxmize to use:
        x:0,
        y:0,
        width:640,
        height:480,
        maximized:false,
    },

    windowInstance:null,
    taskItemInstance:null,

    getWindow:function () {
        return this.windowInstance;
    },

    getTaskItem:function () {
        return this.taskItemInstance;
    },


    createWindow:function () {
        let self=this;
        let newWindow=$(Templates.windowTemplate);
        let newTaskList=$(Templates.taskTemp);

        //set value:
        newWindow.find('.window-title-image').css('background-image',self.params.logoUrl);
        newWindow.find('.window-title-caption').text(self.params.appName);
        newWindow.css('width',self.params.width);
        newWindow.css('height',self.params.height);
        if(self.params.resizable) {
            let resizeBar = $(Templates.resizeBarTemplate);
            newWindow.append(resizeBar);
            //add listeners:
            resizeBar.on('mousedown', function (event) {
                self.setContentUnClickable();
                sysglobal.lastX = event.clientX;
                sysglobal.lastY = event.clientY;
                let pos = self.windowInstance.position();
                sysglobal.left = pos.left;
                sysglobal.top = pos.top;
                sysglobal.width = self.windowInstance.width();
                sysglobal.height = self.windowInstance.height();
                sysglobal.resizeType = event.target.getAttribute('resizetype');
                sysglobal.maxWidth = parseInt(WindowManager.container.width()) - pos.left;
                sysglobal.maxHeight = parseInt(WindowManager.container.height()) - pos.top - 53;
                sysglobal.onResize = true;

                document.body.style.cursor = $(event.target).css('cursor');
            });
        }
        newWindow.on('mousedown',function (event) {
            self.activeWindow();
        });


        let titleBar=newWindow.find('.window-title-bar');
        titleBar.on('selectstart',function () {
           return false;
        });

        titleBar.on('mousedown',function (event) {
            if(!self.params.maximized){
                sysglobal.onDrag=true;
                self.setContentUnClickable();
                if(!event){
                    event = window.event;
                    }
                let pos=self.windowInstance.position();
                sysglobal.left=pos.left;
                sysglobal.top=pos.top;
                sysglobal.lastX=event.clientX;
                sysglobal.lastY=event.clientY;
                sysglobal.leftmax=parseInt(WindowManager.container.width())-100;
                sysglobal.topmax=parseInt(WindowManager.container.height())-100;
            }
        });

        titleBar.find('.window-caption').on('dblclick',function () {
           self.maxWindow();
        });

        let contentframe=newWindow.find('.window-content>iframe');
        contentframe.attr('src',self.params.srcUrl);
        //add listeners to the right top buttons:
        newWindow.find('.minWindowBtn').on('click',function () {
           self.changeWindowVisibility();
        });
        newWindow.find('.maxWindowBtn').on('click',function () {
            self.maxWindow();
        });
        newWindow.find('.closeBtn').on('click',function () {
            self.closeWindow();
        });

        this.windowInstance=newWindow;

        newTaskList.css('background-image',self.params.logoUrl);
        newTaskList.on('click',function () {
            self.changeWindowVisibility();
        });

        this.taskItemInstance=newTaskList;
    },


    activeWindow:function () {
      let self = this;
        let activeWindow = document.getElementById('active-window');
        if(activeWindow){
            activeWindow.removeAttribute('id');
        }
        self.windowInstance.attr('id','active-window');
        WindowManager.moveToTop(self.windowInstance);
    },

    changeWindowVisibility:function(){
        let self = this;
        if(self.windowInstance.css('display')=='none'){
            self.windowInstance.css('display','block');
            self.activeWindow();
        }else{
            if(typeof(self.windowInstance.attr('id'))=='undefined'){
                self.activeWindow();
            }else {
                self.windowInstance.css('display', 'none');
                self.windowInstance.removeAttr('id');
            }
        }
    },

    closeWindow:function () {
        var self=this;
        WindowManager.removeWindow(self);
    },

    maxWindow:function () {
        var self=this;
        if(self.params.maximized){
            self.windowInstance.css('left',self.params.x);
            self.windowInstance.css('top',self.params.y);
            self.windowInstance.css('width',self.params.width);
            self.windowInstance.css('height',self.params.height);
            self.params.maximized=false;
        }else{
            self.params.x=self.windowInstance.css('left');
            self.params.y=self.windowInstance.css('top');
            self.params.width=self.windowInstance.css('width');
            self.params.height=self.windowInstance.css('height');
            self.windowInstance.css('width',WindowManager.container.width());
            let tHeight=parseInt(WindowManager.container.height())-parseInt(WindowManager.tasklist.height());
            self.windowInstance.css('height',tHeight+'px');
            self.windowInstance.css('left',0);
            self.windowInstance.css('top',0);
            self.params.maximized=true;
        }
    },

    setContentUnClickable:function () {
        let self=this;
        self.windowInstance.find('.iframe-cover').removeClass('hide');
        //console.log('setunclickable');
    },

    setContentClickable:function () {
        let self=this;
        self.windowInstance.find('.iframe-cover').addClass('hide');
        //console.log('clickable');
    }

    
};


function getIndex(arr,val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return i;
    }
    return -1;
}

function removeFromArr(arr,val) {
    let index = getIndex(arr,val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}


var WindowManager={
    constructor:function(desktop,taskList) {
        this.setDesktop(desktop);
        this.setTaskList(taskList);
    },
    windows:[],
    oldWidth:0,
    oldHeight:0,

    addWindow:function (window) {
        this.windows.unshift(window);
        this.container.append(window.getWindow());
        this.tasklist.append(window.getTaskItem());
        window.activeWindow();
        window.setContentClickable();
    },

    removeWindow:function (window) {
        removeFromArr(this.windows,window);
        window.getWindow().remove();
        window.getTaskItem().remove();
    },

    moveToTop:function (windowInstance) {
        let maxIndex = -1;
        for(let index in this.windows){
            let zIndex = this.windows[index].getWindow().css('z-index');
            if(parseInt(maxIndex)<parseInt(zIndex)){
                maxIndex=parseInt(zIndex);
            }
        }
        if(parseInt(windowInstance.css('z-index'))<maxIndex||maxIndex==0) {
            windowInstance.css('z-index', parseInt(maxIndex) + 2);
        }
    },

    setDesktop:function (desktop) {
        this.container=desktop;
        this.oldWidth=parseInt(desktop.width());
        this.oldHeight=parseInt(desktop.height());
    },

    setTaskList:function (taskList) {
        this.tasklist=taskList;
    },

    //resize function:
    onResize:function (event) {
        let bodyWidth=parseInt(this.container.width());
        let bodyHeight=parseInt(this.container.height());
        //console.log(bodyWidth+','+bodyHeight);
        for(var index in this.windows) {
            let wind = this.windows[index].getWindow();
            let windX = wind.position().left;
            let windY = wind.position().top;

            if (this.windows[index].params.maximized) {
                console.log('resizemax');
                wind.css('width',bodyWidth);
                let tHeight=bodyHeight-parseInt(this.tasklist.height());
                wind.css('height',tHeight);
            }
            else
            {
                if (windX + parseInt(wind.width()) > bodyWidth) {
                    let offsetX = bodyWidth - this.oldWidth;
                    console.log(offsetX);
                    if (offsetX < 0) {
                        let newLeft = windX + offsetX;
                        if (newLeft >= 3) {
                            wind.css('left', newLeft);
                        } else {
                            wind.css('left', 3);
                            wind.css('width', bodyWidth - 6);
                        }
                    }
                }

                if (windX + parseInt(wind.height()) > (bodyHeight - parseInt(this.tasklist.height()))) {
                    let offsetY = bodyHeight - this.oldHeight;
                    if (offsetY < 0) {
                        let newTop = windY + offsetY;
                        if (newTop >= 3) {
                            wind.css('top', newTop);
                        } else {
                            wind.css('top', 3);
                            wind.css('height', bodyHeight - 6 - parseInt(this.tasklist.height()));
                        }
                    }
                }

            }
        }
        this.oldWidth=bodyWidth;
        this.oldHeight=bodyHeight;
    },

};


WindowManager.constructor($('#desktop'),$('#task-list>ul'));

function InitWindowManager(desktop,taskList) {
    WindowManager.setDesktop(desktop);
    WindowManager.setTaskList(taskList);
    $(window).resize(function () {
        //console.log('onResize');
        WindowManager.onResize();
    });
}


var ShortCutManager={
    desktop:$('#desk-items-ul'),

    shortCuts:[],

    addShortCut:function(shortcut){
        let self = this;
        self.shortCuts.push(shortcut);
        self.desktop.append(shortcut.getItemInstance());
    },

    removeShortCut:function (shortcut) {
        let self = this;
        removeFromArr(self.shortCuts,shortcut);
        shortcut.getItemInstance().remove();
    },

    setDesktop:function (desktop) {
       this.desktop=desktop;
    }
};


//desk items:

var DeskItemClass=function (options) {
    let self = this;
    self.params=extend({},self.params);
    extend(self.params,options);
    self.createShorCut();
};

DeskItemClass.prototype={
    constructor:DeskItemClass,

    params:{
        appID:0,
        logoUrl:null,
        appName:"none",
        srcUrl:"",
    },

    itemInstance:null,

    getItemInstance:function () {
        return this.itemInstance;
    },

    createShorCut:function () {
        let self = this;
        let itemInstance = $(Templates.deskItemTemp);
        itemInstance.find('.item-logo').css('background-image',self.params.logoUrl);
        itemInstance.find('.app-name').text(self.params.appName);
        //add listeners:
        itemInstance.on('dblclick',function () {
            //open the window:
            let newWindow = new WindowClass(self.params);
            WindowManager.addWindow(newWindow);
        });
        self.itemInstance=itemInstance;
    },
};

function setBackGround() {
    getAttr('desktop',function (bkImage) {
        console.log(bkImage);
        if(bkImage!=null&&bkImage!=''){
            bkImage=JSON.parse(bkImage);
            WindowManager.container.css('background-image',bkImage['background-image']);
            WindowManager.container.css('background-size',bkImage['background-size']);
            WindowManager.container.css('background-repeat',bkImage['background-repeat']);

        };
     });
}


function InitAll(desktop,taskList,desktopList) {
    InitWindowManager(desktop,taskList);
    ShortCutManager.setDesktop(desktopList);
    setBackGround();
}





