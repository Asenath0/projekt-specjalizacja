
// Zmienne, które przechowuj¹ stan zatwierdzenia przez u¿ytkownika:
//readyT - zatwierdzenia tematu
//readyF - zatwierdzenia sk³adu grupy ZA
//readyA - zatwierdzenia sk³adu grupy PRZECIW
var readyT = 0;
var readyF = 0;
var readyA = 0;


//tablica przechowuj¹ca odnoœniki do kolejnych inputów z grupy ZA
const groupFor = [
    document.getElementById("for1"),
    document.getElementById("for2"),
    document.getElementById("for3"),
    document.getElementById("for4"),
    document.getElementById("for5"),
    document.getElementById("for6")
];


//tablica przechowuj¹ca odnoœniki do kolejnych inputów z grupy PRZECIW
const groupAgainst = [
    document.getElementById("against1"),
    document.getElementById("against2"),
    document.getElementById("against3"),
    document.getElementById("against4"),
    document.getElementById("against5"),
    document.getElementById("against6")
];


//tablice zapisuj¹ce odnoœniki do ibnputów kolejnych oso w poszczególnych grupach
const orderF = [];
const orderA = [];

//tablica, do której wpisywane bêd¹ odnoœniki do inputów z obu grup w kolejnoœci, w jakiej powinni mówiæ
const order = [];
var length = 0;

//zmienna zapisuj¹ca pozycjê w tablicy order
var iOrder = 0;

//Funkcja aktywowana przez przycisk z napisem "ZatwierdŸ cz³onków grupy" pod grup¹ ZA
//Wy³¹cza widocznoœæ przycisku
//Dezaktywuje mo¿liwoœæ pisania w polach, które zosta³y wype³nione
//Wy³¹cza widocznoœæ pól, które nie zosta³y wype³nione
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


//Funkcja aktywowana przez przycisk z napisem "ZatwierdŸ cz³onków grupy" pod grup¹ PRZECIW
//Wy³¹cza widocznoœæ przycisku
//Dezaktywuje mo¿liwoœæ pisania w polach, które zosta³y wype³nione
//Wy³¹cza widocznoœæ pól, które nie zosta³y wype³nione
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


//Funkcja aktywowana przez przycisk z napisem "ZatwierdŸ temat debaty"
//Wy³¹cza widocznoœæ przycisku
//dezaktywuje mo¿liwoœæ zmiany tytu³u
function disableT() {
    document.getElementById("disableT").style.display = "none";
    document.getElementById("Topic").disabled = "true";
    readyT = 1;
}


//zmienne przechowuj¹ce iloœæ milisekund, sekund i minut potrzebnych do obliczeñ w stoperze
var ms = 0;
var seconds = 0;
var minutes = 0;

//zmienna przechowuj¹ca iloœæ minut, od której zaczyna siê odliczanie
var initialMinutes = 5;
seconds = initialMinutes;

//zmienne pomoznicze, które u¿ywane s¹, kiedy w stoperze iloœæ np. minut jest mniejsza od 10 i nale¿y przed cyfr¹ jeszcze wypisaæ 0
var displayMs = 0;
var displaySeconds = 0;
var displayMinutes = 0;

//zmienna kontroluj¹ca interwa³ wywo³uj¹cy funkcjê stopera
var interval = null;

//zmienna przechowuj¹ca status stopera, przyjmuje wartoœci:
//stopped
//running
//next
var status = "start";

//funkcja kontroluj¹ca dzia³anie przycisku pod zegarkiem
//kontroluje czy wszystkie dane zosta³y wype³nione, i prosi o je uzupe³nienie jeœli nie zosta³y
//zatrzymuje zegar
//kontynuuje dzia³anie zegara
//styluje mówi¹ce osoby
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


//funkcja stopera, zatrzymuje siê sama, kiedy zegar dojdzie do 0
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


