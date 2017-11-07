
/**
 * you can determine what the dog is going to do in the respective round
 * @param {integer} round - the current round
 * @param {object} dog - the instance of the Dog
 * @returns {undefined}
 */
function DoggyRound(round, dog,){
    // add code here
	
	dog.Rest();
    
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
    
    // Start
    
    if(type === "Thief" && comming){
        if(round%2===0)
            dog.Bark(target);
        else
            dog.Growl(target);
    }
    
    if(type === "TallChild" && comming && (pos === 2 || pos === 3) ){
        dog.Bark(target);
    }
    
    // End
    // to be sure that dog is not idling or doing the wrong activity
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