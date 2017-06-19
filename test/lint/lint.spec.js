import calculateUpgradeMileages from '../../src/lint/lint';

describe('calculateUpgradeMileages, memberMultiplier', () => {
    let testPassenger = null;

    beforeEach(() => {
        testPassenger = {
            firstName : '일옹',
            lastName : '이',
            tripMileages : [
                500,
                600,
                3400,
                2500
            ]
        }
    });

    it('배율이 1.0이면 원래 마일리지를 반환한다.', () => {
        expect(calculateUpgradeMileages(testPassenger.tripMileages, 1.0)).toEqual(testPassenger.tripMileages);
    });

    it('배율이 3.0이면 해당 마일리지를 계산하여 반환한다.', () => {
        let expectedResults = [];
        let multiplier = 3.0;
        let i = 0;

        for(; i < testPassenger.tripMileages.length; i += 1){
            expectedResults[i] = testPassenger.tripMileages[i] * multiplier;
        }

        expect(calculateUpgradeMileages(testPassenger.tripMileages, multiplier)).toEqual(expectedResults);
    });
});
