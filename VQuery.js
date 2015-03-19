/**
 * Created by lenovo on 2015/3/17.
 */
/**
 * Created by lenovo on 2015/3/17.
 */

/**
 * 绑定事件
 * @param obj
 * @param sEv
 * @param fn
 */
function myAddEvent(obj,sEv,fn){
    //IE下会导致this被改成window,使用call
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,fn);
    }else{
        obj.addEventListener(sEv,fn,false);
    }
}

/**
 * 获取父级下面的指定的class元素
 * @param oParent
 * @param sClass
 * @returns {Array}
 */
function getByClass(oParent,sClass){
    var aEle = oParent.getElementsByTagName("*");
    var aResult = [];
    var i = 0 ;
    for(i = 0 ; i<aEle.length ; i++){
        if(aEle[i].className == sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

//获取对象样式
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
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
                case '#':   //id
                    var obj = document.getElementById(vArg.substring(1))
                    this.elements.push(obj);
                    break;
                case '.':   //class
                    this.elements = getByClass(document,vArg.substring(1));
                    break;
                default :   //tagName
                    this.elements = document.getElementsByTagName(vArg);
            }
            break;
        case 'object' :
            this.elements.push(vArg);
    }
}

/**
 * 单击事件
 * @param fn
 */
VQuery.prototype.click = function(fn){
    var i = 0 ;
    for(i = 0; i<this.elements.length;i++){
        myAddEvent(this.elements[i],"click",fn);
    }
}


VQuery.prototype.show = function(){
    var i = 0 ;
    for(i = 0; i<this.elements.length;i++){
        this.elements[i].style.display = "block";
    }
}

VQuery.prototype.hide = function(){
    var i = 0 ;
    for(i = 0; i<this.elements.length;i++){
        this.elements[i].style.display = "none";
    }
}


VQuery.prototype.hover = function(fnOver,fnOut){
    var i = 0 ;
    for(i = 0; i<this.elements.length;i++){
        myAddEvent(this.elements[i],"mouseover",fnOver);
        myAddEvent(this.elements[i],"mouseout",fnOut);
    }
}


VQuery.prototype.css = function(attr , value){
    if(arguments.length == 2){  //设置样式
        var i = 0 ;
        for(i = 0; i<this.elements.length;i++){
            this.elements[i].style[attr] = value;
        }
    }else{
            return getStyle(this.elements[0],attr);
    }
}

function $(vArg){
    return new VQuery(vArg);
}

