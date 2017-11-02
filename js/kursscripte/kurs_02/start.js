
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
    
    $("#PDF").click(saveAsPDF);
    
});

function callback(engine){
	
    var dgui = new DoggyGUI();
    
    engine.AddObject(dgui);
     
    engine.Start();
    dgui.FastForward();
	
}

var logArray = [];
function saveAsPDF(){
    if(typeof logArray === "undefined") return;
    
    var name = prompt("Name of the file");
    var doc = new jsPDF();
    
    var border = 15;
    
    var pagey = border;
    var a4height = 297;
    var pagemax = a4height - border;
    
    var fontSize_normal = 11;
    var fontSpace = 3;
    
    // setFontSize handles arguments as a number in points
    var ptcmcr = 0.5; // points to cm conversion rate
    
    // Title
    doc.setFontSize(fontSize_normal + 2);
    var now = new Date();
    now = now.toLocaleDateString() + " - " + now.toLocaleTimeString() + " Uhr";
	var title = "Game played on: " + now;
    doc.text(title, border, pagey);
    pagey += (fontSize_normal + 2 + fontSpace) * ptcmcr;
    
    // rest of the log
    for(var i=0; i<logArray.length; i++){
        
        doc.setFontSize(fontSize_normal);
        doc.text(logArray[i].txt, border, pagey);
        
        pagey += (fontSize_normal + fontSpace) * ptcmcr;
        
        if(pagey > pagemax){
            doc.addPage();
            pagey = border;
        }
        
    }
    
    doc.save(name + ".pdf");
}
