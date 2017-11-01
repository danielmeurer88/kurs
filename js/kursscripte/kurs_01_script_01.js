
console.log("___ ANFANG des Scripts: kurs_01_script_01.js _____");

// 1. Kommentare und Anweisungen

// Kommentare im Programmcode werden von der Ausführung ignoriert
// es gibt zwei Arten wie Kommentare gekennzeichnet werden:

// 1. die doppelten Schrägstrichen (en. "slash") kommentiert eine Zeile aus – und zwar genau die, die dahintersteht
/* 2. Schrägstrich + Sternchen zum Beginn des Kommentars und Sternchen + Schrägstrich zum Ende */

// Programmcode wird von oben nach unten zeilenweise abgearbeitet
// Alle Anweisungen in JavaScript enden mit einem Semicolon ;

// 2. VARIABLEN

// Um Werte zu speichern werden Variablen verwendet.
// 2.1 In JavaScript wird eine Variable mit dem Signalwort 'var' + einen Namen deklariert.

var abc; // Die Variable 'abc' wurde deklariert, hat aber noch keinen Wert

// 2.2. wir können einer Variable mit EINEM Gleichheitszeichen einen Wert zuweisen

abc = 1;
// links vom Gleichheitszeichen: die variable, der zugewiesen wird
// rechts: der Wert, der zugewiesen wird

// 3. DATENTYPEN

// JavaScript kennt 2 Arten von Datentypen. - Primitive Datentypen und Objekte

// 3.1 Die 3 wichtigsten Primitive Datentypen:

var number = 42; // sind alle Zahlen

var string = "Zeichenkette"; // sind Texte
var string2 = string + "n werden mit einem + verbunden";

// boolean = dt. Zustandsvariablen: true oder false
var wahr = true;
var falsch = false;

// 3.2 Alles andere was kein Primitiver Datentyp ist, sind Objekte

// Objekt 1:
{ zufaelligerText : "Das ist ein Objektwert - man achte auf die geschweifte Klammern und der Doppelpunkt"};

// Objekt 2:
{ 
	objektText : "nur dumm, dass der Objektwert nicht in einer Variable gespeichert wird..."
};

// Definition einer Variable 'object' mit der Zuweisung eines Objektes
var object = {
	text1 : "ein Objekt enthaelt eine oder mehrere Attribute (vergleichbar mit Variablen)",
	text2 : "Attribute bestehen aus einen Namen und einer direkten Wertzuweisung mit einem Doppelpunkt",
	text3 : "mehrere Attribute werden mit einem Komma getrennt",
	zahl1 : 12.34,
	bool : true
};

object.text4 = "In Javascript koennen Objekte ganz einfach erweitert werden";

// ARRAYS (dt. Felder) sind spezielle Objekte

var array = [
	12,
	"text",
	true
];

// Ein Array ist nichts anderes als ein Objekt, aber statt Attributnamen haben sie eine Zahl; angefangen bei 0

array[0]; // ist die Zahl 12
array[1]; // ist der String "text"
array[2]; // ist der Boolische Wert true

array[3] = "Arrays koennen wie Objekte ganz einfach erweitert werden";

// 4. FUNKTIONEN (Part 1)
// jede Programmiersprache besitzt Funktionen. In Javascript werden sie so definiert:

//Signalwort 'function' + name + () + {}

function funktion(){
	// geschweifte Klammern umranden den Funktionskörper
	
	//das 5. Element des Arrays 'array' bekommt den Wert, der im Attribut 'zahl1' des Objekts 'object' gespeichert ist, zugewiesen 
	array[4] = object.zahl1;
}

// Funktionen sind eine Anreihung von Anweisungen, die erst ausgeführt werden, wenn die Funktion aufgerufen wird.

// erter Funktionsaufruf
funktion(); // das Array 'array' wird jetzt erweitert;

// zweiter Funktionsaufruf
funktion(); //das 5. Element des Arrays 'array' wird mit dem Wert, der im Attribut 'zahl1' des Objekts 'object' gespeichert ist, überschrieben

// INFO: Auch Funktionen sind nichts anderes als spezielle Objekte

var variable = function(){
	//Anweisung 1 - Erweiterung von 'object'
	object.bool2 = false;
	//Anweisung 2 - Erweiterung von 'array' - 101. Element erhält den Wert "crazy"
	array[8] = "crazy";
};

variable();
variable.text1 = "Ja, auch Funktionen koennen Attribute bekommen";
variable.text2 = "Dazu spaeter noch mehr";

console.log("___ ENDE des Scripts: kurs_01_script_01.js _____");