var validation = (function(){

	var init = function(){
		_setUpListeners();
		};
	var _setUpListeners=function(){
		$('form').on('keydown', '.has-error',_removeError);
		$('form').on('reset', _clearForm);
		$('form').on('click', '.has-error', _removeError);
		//прослушка событий
	};

	var _removeError = function(){
		$(this).removeClass('has-error');//Сброс класса has-error на событии keydown
	};

	var _clearForm = function(form){
		var form = $(this);
		form.find('input,textarea').trigger('hideTooltipMy');
		form.find('.has-error').removeClass('has-error');
	};

		//создание тултипа
	var _createQtip = function(element, position){
		//позиция тултипа
			if (position === 'right') {
				position = {
					my:'left center',
					at:'right center',
				}
			}else{
				position = {
					my:'right center',
					at:'left center',
					adjust:{
						method: 'shift none'
					}
				}
			}

		//инициализация тултипа, работа с api плагина qtip
			element.qtip({
				content:{
					text: function(){
						return $(this).attr('qtip-content');
					}
				},
				show:{
					event: 'show'
				},
				hide:{
					event:'keydown hideTooltipMy'
				},
				position: position,
				style:{
					classes: 'qtip-mystyle qtip-rounded',
					tip:{
						height:10,
						width:16
					}
				}
			}).trigger('show');//вызывает показ тултипа
	};
		//универсальная функция
	var validateForm = function (form){

		console.log('Привет, я в модуле валидации проверяю форму')
		var elements = form.find('input, textarea').not('input[type ="file"],input[type = "hidden"]'),
		valid = true;

		//пройдемся по всем элементам формы
		$.each(elements, function(index, val){
			var element =$(val),
				val = element.val(),//берем значение
				pos = element.attr('qtip-position');
			
			if (element.attr('id')==='filename'){
				val=_isImg(val)?val:'';
			}

			if(val.length === 0 ){
				element.addClass('has-error');
				_createQtip(element,pos);
				valid = false;
			}
		});

		return valid;

	};
	var _isImg=function(filename){
		return /\.(jpeg|jpg|png|gif)$/i.test(filename);
	};

	//возвращает объект(публичные методы)
	return {
		init:init,
		validateForm:validateForm
	};

})();
validation.init();