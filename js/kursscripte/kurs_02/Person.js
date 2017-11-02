function Person() {
    ABO.call(this);
    this.GUI = this.Engine.GetSelectedObject();
    this._createdAtRound = this.GUI.Round;
    
    
    
    this.Position = 0; // Attribute Position is used to locate the Person
    // 0 : "nobody is there
    // 1 : Person is comming
    // 2 : Person is almost in front of the fence, able to be seen by the dog
    // 3 : ready to do something
    // 4 : at the fence and has done something
    
    this._startAggressionThreshold = 5;
    this._nerves = this._startAggressionThreshold;
    
    this._comming = true; // is the person going to the fence or away
    
    this.Pic = {complete:false};
    
    this.Width = 205*0.8;
    this.Height = 435*0.8;
    
    this.X = 0 - this.Width;
    this.Y = 75;
    
    this.Name = "Person";
    this.Number = Person.NumberPool++;
    
    this._atTheFence = false; // if the Person is/was at the fence
    this._scared = false;
    this._gone = false;
    
}
Person.prototype = Object.create(ABO.prototype);
Person.prototype.constructor = Person;

Person.prototype._log = function (txt, header) {
    this.GUI._log(txt, header);
};

Person.prototype._receiveAggression = function (agg) {
    this._nerves -= agg;
    
    if(this._nerves <= 0){
        this._comming = false;
        this._scared = true;
        this._log(this.Name + " is scared");
    }
};

Person.prototype._canReceiveAggression = function () {
    return (this.Position > 1) ? true : false;
};

Person.prototype._setNerves = function (thr) {
    this._startAggressionThreshold = thr;
    this._nerves = this._startAggressionThreshold;
};

Person.prototype.GetPosition = function () {
    return this.Position;
};

Person.prototype.GetType = function () {
    return this.Name;
};

Person.prototype.IsComming = function () {
    if(this.Name === "Nobody") return false;
    return this._comming;
};

Person.prototype.DoSingleRound = function () {
    
    if(this.Name === "Nobody") return; // No Nobody-Person
    
    // default:
    if(this._comming)
        this.Position++;
    else
        this.Position--;
    forceRange(this,"Position", 0,4);
    
    // if the person came from the fence and is gone
    if(this.Position === 0 && !this._gone){
        this._gone = true;
        this.DoStuffWhenGone();
    }
    
    if(this.Position === 1)
        if(this._comming){
            this._log("A " + this.Name + " is comming (1/" +this.Number+ ")", 3);
        }else{
            this._log("The " + this.Name + " is leaving (1/" +this.Number+ ")", 3);
        }
    
    // if a person reaches position 2
    if(this.Position === 2)
        if(this._comming){
            this._log("The " + this.Name + " is almost at the fence (2/" +this.Number+ ")", 3);
        }else{
            this._log("The " + this.Name + " is stepping away from the fence (2/" +this.Number+ ")", 3);
        }
        
    // after Person arrives at the fence, it goes away
    if(this.Position === 3)
        if(this._comming){
            this._atTheFence = true;
            this._log("The " + this.Name + " is at the fence and ready to do something (3/" +this.Number+ ")", 3);
        }else{
            this._log("The " + this.Name + " is turning around, away from the fence (3/" +this.Number+ ")", 3);
        }
    
    if(this.Position === 4){
        this._comming = false;
        this.DoAction();
    }
};

/**
 * will be overwritten by children
 * @returns {undefined}
 */
Person.prototype.DoAction = function () {};

/**
 * can be overwritten by children
 * @returns {undefined}
 */
Person.prototype.DoStuffWhenGone = function () {
    this.GUI.ExtendCreation();
};

Person.prototype.Draw = function (c) {
    // will be overwritten by children
    c.save();
    if(this.Position === 0){
        this.X = 0 - this.Width;
    }
    
    if(this.Position === 1)
        this.X = this.GUI.Width - (this.Width - 75);
    
    if(this.Position === 2)
        this.X = this.GUI.Width - (this.Width);
    
    if(this.Position === 3)
        this.X = this.GUI.Width - (this.Width + 75);
    
    if(this.Pic && this.Pic.complete)
        c.drawImage(this.Pic, this.X, this.Y, this.Width, this.Height);
    else{
        c.fillRect(this.X, this.Y, this.Width, this.Height);
        c.fillStyle = "white";
        c.fillText(this.Name, this.X +20, this.Y +20);
    }
    c.restore();    
};

/**
 * Static function to get a none existing person
 * @returns {Person.GetNobody.p|Person}
 */
Person.GetNobody = function(){
    var p = new Person();
    p.Position = 0;
    p.Name = "Nobody";
    return p;
};

Person.NumberPool = 0;