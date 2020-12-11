

const groupFor = [
    document.getElementById("for1"),
    document.getElementById("for2"),
    document.getElementById("for3"),
    document.getElementById("for4"),
    document.getElementById("for5"),
    document.getElementById("for6")
];

const groupAgainst = [
    document.getElementById("against1"),
    document.getElementById("against2"),
    document.getElementById("against3"),
    document.getElementById("against4"),
    document.getElementById("against5"),
    document.getElementById("against6")
];

function disableF() {
    document.getElementById("disableF").style.display = "none";
    for (var i in groupFor) {
        if (groupFor[i].value == "") {
            groupFor[i].style.display = "none";
        }
        else {
            groupFor[i].disabled = "true";
        }
    }  
}

function disableA() {
    document.getElementById("disableA").style.display = "none";
    for (var i in groupAgainst) {
        if (groupAgainst[i].value == "") {
            groupAgainst[i].style.display = "none";
        }
        else {
            groupAgainst[i].disabled = "true";
        }
    }
}

function disableT() {
    document.getElementById("disableT").style.display = "none";
    document.getElementById("Topic").disabled = "true";

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


