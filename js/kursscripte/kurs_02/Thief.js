function Thief() {
    Person.call(this);
    this.Name = "Thief";
    
    this._internalThreshold = 0;
    this._internalCounter = 0;
    
this.Initialize();
}
Thief.prototype = Object.create(Person.prototype);
Thief.prototype.constructor = Thief;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Thief.prototype.Initialize = function () {

    this.Pic = this.Engine.MediaManager.GetImage("thief");
    this._internalThreshold = Random.GetNumber(Rules.Person.Thief.Stealings[0], Rules.Person.Thief.Stealings[1]);
    this._setNerves(Random.GetNumber(Rules.Person.Thief.Nerves[0],Rules.Person.Thief.Nerves[1]));
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
Thief.prototype.DoAction = function () {
    
    if(this._scared){
        //this._log(this.Name + " is scared.", 2);
        return;
    }
    
    this._internalCounter++;
    //steal
    var steal = Random.GetNumber(Rules.Person.Thief.GoldSteal[0],Rules.Person.Thief.GoldSteal[1]);
    this.GUI.Chest.StealFrom(steal);
    this._log(this.Name + " steals " + steal + " Gold out of the chest (" + this._internalCounter + ". time)", 3);
        
    if(this._internalCounter < this._internalThreshold){
        this._comming = true;
    }
};