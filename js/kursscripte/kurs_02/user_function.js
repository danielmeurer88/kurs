
// Write a script that let the dog last as long as possible

// you have the following possibilities:

// Dog-Methods

// dog.GetEnergy() : returns the number of your dog's energy (number between 100 and 0)
// dog.GetHunger() : returns the number of your dog's hunger (number between 100 and 0)
// dog.GetThirst() : returns the number of your dog's thirst (number between 100 and 0)
// dog.GetActivity() : returns the activity your dog is doing at the moment (string: "idling", "resting", "drinking", "eating", "barking" or "growling")

// dog.Rest() : your dog will rest and gain energy at the end of the round (resting will be interrupted by children playing or giving things to the dog)
// dog.Drink() : your dog will drink and gain thirst satisfaction at the end of the round (drinking will be interrupted by children playing or giving things to the dog)
// dog.Eat() : your dog will eat and gain hunger satisfaction at the end of the round (eating will be interrupted by children playing or giving things to the dog)

// dog.Check() : your dog checks if there is a person in front of the fence, Check() returns a target (class: Person)

// dog.Bark(target) :
// dog.Growl(target) :

// target-Methods (class: Person)

// target.GetPosition() : returns the position encoded as a number between 0-3
    // 0 : Nobody is there
    // 1 : Person is approaching, able to be seen by the dog
    // 2 : Person is almost in front of the fence
    // 3 : at the fence and has done something

// target.GetType() : returns the type of the person as a string ("Nobody", "SmallChild", "TallChild", "Thief")

function DoggyRound(round, dog,){
        
    var saveType = function(type){sessionStorage.setItem("doggy_lastType", type);};
    var restoreType = function(){return sessionStorage.getItem("doggy_lastType");}
    var savePosition = function(pos){sessionStorage.setItem("doggy_lastPos", pos);};
    var restorePosition = function(){return sessionStorage.getItem("doggy_lastPos");}
    
    var lastType = "Nobody";
    var lastPos = 0;
    
    if(round !== 1){
        lastType = restoreType();
        lastPos = restorePosition();
    }
    
    var en = dog.GetEnergy();
    var hu = dog.GetHunger();
    var th = dog.GetThirst();
    
    var target = dog.Check();
    var type = target.GetType();
    var newTarget = false;
    
    if(type !== lastType)
        newTarget = true;
    
    saveType(type);
    
    var pos = target.GetPosition();
    savePosition(pos);
    
    var leaving = (lastPos < pos) ? true : false;
    var thiefStuck = false;
    if(type==="Thief" && pos === 3 && lastPos === 3)
        thiefStuck = true;
    
    var danger = 0;
    
    // danger detection
    if(type === "Thief" && pos === 1 )
        danger = 3;
    
    if(type === "Thief" && pos === 2 )
        danger = 2;
    
    // thief could steal again but also leave
    if(type === "Thief" && pos === 3)
        danger = 2;
    
    if(type === "TallChild" && pos === 1 && !leaving)
        danger = 1;
    
    if(type === "TallChild" && pos === 2 && !leaving)
        danger = 2;
    
    if(danger === 2)
        dog.Bark(target);
    
    if(danger === 3 || thiefStuck)
        dog.Growl(target);
    
    //Danger prevention
    
    if(danger < 2){
        if(th <= 15) dog.Drink();
        if(hu <= 15) dog.Eat();
    }
    // dog should rest if energy is too low and no immidiate danger
    if(danger < 3 && en <= 20)
        dog.Rest();
    
    // save guard at the end
    // to be sure that dog is not idling
    if(dog.GetActivity() === "idling")
        dog.Rest();
}