function SmallChild() {
    Person.call(this);
this.Initialize();
}
SmallChild.prototype = Object.create(Person.prototype);
SmallChild.prototype.constructor = SmallChild;

/**
 * can be seen as an extension of the constructor function
 * @returns {undefined}
 */
SmallChild.prototype.Initialize = function () {

    

};
/**
 * Update
 * @returns {undefined}
 */
SmallChild.prototype.Update = function () {

};

/**
 * ProcessInput
 * @returns {undefined}
 */
SmallChild.prototype.ProcessInput = function () {};

/**
 * Draw
 * @param {2dCanvasContext} c
 * @returns {undefined}
 */
SmallChild.prototype.Draw = function (c) {
    c.save();

    c.restore();

};