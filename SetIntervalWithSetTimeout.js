// Following code overrides default setInterval() with an implementation based on setTimeout

const originalSetInterval = window.setInterval;
const originalClearInterval = window.clearInterval;

function overrideIntervals() {
    const intervalIds = [];

    function newSetInterval (callback, duration) {
        intervalIds.push(true);

        const intervalId = intervalIds.length;

        //Callback is executed with this context
        const currentContext = this;

        const allArguments = [];
        
        for (var i = 0; i < arguments.length; i++) {
            allArguments.push(arguments[i]);
        }
        
        //Arguments after duration are passed to callback
        const callbackArguments = allArguments.slice(2);
        
        function newMethod(callback, duration) {
            
            if (intervalIds[intervalId - 1]) {
                setTimeout(() => {
                    if (intervalIds[intervalId - 1]) {
                        callback.apply(currentContext, callbackArguments);

                        newMethod.apply(currentContext, allArguments);
                    }
                }, duration);
            }
        }

        newMethod.apply(currentContext, allArguments);

        return intervalId;
    };

    function newClearInterval(intervalId) {
        intervalIds[intervalId - 1] = false;
    }

    window.setInterval = newSetInterval;
    window.clearInterval = newClearInterval;
}

overrideIntervals();