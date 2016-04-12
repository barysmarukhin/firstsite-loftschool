var contactMe = (function(){

	var init = function(){
		_setUpListeners();
		};

		//прослушка событий
	var _setUpListeners=function(){
		$('#contact-me').on('submit',_submit_Form);
		};

	var _submit_Form = function(ev){
		console.log('Отправка формы')
		ev.preventDefault();
		var form = $(this),
			url = 'contactme.php',
			defObj = _ajaxForm(form, url);
			//что-то будет делаться дальше с ответом с сервера defObj
	};
	
	var _ajaxForm = function(form,url){
		console.log('ajax запрос с проверкой')
		if(!validation.validateForm(form)) return false;
		//если false, то код ниже не произойдет

	};

	return {
		init:init
	};
})();
contactMe.init();