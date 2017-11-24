
function Dog() {

    Anibody.classes.ABO.call(this);
    
    this.GUI = this.Engine.GetSelectedObject();
    
    this.DogPic = {complete:false};
    this.DogBackPic = {complete:false};
    
    this.Name = "Doggy";
    this._energy = 100;
    this._thirst = 100;
    this._hunger = 100;
    this._currentTarget = Person.GetNobody();
    
    this._currentActivity = "idling"; // barking, growling, drinking, eating, resting
    
    this.EnergyCosts = Rules.Dog.Energy
    
    this._eatingIncrease = Rules.Dog.EatingIncrease;
    this._drinkingIncrease = Rules.Dog.DrinkingIncrease;
    
    this._hungerDecrease = Rules.Dog.HungerDecrease;
    this._hungerThreshold = Rules.Dog.HungerThreshold;
    this._thirstDecrease = Rules.Dog.ThirstDecrease;
    this._thirstThreshold = Rules.Dog.ThirstThreshold;
        
this.Initialize();
}

Dog.prototype = Object.create(Anibody.classes.ABO.prototype);
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
        
        if(this._currentActivity === "resting"){
            var m = {x:140 + this.DogPic.width*0.8, y:280};
            
            c.fillStyle = "white";
            c.fillVariousRoundedRect(m.x-14, m.y-14,28,28,5);
            c.font='900 28px Arial';
            c.fillStyle = "black";
            c.fillSpinnedText(m.x, m.y, "Z");
            
            m.x += 20;
            m.y -= 34;
            
            c.fillStyle = "white";
            c.fillVariousRoundedRect(m.x-18, m.y-18,36,36,6);
            c.font='900 36px Arial';
            c.fillStyle = "black";
            c.fillSpinnedText(m.x, m.y, "Z");
            
            m.x += 24;
            m.y -= 40;
            
            c.fillStyle = "white";
            c.fillVariousRoundedRect(m.x-22, m.y-22,44,44,7);
            c.font='900 44px Arial';
            c.fillStyle = "black";
            c.fillSpinnedText(m.x, m.y, "Z");
        }
        
    }else{
        
        var dx,dy = 300;
        
        if(this._currentActivity === "drinking")
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
    var a = this._currentActivity;
    if(a === "barking" || a === "growling"|| a === "resting" || a === "idling")
        return true;
    else
        return false;
};


Dog.prototype._log = function (txt, header) {
    this.GUI._log(txt, header);
};

Dog.prototype.Bark = function (target) {
    
    if(target instanceof Person && target._canReceiveAggression()){
            this._currentActivity = "barking";
            this._currentTarget = target;
            return;
    }
        
    this._currentActivity = "idling";
    this._log(this.Name + " tries to bark but nobody is in front of the fence", 3);
    
};

Dog.prototype.Growl = function (target) {
    
    if(target instanceof Person && target._canReceiveAggression()){
            this._currentActivity = "growling";
            this._currentTarget = target;
            return;
    }
        
    this._currentActivity = "idling";
    this._log(this.Name + " tries to growl but nobody is in front of the fence", 3);
};

Dog.prototype.Eat = function () {
    this._currentTarget = Person.GetNobody();
    this._currentActivity = "eating";
};

Dog.prototype.Idle = function () {
    this._currentTarget = Person.GetNobody();
    this._currentActivity = "idling";
};

Dog.prototype.Drink = function () {
    this._currentTarget = Person.GetNobody();
    this._currentActivity = "drinking";
};

Dog.prototype.Check = function () {
    return this.GUI._getPerson();
};

Dog.prototype.Rest = function () {
    this._currentActivity = "resting";
};

Dog.prototype.DetermineActivity = function () {
    // INVOKE USER MADE FUNCTION
    DoggyRound(this.GUI.Round, this);
    this._log(this.Name + " is getting ready for " + this._currentActivity,3);
};

Dog.prototype.ResolveRound = function () {
    
    //basics
    this._hunger -= this._hungerDecrease;
    forceRange(this,"_hunger", 0,100);
    
    this._thirst -= this._thirstDecrease;
    forceRange(this,"_thirst", 0,100);
    
    if(this._currentActivity!== "eating" && this.IsHungry()){
        this._energy -= this.EnergyCosts.Hungry;
        this._log(this.Name + " is hungry and loses " + this.EnergyCosts.Hungry + " energy", 2);
    }
    if(this._currentActivity!== "drinking" && this.IsThirsty()){
        this._energy -= this.EnergyCosts.Thirsty;
        this._log(this.Name + " is thirsty and loses " + this.EnergyCosts.Thirsty + " energy", 2);
    }
    forceRange(this,"_energy", 0,100);


    if(this._currentActivity === "idling"){
        this._log(this.Name + " idles",3);
    }
    
    if(this._currentActivity === "resting"){
        this._currentTarget = Person.GetNobody();
        var gain = this.EnergyCosts.Resting;
        
        if(this.IsHungry())
            gain -= this.EnergyCosts.Hungry;
        
        if(this.IsThirsty())
            gain -= this.EnergyCosts.Thirsty;
        
        this._energy += gain;
        forceRange(this,"_energy", 0,100);
        this._log(this.Name + " is resting and gains " + gain + " energy", 3);
    }
    
    if(this._currentActivity === "drinking"){
        this._thirst += this._drinkingIncrease;
        forceRange(this,"_thirst", 0,100);
        this._log(this.Name + " is drinking and gains " + this._drinkingIncrease + " thirst", 3);
    }
    
    if(this._currentActivity === "eating"){
        this._hunger += this._eatingIncrease;
        forceRange(this,"_hunger", 0,100);
        this._log(this.Name + " is eating and gains " + this._eatingIncrease + " hunger", 3);
    }
        
    if(this._currentActivity === "barking"){
        if(this.IsAbleToBark()){
            this._energy -= this.EnergyCosts.Barking;
            forceRange(this,"_energy", 0,100);
            this._log(this.Name + " barks and loses " + this.EnergyCosts.Barking + " energy", 2);
            this._currentTarget._receiveAggression( this.EnergyCosts.Barking );
        }else{
            this._log(this.Name + " is too weak and was not able to bark", 2);
        }
        return false;
    }
    
    if(this._currentActivity === "growling"){
        if(this.IsAbleToGrowl()){
            this._energy -= this.EnergyCosts.Growling;
            forceRange(this,"_energy", 0,100);
            this._log(this.Name + " growls and loses " + this.EnergyCosts.Growling + " energy", 2);
            this._currentTarget._receiveAggression( this.EnergyCosts.Growling);
        }else{
            this._log(this.Name + " is too weak and was not able to growl", 2);
        }
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
    return this._currentActivity;
    
};

Dog.prototype.IsHungry = function () {
    return (this._hunger < this._hungerThreshold) ? true : false;    
};

Dog.prototype.IsThirsty = function () {
    return (this._thirst < this._thirstThreshold) ? true : false;    
};

Dog.prototype.IsAbleToBark = function () {
    var needed = this.EnergyCosts.Barking;
    var deductions = 0;
    
    if(this.IsHungry())
        deductions += this.EnergyCosts.Hungry;
    
    if(this.IsThirsty())
        deductions += this.EnergyCosts.Thirsty;
    
    if(this._energy - needed - deductions >= 0)
        return true;
    else
        return false;
};

Dog.prototype.IsAbleToGrowl = function () {
    var needed = this.EnergyCosts.Growling;
    var deductions = 0;
    
    if(this.IsHungry())
        deductions += this.EnergyCosts.Hungry;
    
    if(this.IsThirsty())
        deductions += this.EnergyCosts.Thirsty;
    
    if(this._energy - needed - deductions >= 0)
        return true;
    else
        return false;
};