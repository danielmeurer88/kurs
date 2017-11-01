function Person() {
    ABO.call(this);
    this.GUI = this.Engine.GetSelectedObject();
    this._createdAtRound = this.GUI.Round;
    
    this.Position = 1; // Attribute Position is used to locate the Person
    // 0 : "nobody is there
    // 1 : Person is approaching, able to be seen by the dog
    // 2 : Person is almost in front of the fence, can now be barked/growled at
    // 3 : ready to do something
    
    this._startAggressionThreshold = 5;
    this._nerves = this._startAggressionThreshold;
    
    this._comming = true; // is the person going to the fence or away
    
    this.Pic = {complete:false};
}
Person.prototype = Object.create(ABO.prototype);
Person.prototype.constructor = Person;

Person.prototype._log = function (txt) {
    this.GUI._log(txt);
};

Person.prototype._receiveAggression = function (agg) {
    this._nerves -= agg;
    forceRange(this,"_nerves", 0,this._startAggressionThreshold);
    if(this._nerves === 0)
        this._comming = false;
};

Person.prototype._canReceiveAggression = function () {
    if(this.Position >= 2) return true; else false;
};

Person.prototype._setNerves = function (thr) {
    this._startAggressionThreshold = thr;
    this._nerves = this._startAggressionThreshold;
};

Person.prototype.GetPosition = function () {
    return this.Position;
};

Person.prototype.IsComming = function () {
    return this._isComming;
};

Person.prototype.DoSingleRound = function () {
    // will be overwritten by children
    
    if(this.Position === 0) return; // already gone
    
    // default:
    if(this._comming)
        this.Position++;
    else
        this.Position--;
    forceRange(this,"Position", 0,3);
    
    // after Person arrives at the fence, it goes away
    if(this.Position === 3)
        this._comming = false;
};

Person.prototype.ProcessInput = function () {
    // will be overwritten by children
};

Person.prototype.Update = function () {
    // will be overwritten by children
};

Person.prototype.Draw = function (c) {
    // will be overwritten by children
    
    var y = 75;
    var x = -999;
    var width = 205*0.8;
    var height = 435*0.8;
    
    if(this.Position === 1)
        x = this.GUI.Width - (width - 75);
    
    if(this.Position === 2)
        x = this.GUI.Width - (width);
    
    if(this.Position === 3)
        x = this.GUI.Width - (width + 75);
    
    var img = this.Engine.MediaManager.GetImage("tallchild");
    if(img)
        c.drawImage(img, x, y, width, height);
};

/**
 * Static function to get a none existing person
 * @returns {Person.GetNobody.p|Person}
 */
Person.GetNobody = function(){
    var p = new Person();
    p.Position = 0;
    return p;
};

