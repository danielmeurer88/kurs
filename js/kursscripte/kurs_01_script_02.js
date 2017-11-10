
// Erinnerung!
// Alle Variablen aus script_01 existieren noch, da script_01
// in der 01_Einfuehrung.html zuerst geladen wurde

console.log("___ ANFANG des Scripts: kurs_01_script_02.js _____");

//#################################################################################
// 5. FUNKTIONEN (Part 2)

// 5.1 Parameter
// Funktion müssen nicht immer statisch sein. Beim Aufrufen einer Funktion kann
// ein Wert mitgegeben werden, der erst beim Aufrufen errechnet wird.

function setzeZahl(zahl){
    array[0] = zahl;
}

// 1. Aufruf 
setzeZahl(4); // die Zahl 4 wird dem ersten Element von 'array' zugewiesen

// 2. Aufruf 
setzeZahl(5, 8); // die Zahl 5 wird dem ersten Element von 'array' zugewiesen
// zweiter Parameter wird ignoriert

// VORSICHT: diese Aufrufe funktionieren auch, keine Fehlermeldung
// 3. Aufruf
setzeZahl(); 

// 4. Aufruf
setzeZahl("muss nicht eine Zahl sein");
// Sollte also in der Funktion behandelt werden 

// 5.2 Rückgabewerte
// Mit dem Signalwort 'return' kann ein Wert zurückgegeben werden, der dann an
// die Stelle tritt, an der die Funktion aufgerufen wird.

function f(x){
    return x*x; // das Quadrat von x;
}

array[0] = f(10); // array[0] erhällt den Wert 100

// Wir erinnern uns, dass einer Funktion auch mit Attributen erweitert werden konnte
function PolizeiHund(){
}
PolizeiHund.Name = "Rex";
PolizeiHund.Alter = 7;
PolizeiHund.Bellen = function(){ return PolizeiHund.Name + " bellt: Wuff Wuff"; };


// 5.3 Funktionen können als "Bauanleitung" für neue Objekte dienen

// Da wir eine Funktion nur als "Bauanleitung" verwenden, haben wir keinen
// Funktionsnamen, mit Hilfe dessen wir das Objekt erweitern könnten.
// JavaScript bietet dafür das Signalwort 'this' an.
// 'this' existiert nur in der Funktion bzw. "Bauanleitung"

// folgende "Bauanleitung" definieren wir
function Hund(name, alter, istPolizeiHund){
    this.Name = name;
    this.Alter = alter;
    this.IstPolzeiHund = istPolizeiHund;
    this.Rasse = "Schaeferhund";
}

// Wir verwenden diese Bauanleitung und erzeugen mit dem Signalwort 'new' ein
// neues Objekt

// Der Schäferhund Rex
var Rex = new Hund("Rex", 7, true);
// Der Chiwawa Schnuckel
var Schnuckel = new Hund("Schnuckel", 2, false);
// Der Schäferhund Ron
var Ron = new Hund("Ron", 5, true);

// Professionelle Anmerkung: diese "Bauanleitung" wird allgemein Klasse genannt
// (In JavaScript auch Konstruktorfunktionen)
// Objekte, die mit Hilfe einer Klasse entstehen, heißen Instanzen

console.log("___ ENDE des Scripts: kurs_01_script_02.js _____");