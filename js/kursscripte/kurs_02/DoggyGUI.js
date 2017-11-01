
function DoggyGUI() {

    ABO.call(this);
    
    this.Width = this.Engine.Canvas.width;
    this.Height = this.Engine.Canvas.height;
    
    this._running = false;
    this._ts_lastround = 0;
    this.DOR = 1600; // duration of a round
    
    this.Button = {
        Start : {},
        Pause : {},
        Step : {}
    };
    
    this.Pics = {
        Background : {complete:false}
    };
    
    this.Round = 0;
    
    this.Dog = {};
    this.Chest = {};
    this.Person = {};
    this._nextActionCreation = 0;
    
this.Initialize();
}

DoggyGUI.prototype = Object.create(ABO.prototype);
DoggyGUI.prototype.constructor = DoggyGUI;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
DoggyGUI.prototype.Initialize = function () {

    this.Pics.Background = this.Engine.MediaManager.GetImage("background");
    
    this.Engine.SetSelectedObject(this);
    this.Dog = new Dog();
    this.Chest = new Chest();
    this.Person = Person.GetNobody();
    
    this._nextActionCreation = Random.GetNumber(4, 7);
    
    this.Button.Start = new Button({
        X:10, Y: this.Height - 50, Width:180, Height:40,
        Label : "Start",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function (engine) {
                this._running = true;
            }.getCallbackObject(this, this.Engine),
        HoverText : "Starts automatic rounds"
    });
    this.Button.Start.AddButtonEffect();
    this.Button.Start.SetActiveFunctionObject(
            //Start-Button will be active when game is stopped
            function(){return !this._running;}.getCallbackObject(this)
    );
    
    this.Button.Pause = new Button({
        X:200, Y: this.Height - 50, Width:150, Height:40,
        Label : "Pause",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function (engine) {
                this._running = false;
            }.getCallbackObject(this, this.Engine),
        HoverText : "Pauses automatic rounds"
    });
    this.Button.Pause.AddButtonEffect();
    this.Button.Pause.SetActiveFunctionObject(
            //Pause-Button will be active when game is running
            function(){return this._running;}.getCallbackObject(this)
    );
    
    this.Button.Step = new Button({
        X:360, Y: this.Height - 50, Width:150, Height:40,
        Label : "Step",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function (engine) {
                this._doSingleRound();
            }.getCallbackObject(this, this.Engine),
        HoverText : "next round".decodeURI()
    });
    this.Button.Step.AddButtonEffect();
    this.Button.Step.SetActiveFunctionObject(
            //Step-Button will be active when game is running
            function(){return !this._running;}.getCallbackObject(this)
    );
    
};
/**
 * Update
 * @returns {undefined}
 */
DoggyGUI.prototype.Update = function () {
    this.Button.Start.Update();
    this.Button.Pause.Update();
    this.Button.Step.Update();
    
    this.Chest.Update();
    this.Person.Update();
    
    if(this._running){
        if(this._ts_lastround + this.DOR <= Date.now()){
            this._doSingleRound();
        }
    }
    
};

/**
 * ProcessInput
 * @returns {undefined}
 */
DoggyGUI.prototype.ProcessInput = function () {
    this.Button.Start.ProcessInput();
    this.Button.Pause.ProcessInput();
    this.Button.Step.ProcessInput();
    
    this.Chest.ProcessInput();
    this.Person.ProcessInput();
};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
DoggyGUI.prototype.Draw = function (c) {
    c.save();
    
    // background and chest
    if(this.Pics.Background.complete)
        c.drawImage(this.Pics.Background, 0, 0, this.Pics.Background.width*0.8, this.Pics.Background.height*0.8);
    
    this.Chest.Draw(c);
    this.Person.Draw(c);
    
    // drawing dog
    this.Dog.Draw(c);
    
    // getting stati of the dog
    var en = this.Dog.GetEnergy();
    var hu = this.Dog.GetHunger();
    var th = this.Dog.GetThirst();
    
    // draw background box for the stati
    var x = 0;
    var y = this.Button.Start.Y - 100;
    c.fillStyle = "black";
    c.fillRect(x,y,this.Width, this.Height);
    
    c.textBaseline = "top";
    // Energy
    x = 20;
    y += 5;
    var space = 120;
    
    c.fillStyle = "#ffffff";
    c.textAlign = "left";
    c.fillText("Energy:", x, y);
    c.textAlign = "right";
    c.fillText(en, x + space, y);
    // Hunger
    c.textAlign = "left";
    c.fillText("Hunger: ", x, y + 20);
    c.textAlign = "right";
    c.fillText(hu, x + space, y + 20);
    // Hunger
    c.textAlign = "left";
    c.fillText("Thirst: ", x, y + 40);
    c.textAlign = "right";
    c.fillText(th, x + space, y + 40);
    
    // printing number of rounds
    c.textAlign = "left";
    var x = this.Button.Step.X + this.Button.Step.Width;
    c.fillStyle = "#ffffff";
    c.fillText("Round: ", x+10, this.Height - 30);
    x += c.measureText("Round: ").width;
    c.fillText(this.Round, x + 30, this.Height - 30);
    
    c.restore();

    this.Button.Start.Draw(c);
    this.Button.Pause.Draw(c);
    this.Button.Step.Draw(c);
};

DoggyGUI.prototype._log = function (txt) {
    console.log(txt);
};

DoggyGUI.prototype._doSingleRound = function () {
    this._log("+++ Runde: " + (this.Round+1));    
    this._ts_lastround = Date.now();
    this.Round++;
    
    this.Dog.DoSingleRound(); // dog needs to be first in order to be able to prevent stealing
    this.Person.DoSingleRound();
    this.PersonCreation();
};

DoggyGUI.prototype._getPerson = function () {
    
    var p = this.Person;
    if(p.Position >= 1) return p;
    
    return Person.GetNobody();
};

DoggyGUI.prototype.Lose = function () {
    var txt = "----> Du hast bis Runde " + this.Round + " durgehalten.";
    this._log(txt);    
    
    this._running = false;
    
    var cbo = function(){
        var txt = "Reset-Feature not yet implemented. Please reload";
        console.log("OOOOOO - " + txt);
        new Alert(txt).Start();
        
    }.getCallbackObject(this);
    
    new Confirm([txt, "", "M{oe}chtest du noch einmal?".decodeURI()], cbo).Start();
};

DoggyGUI.prototype.PersonCreation = function () {
    // check if the current round is ready for an Action (for a new person to appear)
    if(this.Round < this._nextActionCreation) return false;
    
    //if there is a person than end function
    if(this.Person.Position > 0) return false;
    
    var labels = ["Nothing", "SmallChild", "TallChild", "Thief"];
    var chances = [40, 25, 20, 15];
    var lot = Random.DrawLot(labels, chances);
    
    this._log("--- "+ lot + " was created");
    
    if(lot === "SmallChild"){
        //this.Person = new SmallChild();
        /*testing*/this.Person = new Person();
    }
    
    if(lot === "TallChild"){
        //this.Person = new TallChild();
        /*testing*/this.Person = new Person();
    }
    
    if(lot === "Thief"){
        //this.Person = new Thief();
        /*testing*/this.Person = new Person();
    }
        
//    if(lot !== "Nothing")
//        this._nextActionCreation = this.Round + Random.GetNumber(4, 7);
    
};