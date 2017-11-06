
var number;

number = 1;
var string = "das ist ein text";
var bool = true;

var bluemchen = { 
    name : "Tine", 
    alter : 22
};

var bf = {};
bf.name = "Daniel";
bf.alter = 29;

var mumi = {
    name : "Andrea",
    alter : 51
};

var sis = {};
sis.name = "Susanne";
sis.alter = 20;

//console.log(bluemchen.name + " ist " + bluemchen.alter + " Jahre alt");
//console.log(bf.name + " ist " + bf.alter + " Jahre alt");
//console.log(mumi.name + " ist " + mumi.alter + " Jahre alt");
//console.log(sis.name + " ist " + sis.alter + " Jahre alt");

function SagAlter(obj){
    console.log(obj.name + " ist " + obj.alter + " Jahre alt");
}

SagAlter.test = "Das ist ein Test";

SagAlter(bluemchen);
SagAlter(bf);
SagAlter(mumi);
SagAlter(sis);
