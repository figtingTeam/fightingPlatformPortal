/**
 * 用法：toast.pop('Hello!'); 默认显示3秒后隐藏
 * toast.pop('Hello!', 5000); 自定义显示5s隐藏
 */
var toast = (function() {
	var TOAST_ANIMATION_SPEED = 400; 
	var defaults = {
		SHOW: {
			'-webkit-transition': 'opacity ' + TOAST_ANIMATION_SPEED + 'ms, -webkit-transform ' + TOAST_ANIMATION_SPEED + 'ms',
			'transition': 'opacity ' + TOAST_ANIMATION_SPEED + 'ms, transform ' + TOAST_ANIMATION_SPEED + 'ms',
			'opacity': '1', 
		},
		HIDE: {
			'opacity': '0',
			'-webkit-transform': 'translateY(150%) translateZ(0)',
			'transform': 'translateY(150%) translateZ(0)'
		},
		STYLE: {
			'background': 'rgba(0, 0, 0, .85)',
			'box-shadow': '0 0 10px rgba(0, 0, 0, .8)',
			'border-radius': '3px',
			'z-index': '99999',
			'color': 'rgba(255, 255, 255, .9)',
			'max-width': '90%',
			'height': '40px',
                        'line-height': '40px',
			'word-break': 'keep-all',
			'margin': 'auto',
			'text-align': 'center',
			'position': 'absolute',
			'left': '0',
			'right': '0',
			'bottom': '0',
			'top': '0',
			'opacity': '0'
		},
		DURATION: 3000,
		timeout: [],
		popNum: 0
	}
	function popToast(text, time) {
		createToast(text, time);
	}
	function createToast(text, time) {
		//创建
		var toastStage = document.createElement('div');
		if(typeof text === 'string') {
			text = document.createTextNode(text);
		}
		toastStage.appendChild(text);
		stylize(toastStage, defaults.STYLE);
		document.body.insertBefore(toastStage, document.body.firstChild);
		stylize(toastStage, defaults.SHOW);
		defaults.popNum ++;
		//隐藏及销毁
		var duration = defaults.DURATION;
		if(typeof time !== "undefined") {
			duration = time;
		}
		defaults.timeout.push(setTimeout(_hide(toastStage), duration));
	}
	function stylize(element, styles) {
		Object.keys(styles).forEach(function(style) {
			element.style[style] = styles[style];
		});
	}
	function hide(toastStage) {
		stylize(toastStage, defaults.HIDE);
		destroy(toastStage);
	}
	function _hide(toastStage) {
		return function(){
			hide(toastStage);
		}
	}
	function destroy(toastStage) {
		document.body.removeChild(toastStage);
		defaults.popNum --;
		if(defaults.popNum == 0) {
			for(var i = 0; i < defaults.timeout.length; i ++) {
				clearTimeout(defaults.timeout[i]);
			}
			defaults.timeout = []; 
		}
	}

	return {
		pop: popToast
	}
})();