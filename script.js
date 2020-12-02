var topic = prompt("Proszê podaæ temat przeprowadzanej debaty", "<temat debaty>");

document.getElementById("Topic").innerHTML = topic;

var number = prompt("Proszê podaæ liczbê osób bior¹cyh udzia³ w debacie (min - 1 max - 6)", "<1 - 6>");
var FOR1 = document.getElementById("for1");
var FOR2 = document.getElementById("for2");
var FOR3 = document.getElementById("for3");
var FOR4 = document.getElementById("for4");
var FOR5 = document.getElementById("for5");
var FOR6 = document.getElementById("for6");

var AGAINST1 = document.getElementById("against1");
var AGAINST2 = document.getElementById("against2");
var AGAINST3 = document.getElementById("against3");
var AGAINST4 = document.getElementById("against4");
var AGAINST5 = document.getElementById("against5");
var AGAINST6 = document.getElementById("against6");

if (number <= "1") {
    FOR2.style.display = "none";
    AGAINST2.style.display = "none";
}

if (number <= "2") {
    FOR3.style.display = "none";
    AGAINST3.style.display = "none";
}

if (number <= "3") {
    FOR4.style.display = "none";
    AGAINST4.style.display = "none";
}

if (number <= "4") {
    FOR5.style.display = "none";
    AGAINST5.style.display = "none";
}

if (number <= "5") {
    FOR6.style.display = "none";
    AGAINST6.style.display = "none";
}
















var ms = 0;
var seconds = 0;
var minutes = 0;

var initialMinutes = 5;
minutes = initialMinutes;

var displayMs = 0;
var displaySeconds = 0;
var displayMinutes = 0;

var interval = null;

//div.onclick = buttonStart(), { "START" };
//var buttonStop = document.getElementById("stopWatch");
let buttonReset = document.getElementById("resetWatch");

var status = "stopped";

function buttonStop() {
    window.clearInterval(interval);
    status = "stopped";
}
//function buttonStart() {
    interval = window.setInterval(stopWatch, 10);
//}

function stopWatch() {
    
    ms--;
    if (ms <= 0) {
        ms = 99;
        seconds--;
        if (seconds <= 0) {
            seconds = 59;
            minutes--;
        }
    }

    if (ms < 10) {
        displayMs = "0" + ms.toString();
    }
    else {
        displayMs = ms;
    }

    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = displayMinutes + ":" + displaySeconds + ":" + displayMs;
    if (minutes < 0) {
        window.clearInterval(interval);
        status = "stopped";
        document.getElementById("display").innerHTML = "00:00:00"
    }
}



