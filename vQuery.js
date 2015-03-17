/**
 * Created by lenovo on 2015/3/17.
 */

function myAddEvent(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,fn);
    }else{
        obj.addEventListener(sEv,fn,false);
    }
}

function VQuery(vArg){
    switch (typeof vArg){
        case 'function' :
            myAddEvent(window,'load',vArg);
            break;
    }
}