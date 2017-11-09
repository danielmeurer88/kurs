
function Chest() {

    ABO.call(this);
    
    this.GUI = this.Engine.GetSelectedObject();
    
    this.ChestPic = {complete:false};
    
    this._startAmount = Rules.Chest.StartAmount;
    this._gold = this._startAmount;
    
    this.X = 218;
    this.Y = 260;
    this.Width = 268 * 0.8;
    this.Height = 181 * 0.8;
    
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
Chest.prototype.Update = function () {};

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
        c.drawImage(this.ChestPic, this.X, this.Y, this.Width, this.Height);
    }
    c.restore();

};

Chest.prototype._log = function (txt) {
    this.GUI._log(txt,3);
};


Chest.prototype.GetGold = function () {
    return this._gold;
    
};

Chest.prototype.StealFrom = function (num) {
    this._gold -= num;
};