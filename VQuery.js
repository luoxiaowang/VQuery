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
        obj.attachEvent('on'+sEv,function(){
            //阻止默认事件,阻止冒泡
            if(false == fn.call(obj)){
                event.cancelBubble = true;
                return false;
            }
        });
    }else{
        obj.addEventListener(sEv,function(ev){
            //阻止默认事件，阻止冒泡
            if(false == fn.call(obj)){
                ev.cancelBubble = true;
               ev.preventDefault();
            }
        },false);
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
        if(typeof attr == 'string'){
            return getStyle(this.elements[0],attr);
        }else{
            //如果是json对象值
            for(i = 0 ;i<this.elements.length;i++){
                var k='';
                for(k in attr){
                    this.elements[i].style[k] = attr[k];
                }
            }
        }
    }
    //为了链式操作
    return this;
}


VQuery.prototype.toggle = function(){
    var i  = 0;
    var _arguments = arguments;
    for(i = 0 ; i < this.elements.length ; i++){
        addToggle(this.elements[i]);
    }

    function addToggle(obj){
        var count = 0 ;
        myAddEvent(obj,'click',function(){
            _arguments[count++%_arguments.length].call(obj);
        });
    }
}

VQuery.prototype.attr = function(attr,value){
    if(arguments.length == 2){
        var i = 0;
        for(i = 0; i<this.elements.length;i++){
            this.elements[i][attr] = value;
        }
    }else{
        return this.elements[0][attr];
    }
}


VQuery.prototype.eq = function(n){
    return $(this.elements[n]);
}


function appendArr(arr1,arr2){
    var i = 0;
    for(i = 0 ; i<arr2.length ; i++){
        arr1.push(arr2[i]);
    }
}

VQuery.prototype.find = function(str){
    var i = 0;
    var aResult = [];
    for(i = 0 ; i < this.elements.length ; i++ ){
        switch (str.charAt(0)){
            case "." :
                var aEle = getByClass(this.elements[i],str.substring(1));
                aResult = aResult.concat(aEle);
                break;
            default :
                var aEle = this.elements[i].getElementsByTagName(str);  //返回的并非一个数组，而是一个HtmlCollection
                /*aResult = aResult.concat(aEle);*/
                appendArr(aResult , aEle);

        }
    }

    var newVquery = $();
    newVquery.elements=aResult;
    return newVquery;
 }

function getIndex(obj){
    var aBrother = obj.parentNode.children;
    var i = 0;
    for(i = 0 ; i<aBrother.length ; i++){
        if(aBrother[i]==obj){
            return i;
        }
    }
}

VQuery.prototype.index = function(){
    return getIndex(this.elements[0]);
}

VQuery.prototype.bind = function (sEv,fn) {
    var i = 0;
    for(i = 0 ; i<this.elements.length ; i++){
        myAddEvent(this.elements[i],sEv,fn);
    }
}


VQuery.prototype.extend = function (name,fn) {
    VQuery.prototype[name] = fn;
}

function $(vArg){
    return new VQuery(vArg);
}

