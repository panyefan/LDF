var milisec = 0;
var seconds = 0;
var mins = 0;
var hours = 0;
var timer;
var timer_ticking = false;

function timer_callback() {
    if (milisec >= 9) {
        milisec = 0;
        seconds += 1;
    }
    else {
        milisec += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        mins += 1;
    }
    if (mins >= 60) {
        mins = 0;
        hours += 1;
    }
    displaytime();
    timer = setTimeout("timer_callback()", 100);
    if (totalSeconds() > 3599) {//超过固定时间，显示玩家已输3599
        clearTimeout(timer);
        youOver(); //游戏失败
        //youWin();
    }
}

function displaytime() {
    if (seconds < 10)
        sec_display = "0" + seconds;
    else
        sec_display = seconds;
    if (mins < 10)
        mins_display = "0" + mins;
    else
        mins_display = mins;
    if (hours < 10) {
        if (hours > 0)
            hours_display = "0" + hours + ":";
        else
            hours_display = "";
    }
    else
        hours_display = hours + ":";
    $('#glass strong').html(hours_display + mins_display + ":" + sec_display + "." + milisec);
}

function start() {
    timer_ticking = true;
    timer_callback();
}

function stop() {
    timer_ticking = false;
    clearTimeout(timer);
}

function reset() {
    stop();
    milisec = seconds = mins = hours = 0;
    displaytime();
}

function totalSeconds() {//共用了多少秒
    var s = parseInt(sec_display);
    var m = parseInt(mins_display) * 60;
    return s + m;
}