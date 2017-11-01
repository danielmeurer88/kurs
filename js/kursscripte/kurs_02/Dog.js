
function Dog() {

    ABO.call(this);
    
    this.GUI = this.Engine.GetSelectedObject();
    
    this.DogPic = {complete:false};
    this.DogBackPic = {complete:false};
    
    this.Name = "Doggy";
    this._energy = 100;
    this._thirst = 100;
    this._hunger = 100;
    this._currentTarget = Person.GetNobody();
    
    this.CurrentActivity = "idling"; // barking, growling, drinking, eating, resting
    
    this.EnergyCosts = {
        Barking : -3,
        Growling : -5,
        Thirsty : -2,
        Hungry : -1,
        Resting: 8
    };
    
    this._eatingIncrease = 18;
    this._drinkingIncrease = 18;
    
    this._hungerDecrease = 3;
    this._hungerThreshold = 15;
    this._thirstDecrease = 3;
    this._thirstThreshold = 20;
    
this.Initialize();
}

Dog.prototype = Object.create(ABO.prototype);
Dog.prototype.constructor = Dog;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Dog.prototype.Initialize = function () {

    this.DogPic = this.Engine.MediaManager.GetImage("dog");
    this.DogBackPic = this.Engine.MediaManager.GetImage("dog_back");

};
/**
 * Update
 * @returns {undefined}
 */
Dog.prototype.Update = function () {

};

/**
 * ProcessInput
 * @returns {undefined}
 */
Dog.prototype.ProcessInput = function () {};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
Dog.prototype.Draw = function (c) {
    c.save();
    
    if(this._drawInFrontOfTheFence()){
        
        if(this.DogPic.complete){
            c.drawImage(this.DogPic, 140, 280,this.DogPic.width*0.8, this.DogPic.height*0.8);
        }
        
    }else{
        
        var dx,dy = 300;
        
        if(this.CurrentActivity === "drinking")
            dx = 42;
        else
            dx = 135;
        
        if(this.DogBackPic.complete){
            c.drawImage(this.DogBackPic, dx, dy,this.DogBackPic.width*0.8, this.DogBackPic.height*0.8);
        }
        
    }

    c.restore();

};

Dog.prototype._drawInFrontOfTheFence = function () {
    var a = this.CurrentActivity;
    if(a === "barking" || a === "growling"|| a === "resting" || a === "idling")
        return true;
    else
        return false;
};


Dog.prototype._log = function (txt) {
    this.GUI._log(txt);
};

Dog.prototype.Bark = function (target) {
    
    if(target instanceof Person && target._canReceiveAggression()){
            this.CurrentActivity = "barking";
            this._currentTarget = target;
            return;
    }
    
    this.CurrentActivity = "idling";
    this._log(this.Name + "tries to bark but nobody is in front of the fence");
    
};

Dog.prototype.Growl = function (target) {
    
    if(target instanceof Person && target._canReceiveAggression()){
            this.CurrentActivity = "growling";
            this._currentTarget = target;
            return;
    }
    
    this.CurrentActivity = "idling";
    this._log(this.Name + "tries to growl but nobody is in front of the fence");
};

Dog.prototype.Eat = function () {
    this._currentTarget = Person.GetNobody();
    this.CurrentActivity = "eating";
};

Dog.prototype.Drink = function () {
    this._currentTarget = Person.GetNobody();
    this.CurrentActivity = "drinking";
};

Dog.prototype.Check = function () {
    return this.GUI._getPerson();
};

Dog.prototype.Rest = function () {
    this.CurrentActivity = "resting";
};

Dog.prototype.DoSingleRound = function () {
    // INVOKE USER MADE FUNCTION
    DoggyRound(this.GUI.Round, this);
    
    this.ResolveRound();
    
};

Dog.prototype.ResolveRound = function () {
    
    //basics
    this._hunger -= this._hungerDecrease;
    forceRange(this,"_hunger", 0,100);
    
    this._thirst -= this._thirstDecrease;
    forceRange(this,"_thirst", 0,100);
    
    if(this.CurrentActivity!== "eating" && this._hunger < this._hungerThreshold){
        this._energy += this.EnergyCosts.Hungry;
        this._log(this.Name + " is hungry and loses " + this.EnergyCosts.Hungry + " energy");
    }
    if(this.CurrentActivity!== "drinking" && this._thirst < this._thirstThreshold){
        this._energy += this.EnergyCosts.Thirsty;
        this._log(this.Name + " is thirsty and loses " + this.EnergyCosts.Thirsty + " energy");
    }
    forceRange(this,"_energy", 0,100);


    if(this.CurrentActivity === "idling"){
        this._log(this.Name + " idles");
    }
    
    if(this.CurrentActivity === "resting"){
        this._currentTarget = Person.GetNobody();
        this._energy += this.EnergyCosts.Resting;
        forceRange(this,"_energy", 0,100);
        this._log(this.Name + " is resting and gains " + this.EnergyCosts.Resting + " energy");
    }
    
    if(this.CurrentActivity === "drinking"){
        this._thirst += this._drinkingIncrease;
        forceRange(this,"_thirst", 0,100);
        this._log(this.Name + " is drinking and gains " + this._drinkingIncrease + " thirst");
    }
    
    if(this.CurrentActivity === "eating"){
        this._hunger += this._eatingIncrease;
        forceRange(this,"_hunger", 0,100);
        this._log(this.Name + " is eating and gains " + this._eatingIncrease + " hunger");
    }
        
    if(this.CurrentActivity === "barking"){
        this._energy += this.EnergyCosts.Barking;
        forceRange(this,"_energy", 0,100);
        this._log(this.Name + " barks and loses " + this.EnergyCosts.Barking + " energy");
        this._currentTarget._receiveAggression( this.EnergyCosts.Barking*(-1) );
        return false;
    }
    
    if(this.CurrentActivity === "growling"){
        this._energy += this.EnergyCosts.Growling;
        forceRange(this,"_energy", 0,100);
        this._log(this.Name + " growls and loses " + this.EnergyCosts.Growling + " energy");
        this._currentTarget._receiveAggression( this.EnergyCosts.Growling*(-1));
        return false;
    }
    
    
};

Dog.prototype.GetEnergy = function () {
    return this._energy;
    
};

Dog.prototype.GetHunger = function () {
    return this._hunger;
    
};

Dog.prototype.GetThirst = function () {
    return this._thirst;
    
};

Dog.prototype.GetActivity = function () {
    return this.CurrentActivity;
    
};