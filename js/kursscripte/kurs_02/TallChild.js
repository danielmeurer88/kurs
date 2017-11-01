function TallChild() {
    Person.call(this);
this.Initialize();
}
TallChild.prototype = Object.create(Person.prototype);
TallChild.prototype.constructor = TallChild;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
TallChild.prototype.Initialize = function () {

    

};
/**
 * Update
 * @returns {undefined}
 */
TallChild.prototype.Update = function () {

};

/**
 * ProcessInput
 * @returns {undefined}
 */
TallChild.prototype.ProcessInput = function () {};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
TallChild.prototype.Draw = function (c) {
    c.save();

    c.restore();

};