/**
 * Created by lenovo on 2015/3/17.
 */
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
    //用了保存选中的元素
    this.elements = [];
    switch (typeof vArg){
        case 'function' :
            myAddEvent(window,'load',vArg);
            break;
        case 'string' :
            switch (vArg.charAt(0)){
                case '#':
                    var obj = document.getElementById(vArg.substring(1))
                    this.elements.push(obj);
                    break;
                case '.':
                    break;
                default :
            }
            break
    }
}