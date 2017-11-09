

var Rules = {};
Rules.Version = "0.8.5";
Rules.CharacterLabels = ["Nothing", "Child", "Teenager", "Thief"];
Rules.CharacterChances = [25, 20, 30, 25];
Rules.StartCreation = [2,4];
Rules.ExtendCreation = [2,4];

Rules.FirstActionWhenInBetweenLabels = ["distracted", "not"];
Rules.FirstActionWhenInBetweenChances = [8,2];

Rules.Dog = {};
Rules.Dog.Energy = {
        Barking : 5,
        Growling : 7,
        Thirsty : 3,
        Hungry : 2,
        Resting: 8
};  
Rules.Dog.EatingIncrease = 7;
Rules.Dog.DrinkingIncrease = 6;
Rules.Dog.EnergyThreshold = 15;
Rules.Dog.EnergyWarning = Rules.Dog.EnergyThreshold + (100 - Rules.Dog.EnergyThreshold) / 2;
Rules.Dog.HungerDecrease = 3;
Rules.Dog.HungerThreshold = 15;
Rules.Dog.HungerWarning = Rules.Dog.HungerThreshold + (100 - Rules.Dog.HungerThreshold) / 2;
Rules.Dog.ThirstDecrease = 4;
Rules.Dog.ThirstThreshold = 20;
Rules.Dog.ThirstWarning = Rules.Dog.ThirstThreshold + (100 - Rules.Dog.ThirstThreshold) / 2;

Rules.Person = {};
Rules.Person.Child = {
    Nerves : [2,5],
    ActionLabels : ["play", "feed"],
    ActionChances : [3,7],
    EnergyPlay : [10,15],
    EnergyFeed : [4, 10],
    FeedingLabels : ["food", "water"],
    FeedingChances : [5,5]
};

Rules.Person.Teenager = {
    Nerves : [5,8],
    ActionLabels : ["play", "steal"],
    ActionChances : [3,1],
    EnergyPlay : [5,10],
    GoldSteal : [15, 70]
};
Rules.Person.Thief = {
    Nerves : [6,16],
    Stealings : [1,4],
    GoldSteal : [40, 100]
};

Rules.Chest = {};
Rules.Chest.StartAmount = 250;