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
    this._internalThreshold = Random.GetNumber(1, 4);
    this._setNerves(Random.GetNumber(3,6));
    this._log("STATUS: A " + this.Name + " is comming");
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
Thief.prototype.DoAtTheFenceStuff = function () {
    this._internalCounter++;
    //steal
    var steal = Random.GetNumber(30, 80);
    this.GUI.Chest.StealFrom(steal);
    this._log(this.Name + " steals " + steal + " Gold out of the chest (" + this._internalCounter + ". time)");
        
    if(this._internalCounter < this._internalThreshold){
        this._comming = true;
    }
};