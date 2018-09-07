function showAlert(text) {
	$('body').append('<div class="alert">'+text+'</div>');
	$('.alert').fadeIn(1000, function(){
		$('.alert').fadeOut(3000, function () {
			$('.alert').remove();
		});
	});
}

function showMessage(text) {
	$('body').append('<div class="message">'+text+'</div>');
	$('.message').fadeIn(1000, function(){
		$('.message').fadeOut(3000, function () {
			$('.message').remove();
		});
	});
}