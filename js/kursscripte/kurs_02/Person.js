function Person() {
    ABO.call(this);
    this.GUI = this.Engine.GetSelectedObject();
}
Person.prototype = Object.create(ABO.prototype);
Person.prototype.constructor = Person;

Person.prototype._log = function (txt) {
    this.GUI._log(txt);
};