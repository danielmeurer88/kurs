function TallChild() {
    Person.call(this);
    this.Name = "TallChild";
this.Initialize();
}
TallChild.prototype = Object.create(Person.prototype);
TallChild.prototype.constructor = TallChild;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
TallChild.prototype.Initialize = function () {

    this.Pic = this.Engine.MediaManager.GetImage("tallchild");
    this._setNerves(Random.GetNumber(2,4));
    this._log("STATUS: A " + this.Name + " is comming");
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
TallChild.prototype.DoAtTheFenceStuff = function () {

    var res = Random.DrawLot(["play", "steal"], [3,1]);
    
    if(res === "play"){
        var num = Random.GetNumber(5, 10);
        this.GUI.PlayWithDog(num);
        this._log(this.Name + " plays with the dog for " + num + " energy");
    }
    
    if(res === "steal"){
        //steal
        var steal = Random.GetNumber(10, 60);
        this.GUI.Chest.StealFrom(steal);
        this._log(this.Name + " steals " + steal + " Gold out of the chest");
    }

};