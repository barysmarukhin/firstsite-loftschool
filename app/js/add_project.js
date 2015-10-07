var myModule = (function(){

	var init = function(){
		_setUpListeners();

		};

	var _setUpListeners=function(){
			$('#add-new-item').on('click', _showModal);//открыть модальное окно
		};
	var _showModal=function(ev){
		console.log('Вызов');
		ev.preventDefault();
		$('#new-project-popup').bPopup({
			speed: 650,
			transition:'slideDown'
		});
	};

	return {
		init:init,
	};
})();
myModule.init();