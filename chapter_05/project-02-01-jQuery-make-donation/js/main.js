/* --------- login section -------------- */

$(function() {

	function showLoginForm() {
		$('#login-link, #login-form, #login-submit').toggle();
	}

	$('#login-link').on('click', showLoginForm);

	function showAuthorizedSection() {
		$('#authorized, #login-form, #login-submit').toggle();
	}

	function logIn() {
		var userNameValue = $('#username').val();
		var userNameValueLength = userNameValue.length;
		var userPasswordValue = $('#password').val();
		var userPasswordLength = userPasswordValue.length;

		//check credentials
		if (userNameValueLength == 0 || userPasswordLength == 0) {
			if (userNameValueLength == 0) {
				console.log('username is empty');
			}
			if (userPasswordLength == 0) {
				console.log('password is empty');
			}
		} else if (userNameValue != 'admin' || userPasswordValue != '1234') {
			console.log('username or password is invalid');
		} else if (userNameValue == 'admin' && userPasswordValue == '1234') {
			showAuthorizedSection();
		}
	}

	$('#login-submit').on('click', logIn);

	function logOut() {
		$('#username, #password').val('')
		$('#authorized, #login-link').toggle();
	}

	$('#logout-link').on('click', logOut);

	$('#profile-link').on('click', function() {
		console.log('Profile link was clicked');
	});
});

/* --------- make donation module start -------------- */
$(function() {		
		var checkedInd = 2;  // initially checked radiobutton
				
		function showHideDonationForm() {
			$('#donation-address, #donate-form-container').toggle();
		}
		$('#donate-button').on('click', showHideDonationForm);
		$('#donate-later-link').on('click', showHideDonationForm);
	
		$('#donate-form-container').on('click', resetOtherAmount);
		function resetOtherAmount(event) {
			if (event.target.type == "radio") {
				$('#otherAmount').val('');
			}
		}

		//uncheck selected radio buttons if other amount was chosen	
		function onOtherAmountFocus() {
			var radioButtons = $('form[name="_xclick"] input:radio');
			if ($('#otherAmount').val() == '') {
				checkedInd = radioButtons.index(radioButtons.filter(':checked'));
			}
			$('form[name="_xclick"] input:radio').prop('checked', false);
		}
		
		function onOtherAmountBlur() {
			if ($('#otherAmount').val() == '') {
				$('form[name="_xclick"] input:radio:eq('+checkedInd+')').prop("checked", true); 			
			}
		}
		$('#otherAmount').on({focus:onOtherAmountFocus, blur:onOtherAmountBlur});

	
});