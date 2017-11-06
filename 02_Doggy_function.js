
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

/**
 * you can determine what the dog is going to do in the respective round
 * @param {integer} round - the current round
 * @param {object} dog - the instance of the Dog
 * @returns {undefined}
 */
function DoggyRound(round, dog,){
    // add code here
	
}