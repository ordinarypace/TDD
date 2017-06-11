export default class DI{
    constructor(){
        if(!(this instanceof DI)){
            return new DI();
        }
        this.registrations = [];
    }

    register(name, dependencies, fn){
        let i = 0;

        if(typeof name !== 'string' || !Array.isArray(dependencies) || typeof fn !== 'function'){
            this.throwError();
        }

        for(; i < dependencies.length; ++i){
            if(typeof dependencies[i] !== 'string'){
                this.throwError();
            }
        }

        this.registrations[name] = {
            dependencies : dependencies,
            fn : fn
        }
    }

    get(name){
        let registration = this.registrations[name];
        let dependencies = [];

        if(registration === undefined){
            return undefined;
        }

        registration.dependencies.forEach((dependencyName) => {
            let dependency = this.get(dependencyName);
            dependencies.push(dependency === undefined ? undefined : dependency);
        })
        return registration.fn.apply(undefined, dependencies);
    }

    message(){
        return {registerRequiresArgs : '이 생성자 함수는 인자가 3개 있어야 합니다.'}
    }

    throwError(){
        throw new Error(this.message().registerRequiresArgs);
    }
}
