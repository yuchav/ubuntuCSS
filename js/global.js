window.onload = function(){
	var GLOBAL = {};
	/*function添加事件*/
	function addEvent(obj,sEvent,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEvent,fn,false);
		}else{
			obj.attachEvent('on'+sEvent,fn);
		}
	}
}