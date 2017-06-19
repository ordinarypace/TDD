const Aop = {
    around(fnName, advice, fnObj){
        let originalFn = fnObj[fnName];

        fnObj[fnName] = () => {
            let targetContext = {};
            advice.call(targetContext, { fn : originalFn });
        }
    }
}

export default Aop;
