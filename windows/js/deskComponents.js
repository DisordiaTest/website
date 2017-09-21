/**
 * Created by disordia on 2017/5/9.
 */

'use strict';

(function () {
    function timer() {
        let d = new Date();
        let min = d.getMinutes();
        let sec = d.getSeconds();
        let hr = d.getHours();
        let year = d.getFullYear();
        let month=d.getMonth();
        let day=d.getDay();
        document.getElementById('deskTimer').innerHTML=hr+":"+min+":"+sec+"<br/>"+
        year+"/"+month+"/"+day;
    }
    setInterval(timer, 1000);
})();