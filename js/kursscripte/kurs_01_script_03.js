
// Erinnerung!
// Alle Variablen und Funktionen/Bauanleitungen aus script_01 und 02 existieren noch, da script_01 und 02
// in der 01_Einfuehrung.html zuerst geladen wurden

console.log("___ ANFANG des Scripts: kurs_01_script_03.js _____");

// 6. Wichtige JavaScript Funktionen
// JavaScript besitzt einige Funktionen, die das Programmieren erleichtern

// 6.1 - Die Ausgabe eines Textes/Werts
// Die Funktion alert() lässt ein Popup im Browser erscheinen, die einen Text ausgibt
alert( PolizeiHund.Bellen() );

// alert() stoppt das Script bis der Nutzer OK klickt - subtiler ist console.log();
console.log( "Dieser Text erscheint nur in der Konsole :: " + PolizeiHund.Bellen());

// 6.2 - Abfrage Ja/Nein mit confirm();
var verstanden = confirm("Bewerte folgende Aussage: Du hast Alles verstanden.");
console.log("Benutzer bewertet die Aussage, ob er oder sie Alles verstanden habe, mit " + verstanden);

// 6.3 - Eingabe des Benutzers abfangen mit prompt();
var frage = "12 + 6";
var ergebnis = prompt(frage + " = ");
alert(frage + " = " + ergebnis);

// "Ausrechnen" eines Textes mit eval();
alert("eval(" + frage + ")" + " = " + eval(frage));

//Professioneller Tipp: eval() ist für öffentliche Seiten nicht mehr verwendet: Zu gefährlich

// 7. Kontrollstrukturen
// jede Programmiersprache besitzt Möglichkeiten, ein Script oder Programm zu lenken

// 7.1 - if-Abfrage
// anhand eines Wertes werden bestimmte Anweisungen ausgeführt oder nicht
if(verstanden){
    console.log("SUPER!! Ich bin stolz auf dich");
}else{
    console.log("Das schaffst du!! Da bin ich mir sicher");
}

// 7.1.2 Bedingungen (branches)
// sind Aussagen, die entweder wahr (true) oder falsch (false) sind
//  Bedingungen werden häufig in der if-Abfrage verwendet

// es gibt folgende Operatoren, mit denen zwei Werte verglichen werden können:
// größer als : >
// größer gleich als : >=
// gleich bzw strikt gleich : == , ===
// ungleich bzw strikt ungleich : != , !==
// kleiner als : <
// kleiner gleich als : <=
var a = 5;
var branch = a < 7;
console.log(branch);

// folgende Konnektoren, mit denen zwei Bedingungen verknüpft werden können, existieren:
// && = und , || = oder
if(a > 3 && a < 8){
	console.log("a liegt zw. 3 und 8");
}

// es existiert auch not für boolsche Werte
var found = false;
var round = 8;
if(!found && round > 10)
	console.log("Not found yet but it is not too late.");

// 7.2 - Schleifen
// Wiederholt eine Reihe von Anweisungen

// 7.2.1 - for-Schleife (eine vorher bestimmte Anzahl wie oft)

console.log("### BEGIN for-Schleife");
// normale for-schleife
for(var i=0; i<array.length; i=i+1){
    console.log("array[" + i +  "] = " + array[i]);
}

// oder
// auch bekannt als for each - Schleife
for(var attr in object){
    console.log("object[" + attr +  "] = " + object[attr]);
}

console.log("### END for-Schleife");

// 7.2.2 - while-Schleife

console.log("### BEGIN do-while-Schleife");
var continueAsking = true;
while(continueAsking){
    if(continueAsking){
        continueAsking = confirm("Soll noch einmal diese Frage gefragt werden?");
    }
}
    
console.log("### END do-while-Schleife");


// ENDE Anfängerteil:


// 8. Funktionen (Part 3)

// Jedes Objekt, das mittels "Bauanleitung" erzeugt wurde, trägt eine Kopie der Anleitung
// mit sich

// Wir schreiben folgende Anweisung
Schnuckel.Rasse = "Chiwawa";

// Dies ändert nur das Attribut 'Rasse' dieses einen Objektes (die von Schnuckel)

// Wir möchten jetzt die Farbe unserer Hunden speichern und das geht folgendermaßen
Rex.Farbe = "braun/schwarz";
Schnuckel.Farbe = "beige";
Ron.Farbe = "schwarz";

// Wir erhalten nun einen weiteren Hund, Die Schäferhündin Mandy
var Mandy = new Hund("Mandy", 3, false);
// und fragen nun ihre Farbe ab;
console.log(Mandy.Name + "s Fellfarbe ist " + Mandy.Farbe);

// Ausgabe: Mandys Fellfarbe ist undefined
// dies ist keine schöne Ausgabe
// was wir wollen ist, wenn die Farbe eines Hundes nicht extra angegeben wurde, soll
// diese als "unbekannt" angegeben werden

// In JavaScript wird zuerst im Objekt geschaut ob es dort das gewünschte Attribut gibt
// (hier Farbe), wenn dies nicht existiert, dann schaut JS auf die "Ur"-Bauanleitung
// Alle Instanzen teilen diese Ur-Bauanleitung. Sie heißt "prototype"

Hund.prototype.Farbe = "unbekannt";

console.log("Nochmal: " + Mandy.Name + "s Fellfarbe ist " + Mandy.Farbe);

// Bonus: Wir schreiben Bellen-Funktion der Klasse Hund

Hund.prototype.Bellen = function(){
    if(this.Rasse === "Schaeferhund"){
        console.log(this.Name + " bellt: Wuff Wuff");
    }else{
        console.log(this.Name + " bellt: Klaeff Klaeff");
    }
};

Rex.Bellen();
Mandy.Bellen();
Schnuckel.Bellen();

console.log("___ ENDE des Scripts: kurs_01_script_03.js _____");