/*!
 * iPhone4 on CSS3
 * tjrus.com/iphone
 * Download by http://www.codefans.net
 * Copyright (c) 2011 Vasil Zubach
 *
 * Author	Vasil Zubach 
 */
 
 var TIME = 400;
var letters_interval;

$(document).ready(function(){

	iphone.init();	

});


iphone = {
	
	slide_started 		: false,
	letter_animate_time 	: 50,
	panels_animate_time	: 400,
	status 			: 'lock',	// lock, unlock, call, answer, off
	voice_off			: true,	// true, false
	voice				: 5, 		// 0 >= voice <= 10
	iconsDefaultPosition	: {},
	iconsOutPosition		: {},

	/* init iPhone functions */
	init : function(){

		$("#iphone_slider").draggable({
			containment: 'parent',
			axis: 'x',
			start: function(event, ui) {
				$(document).mousemove(function(){				
					if(iphone.slide_started){
						var left = $("#iphone_slider").css('left').substring(0, $("#iphone_slider").css('left').length - 2);
						var width = $('#iphone_unlock').width() - $('#iphone_slider').width();
						var opacity_k = (width - left*3) / (width);
						$('#iphone_slide2unlock').css({'opacity': opacity_k}, TIME/2);
					}
				});
			},
			stop: function(event, ui){
				$(document).unbind('mousemove');
			}
		});
		
		$("#iphone_slider").mousedown(function(){
			iphone.slide_started = true;
		});
		
		$(document).mouseup(function(){
			if (iphone.slide_started){
				iphone.endSlide();
				iphone.slide_started = false;
			}
		});

		$('#iphone_home_button').click(function(){
			if(iphone.status == 'off'){
				iphone.turnOn();
			}
		});

		iphone.prepareTextAnimate();
		
		iphone.startTextAnimate();
		
		iphone.prepareIcons();
		
		$('#iphone_power_button').click(function(){
			switch(iphone.status){
				case 'off':
					iphone.turnOn();
					break;

				case 'lock':
					iphone.turnOff();
					break;

				case 'unlock':
					iphone.turnOff();
					break;
			}
		});
		
		iphone.timeUpdate();
		
		switch(iphone.status){
			case 'off':
				iphone.turnOff();
				break;

			case 'lock':
				iphone.lock();
				break;

			case 'unlock':
				iphone.unlock();
				break;
		}
	},


	/* function unlocks iPhone or back slider to start */
	endSlide : function(){
		var slider_left = $("#iphone_slider").css('left');
		if ( slider_left.substring(0, slider_left.length - 2) > ($('#iphone_unlock').width() - $('#iphone_slider').width() - 10)) {
			iphone.unlock();
		} else {
			var time_k = slider_left.substring(0, slider_left.length - 2) / ($('#iphone_unlock').width() - $('#iphone_slider').width() - 10);
			$('#iphone_slider').animate({'left': '0'}, (TIME * time_k) * 2 / 3);
			$('#iphone_slide2unlock').stop().animate({'opacity': '1'}, (TIME * time_k) * 2 / 3);
		}
	},

	turnOn : function(){
		if (iphone.status != 'off') 
			return;
	
		iphone.status = 'lock';

		$('.iphone_display').removeClass('off');
		
		$('#iphone_headline').children('.iphone_lock').show();
		$('#iphone_headline_clock').hide();
		
		$('#iphone_slider').css({'left': '0'});
		$('#iphone_slide2unlock').css({'opacity': '1'});
				
		$('#iphone_headline').css({'top':'0'});
		$('#iphone_lock_header').css({'top':'20px'});
		$('#iphone_lock_footer').css({'bottom':'0'});
		
		$('#iphone_dock').css({'bottom': '-80px'});
		
		iphone.hideIcons();

		iphone.updateStatus();
	},
	
	turnOff : function(){

		iphone.status = 'off';
		
		$('.iphone_display').addClass('off');
				
		$('#iphone_headline').css({'top':'-20px'});
		$('#iphone_lock_header').css({'top':'-113px'});
		$('#iphone_lock_footer').css({'bottom':'-97px'});
		
		$('#iphone_dock').css({'bottom': '-80px'});
		
		iphone.hideIcons();

		iphone.updateStatus();
	},
	
	lock : function(){
		
		iphone.status = 'lock';

		$('.iphone_display').removeClass('off');

		$('#iphone_headline').children('.iphone_lock').show();
		$('#iphone_headline_clock').hide();
		
		$('#iphone_slider').css({'left': '0'});
		$('#iphone_slide2unlock').css({'opacity': '1'});
				
		$('#iphone_headline').stop().animate({'top':'0'}, iphone.panels_animate_time);
		$('#iphone_lock_header').stop().animate({'top':'20'}, iphone.panels_animate_time);
		$('#iphone_lock_footer').stop().animate({'bottom':'0'}, iphone.panels_animate_time);
		
		$('#iphone_dock').stop().animate({'bottom': '-80'}, iphone.panels_animate_time);
		
		iphone.animateHideIcons();

		iphone.updateStatus();
	},
	
	unlock : function(){
		
		iphone.status = 'unlock';

		$('.iphone_display').removeClass('off');
		
		$('#iphone_headline').animate({'top':'0'}, iphone.panels_animate_time);
		$('#iphone_headline').children('.iphone_lock').hide();
		$('#iphone_headline_clock').show();
		
		$('#iphone_lock_header').animate({'top':'-113'}, iphone.panels_animate_time);
		$('#iphone_lock_footer').animate({'bottom':'-97'}, iphone.panels_animate_time);

		$('#iphone_dock').stop().animate({'bottom': '4'}, iphone.panels_animate_time);
		
		iphone.showIcons();

		iphone.updateStatus();
	},


	showIcons : function(){
		var icons = $('#iphone_icons_containter').children('.icon');
		for( var i = 0; i< icons.length; i++ ){
			$(icons[ i ]).stop().animate({'left' : iphone.iconsDefaultPosition[ i ][ 'left' ] , 'top': iphone.iconsDefaultPosition[ i ][ 'top' ]} , iphone.panels_animate_time);
		}
	},

	hideIcons : function(){
		var icons = $('#iphone_icons_containter').children('.icon');
		for( var i = 0; i< icons.length; i++ ){
			$(icons[ i ]).css({'left' : iphone.iconsOutPosition[ i ][ 'left' ] , 'top': iphone.iconsOutPosition[ i ][ 'top' ]});
		}
	},

	animateHideIcons : function(){
		var icons = $('#iphone_icons_containter').children('.icon');
		for( var i = 0; i< icons.length; i++ ){
			$(icons[ i ]).stop().animate({'left' : iphone.iconsOutPosition[ i ][ 'left' ] , 'top': iphone.iconsOutPosition[ i ][ 'top' ]}, iphone.panels_animate_time);
		}
	},

	prepareIcons : function(){
		var icons = $('#iphone_icons_containter').children('.icon');
		for( var i = 0; i< icons.length; i++ ){
			iphone.iconsDefaultPosition[ i ] = {};
			iphone.iconsOutPosition[ i ] = {};

			var tmp_left = $(icons[ i ]).css('left');
			tmp_left = tmp_left.replace(new RegExp("px",'g'),"");

			var tmp_top = $(icons[ i ]).css('top');
			tmp_top = tmp_top.replace(new RegExp("px",'g'),"");

			iphone.iconsDefaultPosition[ i ][ 'left' ] = parseInt(tmp_left);
			iphone.iconsDefaultPosition[ i ][ 'top' ] = parseInt(tmp_top);
			

			if (i == 0 || i == 1 || i == 4 || i == 5 ){
					iphone.iconsOutPosition[ i ][ 'left' ] = parseInt(tmp_left) - 200;
					iphone.iconsOutPosition[ i ][ 'top' ] = parseInt(tmp_top) - 200;
			}

			if (i == 2 || i == 3 || i == 6 || i == 7 ){
					iphone.iconsOutPosition[ i ][ 'left' ] = parseInt(tmp_left) + 200;
					iphone.iconsOutPosition[ i ][ 'top' ] = parseInt(tmp_top) - 200;
			}

			if (i == 8 || i == 9 || i == 12 || i == 13 ){
					iphone.iconsOutPosition[ i ][ 'left' ] = parseInt(tmp_left) - 200;
					iphone.iconsOutPosition[ i ][ 'top' ] = parseInt(tmp_top) + 200;
			}

			if (i == 10 || i == 11 || i == 14 || i == 15 ){
			
					iphone.iconsOutPosition[ i ][ 'left' ] = parseInt(tmp_left) + 200;
					iphone.iconsOutPosition[ i ][ 'top' ] = parseInt(tmp_top) + 200;
			}
			
			
			$(icons[ i ]).css({'left' : iphone.iconsOutPosition[ i ][ 'left' ] , 'top': iphone.iconsOutPosition[ i ][ 'top' ]});
		}
	},

	updateStatus : function(){
		var set_status = (iphone.status == 'off') ? 'turned off' : (iphone.status == 'lock') ? 'turned on and locked' : 'turned on and unlocked';
		$('#current_status').html(set_status);
	},

	/* update time on header line and iPhone header*/	
	timeUpdate : function(){
		var date = new Date();
		var week_days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
		var year_month = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
		var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
		$('#iphone_lock_time').html(hours + '<span>:</span>' + minutes);
		$('#iphone_headline_clock').html(hours + ':' + minutes);
		$('#iphone_lock_date').html(week_days[date.getDay()] + ', ' + year_month[date.getMonth()] + ' ' + date.getDate());
		
		$('#iphone_icon_day').html(week_days[date.getDay()]);
		$('#iphone_icon_day_num').html(date.getDate());
	
		setTimeout("iphone.timeUpdate()", (1000 * (60 - date.getSeconds())));
	},
	
	stopTextAnimate : function(){
		clearInterval(letters_interval);
	},
	
	startTextAnimate : function(){
		iphone.animateLetters();
	},
	
	prepareTextAnimate : function () {
		var start_text = $('#iphone_slide2unlock').html();
		var end_text = '';
		for(var i = 0; i< start_text.length; i++){
			end_text += '<span style="opacity:0.3">' + start_text.charAt(i) + '</span>';
		}
		$('#iphone_slide2unlock').html(end_text);
		
		var spans = $('#iphone_slide2unlock').children('span');
		for (var i = 0; i < spans.length; i++){
			$(spans[ i ]).attr('id', 'spans_'+i);
		}
	},
	
	animateLetters : function() {
		setTimeout(function(){
			iphone.animateCicle();
		}, iphone.pannels_animate_time);
		
		letters_interval = setInterval(function(){
			iphone.animateCicle();
		},2500);
	},

	animateCicle : function(){
		for (var i = 0; i < 15; ++i) {
			(function(i) {
				setTimeout(function(){
					$('#spans_'+i).stop().animate({'opacity':'1'}, iphone.letter_animate_time, function(){
						setTimeout(function(){ $('#spans_' + i).stop().animate({'opacity':'0.3'}, iphone.letter_animate_time) }, iphone.letter_animate_time*4);
					});
				}, (i * iphone.letter_animate_time*1.2));
			})(i);
		}
	},	
}