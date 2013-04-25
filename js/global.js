var GLOBAL = {};
GLOBAL.addEvent = function(obj,sEvent,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEvent,fn,false);
	}else{
		obj.attachEvent('on'+sEvent,fn);
	}
	//此处最好this转向
};

GLOBAL.removeEvent = function(){};

GLOBAL.getByClass = function(sClassName,oParent){
	var oParent = oParent || document;
	var aTemp = oParent.getElementsByTagName('*');
	var arr = [];
	var i = 0;
	for(i=0;i<aTemp.length;i++){
		if(aTemp[i].className.indexOf(sClassName) !== -1){
			arr.push(aTemp[i]);
		}
	}
	return arr;
};
GLOBAL.addClass = function(){};
GLOBAL.removeClass = function(){};
GLOBAL.css = function(){};
GLOBAL.cookie = function(){};
GLOBAL.ajax = function(){};
GLOBAL.drag = function(){};
GLOBAL.animate = function(){};
GLOBAL.extend = function(){};
/*生成随机数*/
GLOBAL.generateRandom = function(lowCount,upperCount){
	var l = upperCount-lowCount+1;
	return Math.floor(Math.random()*l + lowCount);
}
