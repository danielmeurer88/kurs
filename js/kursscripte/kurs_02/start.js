
$(document).ready(function () {

    var engine = new Anibody("PlayField");
    
	Anibody.import(Anibody.util.Picture);
	Anibody.importAll(Anibody.static);
	
	var mediapack = [
		new Picture({path: "./pics/background.jpg", codename: "background"}),
		new Picture({path: "./pics/chest.png", codename: "chest"}),
		new Picture({path: "./pics/dog.png", codename: "dog"}),
		new Picture({path: "./pics/dog_back.png", codename: "dog_back"}),
		new Picture({path: "./pics/child.png", codename: "child"}),
		new Picture({path: "./pics/teenager.png", codename: "teenager"}),
		new Picture({path: "./pics/thief.png", codename: "thief"}),
                new Picture({path: "./pics/disk.png", codename: "disk"})
	];
	
    engine.MediaManager.SetMediaPack(mediapack, callback.getCallbackObject(engine,engine));
        
});

function callback(engine){
	
    var dgui = new DoggyGUI();
    
    engine.AddObject(dgui);
    engine.AddOutsideElement("Console", "console");
    
    engine.Start();
    
    $("#ChangeButton").click(function(){
        
    });

}
