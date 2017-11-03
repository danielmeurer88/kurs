
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

// dog.IsHungry()
// dog.IsThirsty()
// dog.IsAbleToBark();
// dog.IsAbleToGrowl();

// dog.Check() : your dog checks if there is a person in front of the fence, Check() returns a target (class: Person)

// dog.Bark(target) :
// dog.Growl(target) :

// target-Methods (class: Person)

// target.GetPosition() : returns the position encoded as a number between 0-4
    // 0 : "Nobody" is there
    // 1 : Person is comming
    // 2 : Person is almost in front of the fence, able to be seen by the dog
    // 3 : ready to do something
    // 4 : at the fence and has done something

// target.GetType() : returns the type of the person as a string ("Nobody", "SmallChild", "TallChild", "Thief")
// target.IsComming() : returns boolean whether target is comming or going

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
    saveType(type);
    var pos = target.GetPosition();
    savePosition(pos);
    
    var comming = target.IsComming();
    
    if(type === "Thief" && comming)
        dog.Bark(target);
    
    // save guard at the end
    // to be sure that dog is not idling
    var a = dog.GetActivity();
    if(a === "idling" || a === "resting" || a === "eating" || a === "drinking"){
        if(hu < th)
            dog.Eat();
        else
            dog.Drink();
        if(en < hu && en < th)
            dog.Rest();
        
    }
        
}