/**
 * Created by disordia on 2017/5/9.
 */
'use strict';

function closeMenu() {
    let starbtn=document.getElementById('startBtn');
    let menu=document.getElementById('startMenu');
    if(menu.classList.contains('show')){
        menu.classList.remove('show');
        starbtn.setAttribute('open','false');
    }
}


$('#startBtn').on('click',function (event) {
    let menu=document.getElementById('startMenu');
    if(menu.classList.contains('show')){
        menu.classList.remove('show');
        event.target.setAttribute('open','false');
    }else{
        menu.classList.add('show');
        event.target.setAttribute('open','true');
    }
});


$('#desktop').on('click',function (event) {
    closeMenu();
});


$('#startMenu').on('click',function (event) {
    event.stopPropagation();
});

$('#settingBtn').on('click',function () {
    let settingWindow=new WindowClass({appID:3,appName:"Settings",logoUrl:'url(./imgs/settingblack.png)',
        srcUrl:'./components/settings.html',width:800,height:(600+33),resizable:false});
    WindowManager.addWindow(settingWindow);
    closeMenu();
});

$('#folderBtn').on('click',function () {
    let folderWindow=new WindowClass({appID:4,appName:"file explorer",logoUrl:'url(./imgs/fileexplorer.png)',
        srcUrl:'./components/fileExplore.html',resizable:true});
    WindowManager.addWindow(folderWindow);
    closeMenu();
});