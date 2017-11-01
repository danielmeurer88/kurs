
$(document).ready(function () {

    var engine = new Engine("PlayField");
    
	var mediapack = [
		new Image({path: "./pics/background.jpg", codename: "background"}),
		new Image({path: "./pics/chest.png", codename: "chest"}),
		new Image({path: "./pics/dog.png", codename: "dog"}),
		new Image({path: "./pics/dog_back.png", codename: "dog_back"}),
		new Image({path: "./pics/smallchild.png", codename: "smallchild"}),
		new Image({path: "./pics/tallchild.png", codename: "tallchild"}),
		new Image({path: "./pics/thief.png", codename: "thief"})
	];
	
    engine.MediaManager.SetMediaPack(mediapack, callback.getCallbackObject(engine,engine));

});

function callback(engine){
	
    var dgui = new DoggyGUI();
    
    engine.AddObject(dgui);
     
    engine.Start();
	
}