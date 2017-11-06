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
    this._setNerves(Random.GetNumber(Rules.Person.SmallChild.Nerves[0],Rules.Person.SmallChild.Nerves[1]));
};

/**
 * Will be called if the person is at the fence (pos:4)
 * @returns {undefined}
 */
SmallChild.prototype.DoAction = function () {
    
    if(this._scared){
        this._log(this.Name + " is scared.", 2);
        return;
    }
    
    var res = Random.DrawLot(Rules.Person.SmallChild.ActionLabels, Rules.Person.SmallChild.ActionChances);
    var num;
    
    if(res === "play"){
        num = Random.GetNumber(Rules.Person.SmallChild.EnergyPlay[0], Rules.Person.SmallChild.EnergyPlay[1]);
        this._log(this.Name + " plays with the dog for " + num + " energy", 3);
        this.GUI.PlayWithDog(num);
        
    }
    
    if(res === "feed"){
        num = Random.GetNumber(Rules.Person.SmallChild.EnergyFeed[0], Rules.Person.SmallChild.EnergyFeed[1]);
        res = Random.DrawLot(Rules.Person.SmallChild.FeedingLabels, Rules.Person.SmallChild.FeedingChances);
        this.GUI.GiveDog(res,num);
        if(res === "water")
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " thirst", 3);
        else
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " hunger", 3);
    }
};