import Aop from '../../src/AOP/aop';

describe('Aop', () => {
    describe('Aop.around(fnName, advice, fnObj)', () => {
        let targetObj;
        let executionPoints;

        beforeEach(() => {
            targetObj = {
                targetFn(){
                    executionPoints.push('targetFn');
                }
            };

            executionPoints = [];
        });

        it('Target 함수를 호출 시 어드바이스를 실행하도록 한다.', () => { 
            let executedAdvice = false;
            let advice = () => {
                executedAdvice = true;
            }
            Aop.around('targetFn', advice, targetObj);
            targetObj.targetFn();
            expect(executedAdvice).toBe(true);
        });

        it('어드바이스가 Target 호출을 wrapping 한다.', () => {
            var wrappingAdvice = (targetInfo) => {
                executionPoints.push('wrappingAdvice - 처음');
                targetInfo.fn();
                executionPoints.push('wrappingAdvice - 끝');
            };

            Aop.around('targetFn', wrappingAdvice, targetObj);
            targetObj.targetFn();
            expect(executionPoints).toEqual(['wrappingAdvice - 처음', 'targetFn', 'wrappingAdvice - 끝']);
        });
    });
});
