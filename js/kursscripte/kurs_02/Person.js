function Person() {
    ABO.call(this);
    this.GUI = this.Engine.GetSelectedObject();
    this._createdAtRound = this.GUI.Round;
    
    this.Position = 1; // Attribute Position is used to locate the Person
    // 0 : "nobody is there
    // 1 : Person is approaching, able to be seen by the dog
    // 2 : Person is almost in front of the fence
    // 3 : ready to do something
    
    this._startAggressionThreshold = 5;
    this._nerves = this._startAggressionThreshold;
    
    this._comming = true; // is the person going to the fence or away
    
    this.Pic = {complete:false};
    
    this.Width = 205*0.8;
    this.Height = 435*0.8;
    
    this.X = 0 - this.Width;
    this.Y = 75;
    
    this.Name = "Person";
    
    this._atTheFence = false; // if the Person is/was at the fence
    this._gone = false;
    
}
Person.prototype = Object.create(ABO.prototype);
Person.prototype.constructor = Person;

Person.prototype._log = function (txt, header) {
    this.GUI._log(txt, header);
};

Person.prototype._receiveAggression = function (agg) {
    this._nerves -= agg;
    forceRange(this,"_nerves", 0,this._startAggressionThreshold);
    if(this._nerves === 0)
        this._comming = false;
};

Person.prototype._canReceiveAggression = function () {
    if(this.Position >= 1) return true; else false;
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
    return this._isComming;
};

Person.prototype.DoSingleRound = function () {
    
    if(this.Position === 0 && !this._atTheFence) return; // already gone, maybe it's the "nobody-Person
    
    // default:
    if(this._comming)
        this.Position++;
    else
        this.Position--;
    forceRange(this,"Position", 0,3);
    
    // if the person came from the fence and is gone
    if(this.Position === 0 && this._atTheFence && !this._comming && !this._gone){
        this._gone = true;
        this.DoStuffWhenGone();
    }
    
    // if a person reaches position 2, it counts as been at the fence
    if(this.Position === 2 && !this._atTheFence){
        this._atTheFence = true;
        this._log("The " + this.Name + " is almost at the fence", 3);
    }
    
    // after Person arrives at the fence, it goes away
    if(this.Position === 3){
        this._comming = false;
        this._log("The " + this.Name + " is at the fence", 3);
        this.DoAtTheFenceStuff();
    }
};

/**
 * will be overwritten by children
 * @returns {undefined}
 */
Person.prototype.DoAtTheFenceStuff = function () {};

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

