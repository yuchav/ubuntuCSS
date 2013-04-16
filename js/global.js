window.onload = function(){
	var GLOBAL = {};
	
	//获取DOM节点
	var oWindow = document.getElementById('window');
	var openFolder = document.getElementById('openFolder');
	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	var oWindowClose = oWindow.getElementsByClassName('close')[0];
	var oWindowLogin = document.getElementById('window-login');
	var oLoginWindow = document.getElementById('login-window')
	
	/*添加事件*/
	addEvent(window,'resize',resizeWindow);
	addEvent(openFolder,'click',popWindow);
	addEvent(oWindowClose,'click',closeWindow);
	addEvent(oWindowLogin,'click',closeLoginWindow);
	
	
	function popWindow(){
		oWindow.style.display = 'block';
		oWindow.style.left = (clientWidth-oWindow.offsetWidth)/2 + 'px';
		oWindow.style.top = (clientHeight-oWindow.offsetHeight)/2 + 'px';
	}
	function closeWindow(){
		oWindow.style.display = 'none';
	}
	function closeLoginWindow(){
		oLoginWindow.style.display = 'none';
	}
	function resizeWindow(){
		clientHeight = document.documentElement.clientHeight;
		clientWidth = document.documentElement.clientWidth;
	}
	
	//windowTitle拖拽
	var oWindowTitle = document.getElementById('windowTitleMod');
	var oWindowControl = oWindow.getElementsByClassName('window-main-control')[0];
	
	oWindowTitle.onmousedown = function(ev){
		var oEvent = ev || event;
		var disX = oEvent.clientX - oWindow.offsetLeft;
		var disY = oEvent.clientY - oWindow.offsetTop;
		oWindow.style.opacity = '0.9';
		oWindowTitle.style.cursor = 'move';
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			oWindow.style.left = oEvent.clientX - disX + 'px';
			oWindow.style.top = oEvent.clientY - disY + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oWindow.style.opacity = '1.0';
			oWindowTitle.style.cursor = '';
		}
		return false;
	}
	//window Resize
	var oResize = oWindow.getElementsByClassName('drag-right-bottom-bar')[0];
	var iWindowMinWidth = 495;
	var iWindowMinHeight = 300;
	oResize.onmousedown = function(ev){
		var oEvent = ev || event;
		//鼠标点离窗口左的距离
		var disX = oEvent.clientX - oWindow.offsetLeft;
		var disY = oEvent.clientY - oWindow.offsetTop;
		console.log(disX + '==' + disY);
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			if(oEvent.clientX - oWindow.offsetLeft + oResize.offsetWidth < iWindowMinWidth){
				oWindow.style.width = iWindowMinWidth + 'px';
			}else{
				oWindow.style.width = oEvent.clientX - oWindow.offsetLeft + (oResize.offsetWidth)/2 + 'px';
				oWindow.style.height = oEvent.clientY - oWindow.offsetTop + (oResize.offsetHeight)/2 + 'px';
			}
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}	
		return false;
	}
	/*function添加事件*/
	function addEvent(obj,sEvent,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEvent,fn,false);
		}else{
			obj.attachEvent('on'+sEvent,fn);
		}
	}
}