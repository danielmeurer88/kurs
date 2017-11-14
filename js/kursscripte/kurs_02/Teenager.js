function Teenager() {
    Person.call(this);
    this.Name = "Teenager";
this.Initialize();
}
Teenager.prototype = Object.create(Person.prototype);
Teenager.prototype.constructor = Teenager;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Teenager.prototype.Initialize = function () {
    this.Pic = this.Engine.MediaManager.GetImage("teenager");
    this._setNerves(Random.GetNumber(Rules.Person.Teenager.Nerves[0],Rules.Person.Teenager.Nerves[4]));
};

/**
 * Will be called if the person reaches the fence
 * @returns {undefined}
 */
Teenager.prototype.DoAction = function () {

    if(this._scared){
        //this._log(this.Name + " is scared.", 2);
        return;
    }
    
    var res = Random.DrawLot(Rules.Person.Teenager.ActionLabels, Rules.Person.Teenager.ActionChances);
    
    if(res === "play"){
        var num = Random.GetNumber(Rules.Person.Teenager.EnergyPlay[0], Rules.Person.Teenager.EnergyPlay[1]);
        this._log(this.Name + " plays with the dog for " + num + " energy",3);
        this.GUI.PlayWithDog(num);
        
    }
    
    if(res === "steal"){
        //steal
        var steal = Random.GetNumber(Rules.Person.Teenager.GoldSteal[0], Rules.Person.Teenager.GoldSteal[1]);
        this.GUI.Chest.StealFrom(steal);
        this._log(this.Name + " steals " + steal + " Gold out of the chest",3);
    }

};