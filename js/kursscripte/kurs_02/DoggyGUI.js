
function DoggyGUI() {

    ABO.call(this);
    
    this.Width = this.Engine.Canvas.width;
    this.Height = this.Engine.Canvas.height;
    
    this._running = false;
    this._ts_lastround = 0;
    this.DOR = 1500; // duration of a round
    
    this.Button = {
        Start : {},
        Pause : {},
        Step : {},
        Download : {},
        FastForward : {},
        ForwardEnd : {}
    };
    
    this.Pics = {
        Background : {complete:false}
    };
    
    this.Round = 0;
    this._fastForwardEnd = 0;
    
    this.Dog = {};
    this.Chest = {};
    this.Person = {};
    this._nextCreation = 0;
    this._gameOver = false;
    
    this.Log = [];
        
this.Initialize();
}

DoggyGUI.prototype = Object.create(ABO.prototype);
DoggyGUI.prototype.constructor = DoggyGUI;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
DoggyGUI.prototype.Initialize = function () {

    var now = new Date();
    now = now.toLocaleDateString() + " - " + now.toLocaleTimeString();
    this._log("---- Starting the Game at " + now, 0); 

    this.Pics.Background = this.Engine.MediaManager.GetImage("background");
    
    this.Engine.SetSelectedObject(this);
    this.Dog = new Dog();
    this.Chest = new Chest();    
    this.Person = Person.GetNobody();
    
    this._nextCreation = Random.GetNumber(Rules.StartCreation[0], Rules.StartCreation[1]);
    
    this.Button.Start = new Button({
        X:10, Y: this.Height - 50, Width:80, Height:40,
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
            function(){return !this._running && !this._gameOver;}.getCallbackObject(this)
    );
    
    this.Button.Pause = new Button({
        X:this.Button.Start.X + this.Button.Start.Width + 10, Y: this.Height - 50, Width:60, Height:40,
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
            function(){return this._running && !this._gameOver;}.getCallbackObject(this)
    );
    
    this.Button.Step = new Button({
        X:this.Button.Pause.X + this.Button.Pause.Width + 10, Y: this.Height - 50, Width:80, Height:40,
        Label : "Step",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function () {
                this._doSingleRound();
            }.getCallbackObject(this),
        HoverText : "next round".decodeURI()
    });
    this.Button.Step.AddButtonEffect();
    this.Button.Step.SetActiveFunctionObject(
            //Step-Button will be active when game is running
            function(){return !this._running && !this._gameOver;}.getCallbackObject(this)
    );
    
    this.Button.FastForward = new Button({
        X:this.Button.Step.X + this.Button.Step.Width + 10, Y: this.Height - 50, Width:80, Height:40,
        Label : "FF",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function () {
                this.FastForward(10);
            }.getCallbackObject(this),
        HoverText : "next 10 rounds".decodeURI()
    });
    this.Button.FastForward.AddButtonEffect();
    this.Button.FastForward.SetActiveFunctionObject(
            //Step-Button will be active when game is running
            function(){return !this._running && !this._gameOver;}.getCallbackObject(this)
    );
    
    this.Button.ForwardEnd = new Button({
        X:this.Button.FastForward.X + this.Button.FastForward.Width + 10, Y: this.Height - 50, Width:80, Height:40,
        Label : "FEnd",
        TextColor: "white", FontHeight: 18,
        TriggerCallbackObject : function () {
                this.FastForward();
            }.getCallbackObject(this),
        HoverText : "jumps to the End".decodeURI()
    });
    this.Button.ForwardEnd.AddButtonEffect();
    this.Button.ForwardEnd.SetActiveFunctionObject(
            //Step-Button will be active when game is running
            function(){return !this._running && !this._gameOver;}.getCallbackObject(this)
    );
    
    this.Button.Download = new Button(
            this.X + this.Width - 60, this.Y + this.Height - 60, 50, 50,
            {DisplayType: "both", Codename: "disk", TextColor: "black", FontHeight: 18,
                TriggerCallbackObject: {that: this,
                    function: function () {
                         this.DownloadPDF();
                    }
                },
                HoverText: "Download log as pdf"
            }
    );
    this.Button.Download.AddButtonEffect();
    this.Button.Download.ColorCode[0] = "#555";
    
};
/**
 * Update
 * @returns {undefined}
 */
DoggyGUI.prototype.Update = function () {
    this.Button.Start.Update();
    this.Button.Pause.Update();
    this.Button.Step.Update();
    this.Button.Download.Update();
    this.Button.FastForward.Update();
    this.Button.ForwardEnd.Update();
    
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
    this.Button.Download.ProcessInput();
    this.Button.FastForward.ProcessInput();
    this.Button.ForwardEnd.ProcessInput();
    
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
    // what color - green, yellow or red?
    c.fillStyle = "#00ff00"; // default green
    if(en < Rules.Dog.EnergyWarning) // energy smaller warning value -> yellow
        c.fillStyle = "yellow";
    if(en < Rules.Dog.EnergyThreshold)
        c.fillStyle = "red";
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
    // what color - green, yellow or red?
    c.fillStyle = "#00ff00"; // default green
    if(hu < Rules.Dog.HungerWarning) // energy smaller warning value -> yellow
        c.fillStyle = "yellow";
    if(hu < Rules.Dog.HungerThreshold)
        c.fillStyle = "red";
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
    // what color - green, yellow or red?
    c.fillStyle = "#00ff00"; // default green
    if(th < Rules.Dog.ThirstWarning) // energy smaller warning value -> yellow
        c.fillStyle = "yellow";
    if(th < Rules.Dog.ThirstThreshold)
        c.fillStyle = "red";
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
    x = this.Width / 2 + 50;
    c.fillStyle = "#ffffff";
    c.fillText("Round: ", x+10, y+6); // +6 = difference between fontsize of printing gold (26) and round (20)
    x += c.measureText("Round: ").width;
    c.fillText(this.Round, x + 30, y+6);
        
    c.restore();

    this.Button.Start.Draw(c);
    this.Button.Pause.Draw(c);
    this.Button.Step.Draw(c);
    this.Button.Download.Draw(c);
    this.Button.FastForward.Draw(c);
    this.Button.ForwardEnd.Draw(c);
};

/**
 * Write a text as a log file - to the developer console, html console and to an array for the creation of the pdf
 * @param {string} txt - 
 * @param {number} header - the number of the header, which resolves to a bigger fontsize and color in the html-console
 * @returns {undefined}
 */
DoggyGUI.prototype._log = function (txt, header) {
    // header: size of text: 3 = normal, 2 = slightly bigger, 1 = big, 0 = Start, End    
    console.log(txt);
    this.Log.push({txt:txt, header:header});
    var con = this.Engine.GetOutsideElement("console");
    if(con){
        con.append("<p class='line line{0}'>{1}</p>".format(header, txt));

        var height = con.height();
        var scroll = 0;
        var content = con.contents();
        var el;
        for(var i=0; i<content.length; i++){
            el = content[i];
            scroll += $(el).outerHeight(true);
        }
        scroll = (scroll-height < 0) ? 0 : scroll-height;
        con.scrollTop(scroll);
    }
};
/**
 * logs the current state of the game
 * @returns {undefined}
 */
DoggyGUI.prototype._stateStatus = function(){
    var d = this.Dog;
    var txt = "STATUS - Energy: {0}, Hunger: {1}, Thirst: {2}, Gold: {3}".format(d.GetEnergy(), d.GetHunger(), d.GetThirst(), this.Chest.GetGold());
    this._log(txt, 2);
};
/**
 * executes one round
 * @returns {undefined}
 */
DoggyGUI.prototype._doSingleRound = function () {
    
    if(this._gameOver) return;
    
    this._log("+++ Runde: " + (this.Round+1), 1);    
    this._ts_lastround = Date.now();
    this.Round++;
    
    this.PersonCreation();
    
    this.Dog.DetermineActivity();
    this.Person.DoSingleRound();
    this.Dog.ResolveRound();
     
    // if the person stole all the money
    if(this.Chest._gold <= 0){
        this.Lose();
        return;
    }    
    this._stateStatus();
};

DoggyGUI.prototype._getPerson = function () {
    
    var p = this.Person;
    if(p.Position >= 1) return p;
    
    return Person.GetNobody();
};

DoggyGUI.prototype.Lose = function () {
    var txt = "----> GAME OVER - You made it to the " + this.Round + ". Round.";
    this._log(txt, 0);    
    
    this._running = false;
    this._gameOver = true;
    
    var fir = function(){
		var resetcbo = function(){this.Reset();}.getCallbackObject(this);
		this.DownloadPDF(resetcbo);
	
	}.getCallbackObject(this);
    var sec = function(){this.Reset();}.getCallbackObject(this);
    
    new MultipleChoice(["", txt, ""], ["Download Log as PDF and reset", "Only Reset", "Cancel"] ,[fir, sec, false]).Start();
};

DoggyGUI.prototype.PersonCreation = function () {
    // check if the current round is ready for an Action (for a new person to appear)
    if(this.Round < this._nextCreation) return false;
    
    //if there is a person than end function
    if(this.Person.Position > 0) return false;
    
    var labels = Rules.CharacterLabels;
    var chances = Rules.CharacterChances;
    var lot = Random.DrawLot(labels, chances);
       
    if(lot === "Child"){
        this.Person = new Child();
    }
    
    if(lot === "Teenager"){
        this.Person = new Teenager();
    }
    
    if(lot === "Thief"){
        this.Person = new Thief();
    }
            
};

DoggyGUI.prototype.ExtendCreation = function () {
    var num = Random.GetNumber(Rules.ExtendCreation[0],Rules.ExtendCreation[1]);
    this._nextCreation = this.Round + num;
};

DoggyGUI.prototype.PlayWithDog = function (num) {
    
    var dogen = this.Dog.GetEnergy();
    var distracted = false;
    
    if(dogen >= Rules.Dog.EnergyWarning){
        // if the energy is high enough -> dog is not distracted

    }else{
        if(dogen < Rules.Dog.EnergyThreshold){
            // if the energy is below treshold -> dog is distracted
            distracted = true;
        }else{
            //if energy is in between -> disracting at random
            var lot = Random.DrawLot(Rules.FirstActionWhenInBetweenLabels,Rules.FirstActionWhenInBetweenChances);
            if(lot === "distracted"){
                // dog not distracted
                distracted = true;
            }else{
                // dog is distracted
            }
        }
    }
    
    if(distracted){
        this._log("Playing distracts the dog from " + this.Dog._currentActivity,2);
        this.Dog._currentActivity = "idling";
    }
    
    this.Dog._energy -= num;
    forceRange(this.Dog,"_energy", 0,100);
};

DoggyGUI.prototype.GiveDog = function (what, num) {
    
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

	var breakingPoint = 5000;
	var tillEnd = false;
	var i=0;
	
	if(isNaN(rounds)){
		tillEnd = true;
	}
	
	if(tillEnd){
            this._fastForwardEnd = this.Round + breakingPoint;
            this._fastForwardCover(this);
		
	}else{
            this._fastForwardEnd = this.Round + rounds;
            this._fastForwardCover(this);
	}
	
    
};

DoggyGUI.prototype._fastForwardCover = function (that) {
    if(!that._gameOver && that.Round<that._fastForwardEnd){
        that._doSingleRound();
        window.setTimeout(function(that){
            that._doSingleRound();
            that._fastForwardCover(that);
        }, 100, that);
        
    }
};

DoggyGUI.prototype.DownloadPDF = function (cbo) {
    
    var cbo = function(name){
        this._createPDF(name);
    }.getCallbackObject(this);
    
    new Prompt("Name of the file (without the extension)", cbo).Start(cbo);
};

DoggyGUI.prototype._createPDF = function (name) {
    if(typeof name !== "string")
        name = prompt("Name of the file");
    var doc = new jsPDF();
    
    var border = 15;
    
    var pagey = border;
    var a4height = 297;
    var pagemax = a4height - border;
    
    var fontSize_normal = 11;
    var fontSpace = 3;
    
    // setFontSize handles arguments as a number in points
    var ptcmcr = 0.5; // points to cm conversion rate
        
    // rest of the log
    for(var i=0; i<this.Log.length; i++){
        
        doc.setFontSize(fontSize_normal);
        doc.text(this.Log[i].txt, border, pagey);
        
        pagey += (fontSize_normal + fontSpace) * ptcmcr;
        
        if(i < this.Log.length-1 && pagey > pagemax){
            doc.addPage();
            pagey = border;
        }
        
    }
    
    doc.setFontSize(1);
    doc.setTextColor(255, 255, 255);
    doc.text(this._getRulesHash(), border, pagey);
    
    doc.save(name + ".pdf");
};

DoggyGUI.prototype._getRulesHash = function () {
    var hash = "v" + Rules.Version;
    if(!sha256 || !sha256.hmac) return hash;
    var rulestr = JSON.stringify(Rules);
    return hash + "_" + sha256.hmac("test", rulestr);
};

DoggyGUI.prototype.Reset = function () {
    this._running = false;
    this._ts_lastround = 0;
    
    this.Round = 0;
    
    this.Dog = {};
    this.Chest = {};
    this.Person = {};
    this._nextCreation = 0;
    this._gameOver = false;
    
    
    var con = this.Engine.GetOutsideElement("console");
    if(con){
        con.html("");
    }
    
    this.Log = [];
    var now = new Date();
    now = now.toLocaleDateString() + " - " + now.toLocaleTimeString();
    this._log("---- Starting the Game at " + now, 0);
        
    this.Dog = new Dog();
    this.Chest = new Chest();    
    this.Person = Person.GetNobody();
    
    this._nextCreation = Random.GetNumber(Rules.StartCreation[0], Rules.StartCreation[1]);
};