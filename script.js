
// Zmienne, kt�re przechowuj� stan zatwierdzenia przez u�ytkownika:
//readyT - zatwierdzenia tematu
//readyF - zatwierdzenia sk�adu grupy ZA
//readyA - zatwierdzenia sk�adu grupy PRZECIW
var readyT = 0;
var readyF = 0;
var readyA = 0;


//tablica przechowuj�ca odno�niki do kolejnych input�w z grupy ZA
const groupFor = [
    document.getElementById("for1"),
    document.getElementById("for2"),
    document.getElementById("for3"),
    document.getElementById("for4"),
    document.getElementById("for5"),
    document.getElementById("for6")
];


//tablica przechowuj�ca odno�niki do kolejnych input�w z grupy PRZECIW
const groupAgainst = [
    document.getElementById("against1"),
    document.getElementById("against2"),
    document.getElementById("against3"),
    document.getElementById("against4"),
    document.getElementById("against5"),
    document.getElementById("against6")
];


//tablice zapisuj�ce odno�niki do ibnput�w kolejnych oso w poszczeg�lnych grupach
const orderF = [];
const orderA = [];

//tablica, do kt�rej wpisywane b�d� odno�niki do input�w z obu grup w kolejno�ci, w jakiej powinni m�wi�
const order = [];
var length = 0;

//zmienna zapisuj�ca pozycj� w tablicy order
var iOrder = 0;

//Funkcja aktywowana przez przycisk z napisem "Zatwierd� cz�onk�w grupy" pod grup� ZA
//Wy��cza widoczno�� przycisku
//Dezaktywuje mo�liwo�� pisania w polach, kt�re zosta�y wype�nione
//Wy��cza widoczno�� p�l, kt�re nie zosta�y wype�nione
function disableF() {
    document.getElementById("disableF").style.display = "none";
    document.getElementById("textF").style.display = "none";
    readyF = 1;
    iOrder = 0;
    for (var i in groupFor) {
        if (groupFor[i].value == "") {
            groupFor[i].style.display = "none";
        }
        else {
            groupFor[i].disabled = "true";
            orderF[iOrder] = groupFor[i];
            iOrder += 1;
        }
    }  
}


//Funkcja aktywowana przez przycisk z napisem "Zatwierd� cz�onk�w grupy" pod grup� PRZECIW
//Wy��cza widoczno�� przycisku
//Dezaktywuje mo�liwo�� pisania w polach, kt�re zosta�y wype�nione
//Wy��cza widoczno�� p�l, kt�re nie zosta�y wype�nione
function disableA() {
    document.getElementById("disableA").style.display = "none";
    document.getElementById("textA").style.display = "none";
    readyA = 1;
    iOrder = 0;
    for (var i in groupAgainst) {
        if (groupAgainst[i].value == "") {
            groupAgainst[i].style.display = "none";
        }
        else {
            groupAgainst[i].disabled = "true";
            orderA[iOrder] = groupAgainst[i];
            iOrder += 1;
        }
    }
}


//Funkcja aktywowana przez przycisk z napisem "Zatwierd� temat debaty"
//Wy��cza widoczno�� przycisku
//dezaktywuje mo�liwo�� zmiany tytu�u
function disableT() {
    document.getElementById("disableT").style.display = "none";
    document.getElementById("Topic").disabled = "true";
    readyT = 1;
}


//zmienne przechowuj�ce ilo�� milisekund, sekund i minut potrzebnych do oblicze� w stoperze
var ms = 0;
var seconds = 0;
var minutes = 0;

//zmienna przechowuj�ca ilo�� minut, od kt�rej zaczyna si� odliczanie
var initialMinutes = 5;
seconds = initialMinutes;

//zmienne pomoznicze, kt�re u�ywane s�, kiedy w stoperze ilo�� np. minut jest mniejsza od 10 i nale�y przed cyfr� jeszcze wypisa� 0
var displayMs = 0;
var displaySeconds = 0;
var displayMinutes = 0;

//zmienna kontroluj�ca interwa� wywo�uj�cy funkcj� stopera
var interval = null;

//zmienna przechowuj�ca status stopera, przyjmuje warto�ci:
//stopped
//running
//next
var status = "start";

//funkcja kontroluj�ca dzia�anie przycisku pod zegarkiem
//kontroluje czy wszystkie dane zosta�y wype�nione, i prosi o je uzupe�nienie je�li nie zosta�y
//zatrzymuje zegar
//kontynuuje dzia�anie zegara
//styluje m�wi�ce osoby
function stopWatchButton() {
    if (readyF == 0 || readyA == 0 || readyT == 0) {
        alert("Prosze wypelnic pola i zatwierdzic je poszczegolnymi przyciskami aby kontynuowac")
    }
    else {
        switch (status) {
            case "start":
                iOrder = 0;

                if (orderF.length > orderA.length) {
                    var j = 0;
                    length = orderF.length;
                    for (var i = orderA.length; i < orderF.length; i++) {
                        var a = orderA[j];
                        orderA.push(a);
                        j += 1;
                    }
                }
                else if (orderA.length > orderF.length) {
                    var j = 0;
                    length = orderA.length;
                    for (var i = orderF.length; i < orderA.length; i++) {
                        var a = orderF[j];
                        orderF.push(a);
                        j += 1;
                    }
                }
                else length = orderF.length;

                for (var i = 0; i < length; i++) {
                    order.push(orderF[i]);
                    order.push(orderA[i]);
                }

                interval = window.setInterval(stopWatch, 10);
                status = "running";
                document.getElementById("stopWatchButton").innerHTML = "Pytanie";
                order[iOrder].style.height = "40px";
                iOrder += 1;
                break;

            case "stopped":
                interval = window.setInterval(stopWatch, 10);
                status = "running";
                document.getElementById("stopWatchButton").innerHTML = "Pytanie";
                break;

            case "running":
                window.clearInterval(interval);
                status = "stopped";
                document.getElementById("stopWatchButton").innerHTML = "Kontynuuj";
                break;
        }
        
    }
}


//funkcja stopera, zatrzymuje si� sama, kiedy zegar dojdzie do 0
function stopWatch() {
    
    ms--;
    if (ms < 0) {
        ms = 99;
        seconds--;
        if (seconds < 0) {
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
        document.getElementById("display").innerHTML = "00:00:00";
        document.getElementById("stopWatchButton").innerHTML = "Nastepna osoba";
        order[iOrder - 1].style.height = "auto";
        order[iOrder].style.height = "40px";
        iOrder += 1;
        ms = 0;
        seconds = 0;
        minutes = 0;
        seconds = initialMinutes;
        
    }
}


