
$(document).ready(function () {

    var engine = new Engine("PlayField");
    
	var mediapack = [
		new Image({path: "./pics/background.jpg", codename: "background"}),
		new Image({path: "./pics/chest.png", codename: "chest"}),
		new Image({path: "./pics/dog.png", codename: "dog"}),
		new Image({path: "./pics/dog_back.png", codename: "dog_back"}),
		new Image({path: "./pics/smallchild.png", codename: "smallchild"}),
		new Image({path: "./pics/tallchild.png", codename: "tallchild"}),
		new Image({path: "./pics/thief.png", codename: "thief"}),
                new Image({path: "./pics/disk.png", codename: "disk"})
	];
	
    engine.MediaManager.SetMediaPack(mediapack, callback.getCallbackObject(engine,engine));
        
});

function callback(engine){
	
    var dgui = new DoggyGUI();
    
    engine.AddObject(dgui);
    engine.AddOutsideElement("Console", "console");
    
    engine.Start();

}

function debugTest(){
    console.log("debugTest()");    
    
    var fir = function(){console.log("Choice one");}.getCallbackObject(this);
    var sec = function(){
		console.log("Choice two");
		
		var innercbo = function(name){
			console.log("sec-cbo - Prompt(name something)");
		}.getCallbackObject(this);
		
		new Prompt("Name of something", innercbo).Start();
			
		}.getCallbackObject(this);
    
    new MultipleChoice(["", "Choose one", ""], ["Choice 1", "Choice 2", "Cancel"] ,[fir, sec, false]).Start();

}

