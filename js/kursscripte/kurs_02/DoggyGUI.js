
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
    this._nextCreation = 0;
    this._gameOver = false;
        
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
    
    this._nextCreation = Random.GetNumber(2, 6);
    
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
    y += 15;
    var space = 120;
    var barspace = 20;
    
    c.fillStyle = "#ffffff";
    c.textAlign = "left";
    c.fillText("Energy:", x, y);
    c.textAlign = "right";
    c.fillText(en, x + space, y);
    
    // Energy bar
    c.fillStyle = "#999";
    c.fillRect(x + space + barspace, y , 200, 16);
    c.fillStyle = "#00ff00";
    c.fillRect(x + space + barspace, y+1 , en*2, 14);
        
    // Hunger
    y += 20;
    c.fillStyle = "#ffffff";
    c.textAlign = "left";
    c.fillText("Hunger: ", x, y);
    c.textAlign = "right";
    c.fillText(hu, x + space, y);
    
    // Hunger bar
    c.fillStyle = "#999";
    c.fillRect(x + space + barspace, y , 200, 16);
    c.fillStyle = "#00ff00";
    c.fillRect(x + space + barspace, y+1 , hu*2, 14);
    
    // Thirst
    y += 20;
    c.fillStyle = "#ffffff";
    c.textAlign = "left";
    c.fillText("Thirst: ", x, y);
    c.textAlign = "right";
    c.fillText(th, x + space, y);
    
    // thirst bar
    c.fillStyle = "#999";
    c.fillRect(x + space + barspace, y , 200, 16);
    c.fillStyle = "#00ff00";
    c.fillRect(x + space + barspace, y+1 , th*2, 14);
    
    // printing Gold
    x = this.Width / 2 + 200;
    y -= 20;
    c.setFontHeight(26);
    c.fillStyle = "#ffffff";
    c.textAlign = "left";
    c.fillText("Gold: ", x, y);
    c.textAlign = "right";
    c.fillText(this.Chest._gold, x + space + 10, y);
    
    // printing number of rounds
    c.setFontHeight(20);
    c.textAlign = "left";
    var x = this.Button.Step.X + this.Button.Step.Width;
    c.fillStyle = "#ffffff";
    c.fillText("Round: ", x+10, this.Height - 40);
    x += c.measureText("Round: ").width;
    c.fillText(this.Round, x + 30, this.Height - 40);
        
    c.restore();

    this.Button.Start.Draw(c);
    this.Button.Pause.Draw(c);
    this.Button.Step.Draw(c);
};

DoggyGUI.prototype._log = function (txt, header) {
    header = 3; // size of text: 3 = normal, 2 = slightly bigger, 1 = big, 0 = Start, End    
    console.log(txt);
    
    if(typeof logArray === "undefined") return;
    logArray.push({txt:txt, header:header});
};

DoggyGUI.prototype._doSingleRound = function () {
    
    if(this._gameOver) return;
    
    this._log("+++ Runde: " + (this.Round+1));    
    this._ts_lastround = Date.now();
    this.Round++;
    
    this.Dog.DoSingleRound(); // dog needs to be first in order to be able to prevent stealing
    this.Person.DoSingleRound();
    this.Dog.ResolveRound();
    
    this.PersonCreation();
};

DoggyGUI.prototype._getPerson = function () {
    
    var p = this.Person;
    if(p.Position >= 1) return p;
    
    return Person.GetNobody();
};

DoggyGUI.prototype.Lose = function () {
    var txt = "----> You made it to the " + this.Round + ". Round.";
    this._log(txt);    
    
    this._running = false;
    this._gameOver = true;
    
    var cbo = function(){
        var txt = "Reset-Feature not yet implemented. Please reload!";
        console.log("OOOOOO - " + txt);
        new Alert(txt).Start();
        
    }.getCallbackObject(this);
    
    new Confirm([txt, "", "Would you like to play again?".decodeURI()], cbo).Start();
};

DoggyGUI.prototype.PersonCreation = function () {
    // check if the current round is ready for an Action (for a new person to appear)
    if(this.Round < this._nextCreation) return false;
    
    //if there is a person than end function
    if(this.Person.Position > 0) return false;
    
    var labels = ["Nothing", "SmallChild", "TallChild", "Thief"];
    var chances = [40, 25, 20, 15];
    var lot = Random.DrawLot(labels, chances);
        
    if(lot === "SmallChild"){
        this.Person = new SmallChild();
    }
    
    if(lot === "TallChild"){
        this.Person = new TallChild();
    }
    
    if(lot === "Thief"){
        this.Person = new Thief();
    }
            
};

DoggyGUI.prototype.ExtendCreation = function (num) {
    var num = num || Random.GetNumber(3,5);
    this._nextCreation = this.Round + num;
};

DoggyGUI.prototype.PlayWithDog = function (num) {
    this.Dog._currentActivity = "idling";
    this.Dog._energy -= num;
    forceRange(this.Dog,"_energy", 0,100);
};

DoggyGUI.prototype.GiveDog = function (what, num) {
    this.Dog._currentActivity = "idling";
    
    if(what === "food"){
        this.Dog._hunger += num;
        forceRange(this.Dog,"_hunger", 0,100);
    }
    
    if(what === "water"){
        this.Dog._hunger += num;
        forceRange(this.Dog,"_hunger", 0,100);
    }
    
};

DoggyGUI.prototype.FastForward = function (rounds) {

	var breakend = 5000;
	var tillEnd = false;
	var i=0;
	
	if(isNaN(rounds)){
		tillEnd = true;
	}
	
	if(tillEnd){
		
		while(!this._gameOver && i<breakend){
			this._doSingleRound();
			i++;
		}
		
	}else{
		for(i=0; i<rounds && i<breakend; i++)
			this._doSingleRound();
	}
	
    
};