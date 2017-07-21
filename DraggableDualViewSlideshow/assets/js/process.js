var system = function(){
	"use strict";

	return {
		ini:function(){
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
		},
		ajax:function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		html:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'html',
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		xml:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'xml',
		        async: !1,
		        cache:false
		    });
		},
		send_mail:function(email,subject,message,callback){
			return system.ajax('assets/harmony/Process.php?send-mail',[email,subject,message]);
		},
		loading: function(_switch){
			if(_switch){ // show loader
				$('#loader-wrapper').addClass('animated zoomOut');
				setTimeout(function(){
					$("#loader-wrapper").addClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
			}
			else{
				setTimeout(function(){
					$("#loader-wrapper").removeClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
				$("#loader-wrapper").removeClass("zoomOut");
				$('#loader-wrapper').addClass('animated zoomIn');
			}
		},
		loader: function(_switch){
			if(_switch){ // show loader
				$(".progress").removeClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
			else{
				$(".progress").addClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
		},
		preloader:function(div){
			var data = system.xml("pages.xml");
			$(data.responseText).find("loader").each(function(i,content){
				$(div).html(content);
			});
		},
		block:function(status){
			if(status){
				$("#block-control").addClass('block-content')
			}
			else{
				$("#block-control").removeClass('block-content')
			}
		},
		clearForm:function(){
			$("form").find('input:text, input:password, input:file, select, textarea').val('');
			$("form").find('error').html('');
			$("form").find('input:text, input:password, input:file, select, textarea').removeClass("valid");
		    $("form").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
		},
        searchJSON: function(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(this.searchJSON(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		},
		resize:function(){
			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    		if((width>0) && (width<=500)){
    			$("#main-display").removeClass("col-33").addClass("col-90");
    		}
    		else if((width>500) && (width<=768)){
    			$("#main-display").removeClass("col-33").addClass("col-70");
    		}
    		else{
    			$("#main-display").removeClass("col-90").addClass("col-33");
    		}
		}
	}
}();

var mail = function(){
	"use strict";
	return {
		send:function(){
			$$("#form_sendMessage a").on('click',function(){
				var form = $("#form_sendMessage");
				var data = form.serializeArray();

				if((data[0]['value'] == "") || (data[1]['value'] == "") || (data[2]['value'] == "")){
					console.log("All fields are required");
				    app.addNotification({
				        message: 'All fields are required. Please fill in all input fields',
				        hold:2000,
				        button:""
				    });

					$$.each(data,function(i,v){
						console.log($$(".error_"+v['name']));
					})
				}
				else{	
					if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($$("#field_email").val()))){
						var _data = system.send_mail("info@rnrdigitalconsultancy.com,"+data[1]['value'],"Inquiry of "+data[0]['value'],"Email: "+data[1]['value']+"<br/>Message: "+data[2]['value']);
						if(_data.responseText == '1'){
						    app.addNotification({
						        message: 'Thank you '+data[0]['value']+'. Your message has been sent. ',
						        hold:2000,
						        button:""
						    });
						}
						else{
						    app.addNotification({
						        message: "Failed to send your message. Please try again later.",
						        hold:2000,
						        button:""
						    });
						}

						$$("#field_name").val("");
						$$("#field_email").val("");
						$$("#field_message").val("");

						app.closeModal('popup-contact');
					}
					else{
					    app.addNotification({
					        message: 'Email is invalid. ',
					        hold:2000,
					        button:""
					    });
					}
					// console.log(data);
				}
			});
		},
	}
}();

var loop = function(){
    "use strict";
	return {
		go:function(time){
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
			if((time > 6) && (time <= 14)){
				$("body").append('<script type="text/javascript" src="assets/js/forest.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-forest.js"></script>');
			}
			else if((time > 14) && (time <= 22)){
				$("body").append('<script type="text/javascript" src="assets/js/city.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-city.js"></script>');
			}
			else{
				$("body").append('<script type="text/javascript" src="assets/js/night.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-night.js"></script>');
			}
			// setTimeout(function(){
			// 	loop.go();
			// },3000);		
		}
	}
}();

Framework7.prototype.plugins.statistics = function (app, params) {
	var count = 0;
    return {
        hooks: {
            appInit: function () {
            }
        }
    };
};

var $$ = Dom7;
var app = new Framework7({
	material:true,
});