
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
        Background : {complete:false},
        Chest : {complete:false}
        
    };
    
    this.Round = 0;
    
    this.Dog = {};
    
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
    this.Pics.Chest = this.Engine.MediaManager.GetImage("chest");

    this.Engine.SetSelectedObject(this);
    this.Dog = new Dog(this);

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
    
    if(this.Pics.Chest.complete)
        c.drawImage(this.Pics.Chest, 218, 260, this.Pics.Chest.width*0.8, this.Pics.Chest.height*0.8);
    
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
    
    this.Dog.DoSingleRound();
};