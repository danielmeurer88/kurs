function Child() {
    Person.call(this);
    this.Name = "Child";
this.Initialize();
}
Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Child.prototype.Initialize = function () {

    this.Pic = this.Engine.MediaManager.GetImage("child");
    this._setNerves(Random.GetNumber(Rules.Person.Child.Nerves[0],Rules.Person.Child.Nerves[1]));
};

/**
 * Will be called if the person is at the fence (pos:4)
 * @returns {undefined}
 */
Child.prototype.DoAction = function () {
    
    if(this._scared){
        //this._log(this.Name + " is scared.", 2);
        return;
    }
    
    var res = Random.DrawLot(Rules.Person.Child.ActionLabels, Rules.Person.Child.ActionChances);
    var num;
    
    if(res === "play"){
        num = Random.GetNumber(Rules.Person.Child.EnergyPlay[0], Rules.Person.Child.EnergyPlay[1]);
        this._log(this.Name + " plays with the dog for " + num + " energy", 3);
        this.GUI.PlayWithDog(num);
        
    }
    
    if(res === "feed"){
        num = Random.GetNumber(Rules.Person.Child.EnergyFeed[0], Rules.Person.Child.EnergyFeed[1]);
        res = Random.DrawLot(Rules.Person.Child.FeedingLabels, Rules.Person.Child.FeedingChances);
        this.GUI.GiveDog(res,num);
        if(res === "water")
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " thirst", 3);
        else
            this._log(this.Name + " gives " +res+ " to the dog for " + num + " hunger", 3);
    }
};