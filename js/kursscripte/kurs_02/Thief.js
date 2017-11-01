function Thief() {
    Person.call(this);
this.Initialize();
}
Thief.prototype = Object.create(Person.prototype);
Thief.prototype.constructor = Thief;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
Thief.prototype.Initialize = function () {

    

};
/**
 * Update
 * @returns {undefined}
 */
Thief.prototype.Update = function () {

};

/**
 * ProcessInput
 * @returns {undefined}
 */
Thief.prototype.ProcessInput = function () {};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
Thief.prototype.Draw = function (c) {
    c.save();

    c.restore();

};