
// Bemerkung!
// Alle Variablen und Funktionen/Bauanleitungen aus script_01,02 und 03 werden
// im Folgenden als nicht existent betrachtet - dieses Script kann auch ohne
// 01,02,03 eingebunden werden

// Erneute Definition der Bauanleitung/ (Kontruktor-Funktion)
function Hund(name, alter, istPolizeiHund) {
    this.Name = name;
    this.Alter = alter;
    this.IstPolzeiHund = istPolizeiHund;
    this.Rasse = "Schaeferhund";
}
var Rex = new Hund("Rex", 7, true);
var Schnuckel = new Hund("Schnuckel", 2, false);
var Ron = new Hund("Ron", 5, true);

console.log("___ ANFANG des Scripts: kurs_01_script_04.js _____");

// 8. Funktionen (Part 3)

// Wir schreiben folgende Anweisung, da Schnuckel kein Schäferhund sein soll
Schnuckel.Rasse = "Chiwawa";

// Wir möchten jetzt die Farbe unserer Hunden speichern und das geht folgendermaßen
Rex.Farbe = "braun/schwarz";
Schnuckel.Farbe = "beige";
Ron.Farbe = "schwarz";

// Wir erhalten nun einen weiteren Hund, Die Schäferhündin Mandy...
var Mandy = new Hund("Mandy", 3, false);
// ... und fragen nun ihre Farbe ab;
console.log("(1.) " + Mandy.Name + "s Fellfarbe ist " + Mandy.Farbe);
// Ausgabe in der Konsole: (1.) Mandys Fellfarbe ist undefined

// dies ist keine schöne Ausgabe
// was wir wollen ist, wenn die Farbe eines Hundes nicht extra angegeben wurde, soll
// diese als "unbekannt" angegeben werden

// Jede "Bauanleitung" (Funktion) trägt eine Kopie der Bauanleitung mit sich
// Nennen wir sie: Urbauanleitung - Jedes mit "new" erzeugte Objekt kann auf diese
// Urbauanleitung zurückgreifen.

// Info:
// In JavaScript wird zuerst im Objekt selbst geschaut ob es dort das gewünschte Attribut gibt
// (vgl. Hat Mandy das Attribut "Farbe" definiert?)
// Wenn dies nicht existiert, dann schaut JS in der Urbauanleitung nach

// die Urbauanleitung (prototype) wird angesprochen wie ein Attribute
Hund.prototype.Farbe = "unbekannt";
// Für die Farbe jedes Hundes, der keine Farbe definiert hat, schaut JavaScript
// in der Urbauanleitung (prototype) nach, ob es da einen Wert für Farbe findet

console.log("(2.) " + Mandy.Name + "s Fellfarbe ist " + Mandy.Farbe);

Mandy.Farbe = "grau"; // wir definieren eine Farbe für Mandy

console.log("(3.) " + Mandy.Name + "s Fellfarbe ist " + Mandy.Farbe);

// Prototyping funktioniert auch mit Funktionen

Hund.prototype.Bellen = function () {
    if (this.Rasse !== "Chiwawa") {
        console.log(this.Name + " bellt: Wuff Wuff");
    } else {
        console.log(this.Name + " bellt: Klaeff Klaeff");
    }
};

Rex.Bellen();
Mandy.Bellen();
Schnuckel.Bellen();

// jeder Hund (bereits erstellt und auch in Zukunft) besitzt jetzt eine Funktion Bellen();

// 9. Vererbung und Nutzen
// Bessere Abbildung der Realität und Reduzierung von Schreibaufwand ist möglich
// bei größeren Projekten

// Situation: Wir haben die folgenden Klassen: Fahrzeug, Landfahrzeug, Luftfahrzeug, Audi
// ((und noch viele andere Klassen, aber das reicht für das Beispiel))

// Wir erkennen folgende Hierarchie:

// die Oberklasse Fahrzeug
function Fahrzeug() {
    console.log("- 1. Fahrzeug-Bauanleitung (Konstruktorfunktion)");
    this.Type = "Fahrzeug";
    this.Marke = "unbekannt";
    this.Modell = "unbekannt";
    this.Id = "unbekannt";
    this.Aufenthaltsort = "unbekannt";
}

Fahrzeug.prototype.Fahren = function (wohin) {
    this.Aufenthaltsort = wohin;
};
Fahrzeug.prototype.SagAufenthaltsort = function () {
    console.log("Dieser " + this.Marke + " " + this.Modell + " befindet sich in " + this.Aufenthaltsort);
};

// Land- und Luftfahrzeug (hier nur Landf und Luftf genannt)
function Landf() {
    // 1.
    Fahrzeug.call(this);
    console.log("- 2. Landf-Bauanleitung (Konstruktorfunktion)");
    // eigener Code
    // überschreiben des Types
    this.Type = "Landfahrzeug";
}
// 2.
Landf.prototype = Object.create(Fahrzeug.prototype);
// 3.
Landf.prototype.constructor = Landf;

// zu 1: In der Bauanleitung von Landf wird die Anleitung von Fahrzeug (mit diesem Objekt) aufgerufen
// -> dieses Objekt hat nun die Attribute von Fahrzeug (also Type, Marke, Modell und Aufenthaltsort, Fahren(), SagAufenthaltsort() )
// zu 2: Die Urbauanleitung wird kopiert -> Landf bekommt eine neue Urbauanleitung, die genau so
// aussieht wie die von Fahrzeug (das bedeutet, das die neue Urbauanleitung auf die Bauanleitung
// von Fahrzeug zeigt und nicht auf Landf)
// zu 3: neue Urbauanleitung von Landf zeigt auf die Bauanleitung Landf

function Luftf() {
    Fahrzeug.call(this);
    this.Type = "Luftfahrzeug";
}
Luftf.prototype = Object.create(Fahrzeug.prototype);
Luftf.prototype.constructor = Landf;

// Audi wird realisiert
function Audi(modell) {
    Landf.call(this);
    console.log("- 3. Audi-Bauanleitung (Konstruktorfunktion)");
    this.Type = "Auto";
    this.Marke = "Audi";
    this.Modell = modell;
    this.Id = this.Marke + " " + this.Modell;
}
Audi.prototype = Object.create(Landf.prototype);
Audi.prototype.constructor = Audi;


// instanzieren wir ein Audi Q5
var q5 = new Audi("Q5");
q5.Fahren("Stuttgart");
q5.SagAufenthaltsort();

// wir schreiben eine kleine Test-Funktion
function testInstance(inst) {
    if (inst instanceof Audi)
        console.log(inst.Id + " ist ein Audi");
    else
        console.log(inst.Id + " ist kein Audi");

    if (inst instanceof Landf)
        console.log(inst.Id + " ist ein Landfahrzeug");
    else
        console.log(inst.Id + " ist kein Landfahrzeug");

    if (inst instanceof Luftf)
        console.log(inst.Id + " ist ein Luftfahrzeug");
    else
        console.log(inst.Id + " ist kein Luftfahrzeug");

    if (inst instanceof Fahrzeug)
        console.log(inst.Id + " ist ein Fahrzeug");
    else
        console.log(inst.Id + " ist kein Fahrzeug");
}

testInstance(q5);

var fahrz = new Fahrzeug();
testInstance(fahrz);

// FRAGE: Ist es sinnvoll, dass man eine Instanz von Fahrzeug erstellen kann?
// Ein Ding, das irgendwie gefahren werden kann und von irgendeiner Marke ist

// Manchmal möchte man Klassen, von denen nur geerbt werden soll
// Man nennt diese Abstrakte Klassen

function Abstrakt() {
    console.log("Abstrakt-Function-Constructor");
    if (this.constructor === Abstrakt)
        throw "Abstrakt ist eine abstrakte Klasse";
}

function Abgeleitet() {
    Abstrakt.call(this);
    console.log("Abgeleitet-Function-Constructor");
}
Abgeleitet.prototype = Object.create(Abstrakt.prototype);
Abgeleitet.prototype.constructor = Abgeleitet;


// wie kann man verhindern, dass von der Oberklasse (Elternklasse) nicht
// instanziert werden kann?

console.log("-- abl");
var abl = new Abgeleitet();
console.log("-- abs");
var abs = new Abstrakt();

console.log("___ ENDE des Scripts: kurs_01_script_04.js _____");