const calculateUpgradeMileages = (tripMileages, memberMultiplier) => {
    let upgradeMileage = [];
    let i = 0;

    for(; i < tripMileages.length; i += 1){
        let calcRewardsMiles = (mileage) => {
            return mileage * memberMultiplier;
        }

        upgradeMileage[i] = calcRewardsMiles(tripMileages[i]);
    };

    return upgradeMileage;
};

export default calculateUpgradeMileages;
