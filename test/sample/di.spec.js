import DI from '../../src/sample/di';

describe('DI', () => {
    let container;

    beforeEach(() => {
        container = new DI();
    });

    describe('register(name, dependencies, fn)', () => {
        it('인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다.', () => {
            let badArgs = [
                [],
                ['Name'],
                ['Name', ['dependency1', 'dependency2']],
                ['Name', function(){}],
                [1, ['a', 'b'], function(){}],
                ['Name', [1, 2], function(){}],
                ['Name', ['a', 'b'], 'should be a function']
            ];

            badArgs.forEach(args => {
                expect(() => {
                    container.register.apply(container, args);
                }).toThrow();
            });
        });
    });

    describe('get(name)', () => {
        it('이름이 등록되어 있지 않으면 undefined를 반환한다.', () => {
            expect(container.get('notDefine')).toBeUndefined();
        });

        it('등록된 함수를 실행한 결과를 반환한다.', () => {
            let name = 'MyName';
            let returnFromRegisteredFunction = "somthing";

            container.register(name, [], () => {
                return returnFromRegisteredFunction;
            });

            expect(container.get(name)).toBe(returnFromRegisteredFunction);
        });

        it('등록된 함수에 의존성을 제공한다.', () => {
            let main = 'main';
            let mainFn;
            let dep1 = 'dep1';
            let dep2 = 'dep2';

            container.register(main, [dep1, dep2], (dep1Fn, dep2Fn) => {
                return () => {
                    return dep1Fn() + dep2Fn();
                };
            });

            container.register(dep1, [], () => {
                return () => {
                    return 1;
                };
            });

            container.register(dep2, [], () => {
                return () => {
                    return 2;
                }
            });

            mainFn = container.get(main);
            expect(mainFn()).toBe(3);
        });
    });
})
