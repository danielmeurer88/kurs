
function Person(name, nn){
    this.Name = name;
    this._alter = 0;
    Object.defineProperty(this, "_alter", {writable:false});
    
    this.MapKeys = "nickname";
    this.Map = new WeakMap();
    this.Map.set("nickname", nn);
    
    console.log(this.Name + " is born");
}

Person.prototype.SayAge = function(){
    console.log(this.Name + " is " + this._alter + " years old");
};

Person.prototype.GetAge = function(){
    return this._alter;
};

Person.prototype.SetAge = function(age){
    Object.defineProperty(this, "_alter", {writable:true});
    this._alter = age;
    Object.defineProperty(this, "_alter", {writable:false});
};

Person.prototype.GetNickname = function(){
    return this.Map.get("nickname");
};

var marc = new Person("Marc", "Schnucki");
marc.SayAge();

marc._alter = 20;
marc.SayAge();

marc.SetAge(30);
marc.SayAge();