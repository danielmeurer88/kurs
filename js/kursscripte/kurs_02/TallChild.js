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
    this._setNerves(Random.GetNumber(Rules.Person.TallChild.Nerves[0],Rules.Person.TallChild.Nerves[4]));
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
TallChild.prototype.DoAction = function () {

    if(this._scared){
        this._log(this.Name + " is scared.", 2);
        return;
    }
    
    var res = Random.DrawLot(Rules.Person.TallChild.ActionLabels, Rules.Person.TallChild.ActionChances);
    
    if(res === "play"){
        var num = Random.GetNumber(Rules.Person.TallChild.EnergyPlay[0], Rules.Person.TallChild.EnergyPlay[1]);
        this.GUI.PlayWithDog(num);
        this._log(this.Name + " plays with the dog for " + num + " energy");
    }
    
    if(res === "steal"){
        //steal
        var steal = Random.GetNumber(Rules.Person.TallChild.GoldSteal[0], Rules.Person.TallChild.GoldSteal[1]);
        this.GUI.Chest.StealFrom(steal);
        this._log(this.Name + " steals " + steal + " Gold out of the chest");
    }

};