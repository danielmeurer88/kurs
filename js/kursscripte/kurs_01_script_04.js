
// Erinnerung!
// Alle Variablen und Funktionen/Bauanleitungen aus script_01 und 02 existieren noch, da script_01, 02 und 03
// in der 01_Einfuehrung.html zuerst geladen wurden

console.log("___ ANFANG des Scripts: kurs_01_script_04.js _____");

// 9. Vererbung
// Nutzen der Vererbung
// Bessere Abbildung der Realität und Reduzierung von Schreibaufwand ist möglich bei größeren Projekten

// Situation: Wir haben die folgenden Klassen: Fahrzeug, Landfahrzeug, Luftfahrzeug, Audi
// und noch viele andere Klassen, aber das reicht erstmal

// Wir erkennen folgende Hierarchie:

// die Oberklasse Fahrzeug
function Fahrzeug(){
	console.log("- 1. Fahrzeug-Bauanleitung (Konstruktorfunktion)");
	this.Type = "Fahrzeug";
	this.Marke = "unbekannt";
	this.Modell = "unbekannt";
	this.Id = "unbekannt";
	this.Aufenthaltsort = "unbekannt";
}

Fahrzeug.prototype.Fahren = function(wohin){this.Aufenthaltsort = wohin;};
Fahrzeug.prototype.SagAufenthaltsort = function(){
	console.log("Dieser " + this.Marke + " " + this.Modell + " befindet sich in " + this.Aufenthaltsort);
};

// Land- und Luftfahrzeug (hier nur Landf und Luftf genannt)
function Landf(){
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

function Luftf(){
	Fahrzeug.call(this);
	this.Type = "Luftfahrzeug";
}
Luftf.prototype = Object.create(Fahrzeug.prototype);
Luftf.prototype.constructor = Landf;

// Audi wird realisiert
function Audi(modell){
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
function testInstance(inst){
	if(inst instanceof Audi)
		console.log(inst.Id + " ist ein Audi");
	else
		console.log(inst.Id + " ist kein Audi");

	if(inst instanceof Landf)
		console.log(inst.Id + " ist ein Landfahrzeug");
	else
		console.log(inst.Id + " ist kein Landfahrzeug");

	if(inst instanceof Luftf)
		console.log(inst.Id + " ist ein Luftfahrzeug");
	else
		console.log(inst.Id + " ist kein Luftfahrzeug");
	
	if(inst instanceof Fahrzeug)
		console.log(inst.Id + " ist ein Fahrzeug");
	else
		console.log(inst.Id + " ist kein Fahrzeug");
}

testInstance(q5);

var fahrz = new Fahrzeug();
testInstance(fahrz);

function Abstrakt(){
	console.log("Abstrakt-Function-Constructor");
	if(this.constructor === Abstrakt)
		throw "Abstrakt ist eine abstrakte Klasse";
}

function Abgeleitet(){
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