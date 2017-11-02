function SmallChild() {
    Person.call(this);
    this.Name = "SmallChild";
this.Initialize();
}
SmallChild.prototype = Object.create(Person.prototype);
SmallChild.prototype.constructor = SmallChild;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
SmallChild.prototype.Initialize = function () {

    this.Pic = this.Engine.MediaManager.GetImage("smallchild");
    this._setNerves(Random.GetNumber(1,3));
    this._log("STATUS: A " + this.Name + " is comming");
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
SmallChild.prototype.DoAtTheFenceStuff = function () {
    
    var res = Random.DrawLot(["play", "feed"], [3,7]);
    var num;
    
    if(res === "play"){
        num = Random.GetNumber(10, 15);
        this.GUI.PlayWithDog(num);
        this._log(this.Name + " plays with the dog for " + num + " energy");
    }
    
    if(res === "feed"){
        num = Random.GetNumber(4, 10);
        res = Random.DrawLot(["food", "water"], [5,5]);
        this.GUI.GiveDog(res,num);
        if(res === "water")
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " thirst");
        else
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " hunger");
    }
};