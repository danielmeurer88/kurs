
/**
 * you can determine what the dog is going to do in the respective round
 * @param {integer} round - the current round
 * @param {object} dog - the instance of the Dog
 * @returns {undefined}
 */
function DoggyRound(round, dog,){
    // add code here
	
	dog.Rest();
    
    var lastType = "Nobody";
    var lastPos = 0;
        
    var en = dog.GetEnergy();
    var hu = dog.GetHunger();
    var th = dog.GetThirst();
    
    var target = dog.Check();
    var type = target.GetType();
    var pos = target.GetPosition();
    
    var comming = target.IsComming();
    
    // Start
    

    
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