
function Chest() {

    ABO.call(this);
    
    this.GUI = this.Engine.GetSelectedObject();
    
    this.ChestPic = {complete:false};
    
    this._startAmount = 1000;
    this._gold = this._startAmount;
    
this.Initialize();
}

Chest.prototype = Object.create(ABO.prototype);
Chest.prototype.constructor = Chest;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Chest.prototype.Initialize = function () {

    this.ChestPic = this.Engine.MediaManager.GetImage("chest");

};
/**
 * Update
 * @returns {undefined}
 */
Chest.prototype.Update = function () {
    if(this._gold <= 0){
        this.GUI.Lose();
    }
};

/**
 * ProcessInput
 * @returns {undefined}
 */
Chest.prototype.ProcessInput = function () {};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
Chest.prototype.Draw = function (c) {
    c.save();
    if(this.ChestPic.complete){
        c.drawImage(this.ChestPic, 218, 260, this.ChestPic.width*0.8, this.ChestPic.height*0.8);
    }
    c.restore();

};

Chest.prototype._log = function (txt) {
    this.GUI._log(txt);
};


Chest.prototype.GetGold = function () {
    return this._gold;
    
};

Chest.prototype.StealFrom = function (num) {
    this._gold -= num;
    forceRange(this,"_gold", 0,this._startAmount);
    //this._log("# " + num + " Gold wurde geklaut");
    
};