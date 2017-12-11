
document.addEventListener("DOMContentLoaded", function(){
    var engine = new Anibody("PlayField");

    Anibody.import(Anibody.util.ImageFile, "ImgFile");
    Anibody.importAll(Anibody.static);
    Anibody.importAll(Anibody.ui);

    var mediapack = [
        new ImgFile({path: "./pics/background.jpg", codename: "background"}),
        new ImgFile({path: "./pics/chest.png", codename: "chest"}),
        new ImgFile({path: "./pics/dog.png", codename: "dog"}),
        new ImgFile({path: "./pics/dog_back.png", codename: "dog_back"}),
        new ImgFile({path: "./pics/child.png", codename: "child"}),
        new ImgFile({path: "./pics/teenager.png", codename: "teenager"}),
        new ImgFile({path: "./pics/thief.png", codename: "thief"}),
        new ImgFile({path: "./pics/disk.png", codename: "disk"})
    ];

    engine.MediaManager.SetMediaPack(mediapack, callback.getCallbackObject(engine, engine));

});

function callback(engine) {

    var dgui = new DoggyGUI();

    engine.AddObject(dgui);
    engine.AddOutsideElement("Console", "console");

    engine.Start();

    $("#ChangeButton").on("click",function (e) {

    });

}
