/* globals apex,$ */
window.SCROLLPROGRESSBAR = window.SCROLLPROGRESSBAR || {};

//Execute script
SCROLLPROGRESSBAR.main = function(pData,init) {

    //Default values
    var item$ = $(pData.parent);

    //Init pData
    if (init && typeof init == 'function') init.call(this, pData);

    //Initialize Progress Bar
    var np = new NProgress();

    np.configure(pData);

    //Create Item
    apex.item.create(pData.itemName, { 
        getValue: function () {
            return np.status;
        },
        setValue: function (value) {
            np.set(value);
        },
        hide: function () {
            item$.css("display","none");
        },
        show: function () {
            item$.css("display","inline-block");
        },
        successMessageOnCompleted: function (pMessage) {
            apex.message.showPageSuccess(pMessage);
        }
    });

    //Initialize Scroll Bar
    const progressObserver = new ScrollProgress((x, y) => {

        //variables
        var valX = Math.abs(x);
        var valY = Math.abs(y);
        
        //setting values accordingly to the configuration
        if (pData.scrollDirection === 'TB') {
            np.set(valY);
            SCROLLPROGRESSBAR.handleEvent(valY,pData.parent);
        }
        else if (pData.scrollDirection === 'LR') {
            np.set(valX);
            SCROLLPROGRESSBAR.handleEvent(valX,pData.parent);
        }
        else if (pData.scrollDirection === 'RL') {
            var rlVal = Math.abs(valX - 1);
            np.set(rlVal);
            SCROLLPROGRESSBAR.handleEvent(rlVal,pData.parent);
        }
        else {
            var btVal = Math.abs(valY - 1);
            np.set(btVal);
            SCROLLPROGRESSBAR.handleEvent(btVal,pData.parent);
        }

    }, pData.calcScrollingFrom);

    //Recalc width if the Scrollbar is vertical
    if (['TB','BT'].includes(pData.progressBarDirection)) {
        var barHeight = item$.parents('.container').height();
        item$.width(barHeight);
    }
}

SCROLLPROGRESSBAR.handleEvent = function(pValue,pItem) {
    if(pValue === 0) {
        apex.event.trigger('#' + pItem, 'apex-scroll-progress-bar-on-start');
    }
    else if (pValue > 0 && pValue < 1) {
        apex.event.trigger('#' + pItem, 'apex-scroll-progress-bar-on-progress');
    }
    else {
        apex.event.trigger('#' + pItem, 'apex-scroll-progress-bar-on-completed');
    }
}