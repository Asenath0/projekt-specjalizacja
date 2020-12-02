var topic = prompt("Prosze podac temat przeprowadzanej debaty", "<temat debaty>");

document.getElementById("Topic").innerHTML = topic;

var number = Number(prompt("Prosze podac liczbe osob jednej dru¿yny bioracyh udzial w debacie (min - 1 max - 6)", "<1 - 6>"));


if (number < "1") {
    number = 1;
}
else if (number > "6") {
    number = 6;
}
else if (number <= "6" && number >= "1") {
    number = number;
}
else {
    alert("Nieprawidlowy numer, prosze odswiezyc strone");
}



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

alert("UCZESTNICY GRUPY ZA:")

for (var i = 1; i <= 6; i++) {
    if (i < number + 1) {
        var name = prompt("Prosze podac imie " + i + " uczestnika z grupy ZA:", "<imie>")
        groupFor[i - 1].innerHTML = name;
    }
    else {
        groupFor[i - 1].style.display = "none";
    }
}

alert("UCZESTNICY GRUPY PRZECIW:")

for (var i = 1; i <= 6; i++) {
    if (i < number + 1) {
        var name = prompt("Prosze podac imie " + i + " uczestnika z grupy PRZECIW:", "<imie>")
        groupAgainst[i - 1].innerHTML = name;
    }
    else {
        groupAgainst[i - 1].style.display = "none";
    }
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



