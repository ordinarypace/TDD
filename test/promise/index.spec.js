import promiseTest from '../../src/promise';

describe('fetchCurrentTemperature', () => {
    let temperaturePromise;
    let promiseHelper;

    beforeEach(() => {
        let fetchPromise = new Promise((resolve, reject) => {
            promiseHelper = {
                resolve : resolve,
                reject : reject
            }
        });

        spyOn(window, 'fetch').and.returnValue(fetchPromise);
        temperaturePromise = WeatherService.fetchCurrentTemperature();
    });

    it('fetches from the weather API', () => {
        expect(window.fetch).toHaveBeenCalledWith('someweatherapi.com');
    });

    it('returns a promise', () => {
        expect(temperaturePromise).toEqual(jasmine.any(Promise));
    });

    describe('on successful fetch', () => {
        beforeEach(() => {
            let response = new Response(JSON.Stringify({temperature : 78}));
            promiseHelper.resolve(response)
        });

        it('resolves its promise with the current temperature', (done) =>{
            temperaturePromise.then((temperature) => {
                expect(temperature).toEqual(78);
                done();
            })
        });
    });

    describe('on unsuccessful fetch', () => {
        let reject = { msg : 'failed!' };

        beforeEach(() => {
            promiseHelper.reject(reject);
        });

        it('resolves its promise with the current temperature', (done) =>{
            temperaturePromise.then((error) => {
                expect(error).toEqual(reject);
                done();
            });
        });
    });
});
