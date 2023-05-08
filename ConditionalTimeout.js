// This code overrides default setTimeout() function so that
// callback is immediately executed when a certain duration
// value is provided

const originalSetTimeout = window.setTimeout;

function overrideSetTimeout () {
    //Timeout will not be used when following duration is provided
    //callback is executed immediately
    const DURATION_TO_IGNORE = 2000;
    
    function newSetTimeout(callback, duration) {
        console.log(`${new Date()}: Callback received`);

        //Callback is executed with this context
        const currentContext = this;

        //Arguments after duration are passed to callback
        const callbackArguments = [];

        for(var i = 2; i < arguments.length; i++) {
            callbackArguments.push(arguments[i]);
        }
    
        if(duration === DURATION_TO_IGNORE) {
            duration = 0;
            //setTimeout is still called with duration 0
            //This is to make sure that callback is put on event loop.
            //Just as it would have been done if duration was not zero.
        }
    
        originalSetTimeout(() => {
            console.log(`${new Date()}: Executing callback`);
            callback.apply(currentContext, callbackArguments);
        }, duration);
    }
    
    //Overwriting original setTimeout with new one
    window.setTimeout = newSetTimeout;
}

overrideSetTimeout();