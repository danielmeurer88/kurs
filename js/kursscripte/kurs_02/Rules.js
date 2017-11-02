

var Rules = {};
Rules.CharacterLabels = ["Nothing", "SmallChild", "TallChild", "Thief"];
Rules.CharacterChances = [30, 27, 25, 18];
Rules.ExtendCreation = [3,5];

Rules.Dog = {};
Rules.Dog.Energy = {
        Barking : 3,
        Growling : 5,
        Thirsty : 2,
        Hungry : 1,
        Resting: 8
};  
Rules.Dog.EatingIncrease = 8;
Rules.Dog.DrinkingIncrease = 8;
Rules.Dog.HungerDecrease = 3;
Rules.Dog.HungerThreshold = 15;
Rules.Dog.ThirstDecrease = 4;
Rules.Dog.ThirstThreshold = 20;

Rules.Person = {};
Rules.Person.SmallChild = {
    Nerves : [1,3],
    ActionLabels : ["play", "feed"],
    ActionChances : [3,7],
    EnergyPlay : [10,15],
    EnergyFeed : [4, 10],
    FeedingLabels : ["food", "water"],
    FeedingChances : [5,5]
};

Rules.Person.TallChild = {
    Nerves : [2,4],
    ActionLabels : ["play", "steal"],
    ActionChances : [3,1],
    EnergyPlay : [5,10],
    GoldSteal : [10, 60]
};
Rules.Person.Thief = {
    Nerves : [3,6],
    Stealings : [1,4],
    GoldSteal : [30, 80]
};

Rules.Chest = {};
Rules.Chest.StartAmount = 250;