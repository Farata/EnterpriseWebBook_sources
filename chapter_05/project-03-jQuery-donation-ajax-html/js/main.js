/* --------- login section -------------- */

$(function($) {

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
		//check credential
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

$(function($) {
		
		// populate states and countries list via loading external html
		function loadData(dataUrl, target, selectionPrompt) {
			target.load(dataUrl, function(response, status, xhr) {
				if (status != "error") {
					target.prepend(selectionPrompt);
				} else {   
					console.log('Status: ' + status + ' ' + xhr.statusText);

					// Show the error message on the Web page					
       				var tempContainerHTML = '<p class="error">Error getting ' + dataUrl + 
       				": "+ xhr.statusText + ", code: "+ xhr.status + "</p>";
                    $('#temp-project-name-container').append(tempContainerHTML);              
  				}
			});
		}
	
		var statePrompt = '<option value="" selected="selected"> - State - </option>';
		loadData('data/us-states.html', $('#state'), statePrompt);
		
		var countryPrompt = '<option value="" selected="selected"> - Country - </option>';
		// set the wrong URL on purpose
		loadData('da----ta/countries.html', $('#counriesList'), countryPrompt);
		
		
		// -----------------------------------------------
		
		function showHideDonationForm() {
			$('#donation-address, #donate-form-container').toggle();
		}
		$('#donate-button').on('click', showHideDonationForm);
		$('#donate-later-link').on('click', showHideDonationForm);
	
		// Intercept any click on the donate form in a capturing phase
		$('#donate-form-container').on('click', resetCustomAmount);
		function resetCustomAmount(event) {
			if (event.target.type == "radio") {
				$('#customAmount').val('');
			}
		}

		var checkedInd = 2;
		//uncheck selected radio buttons if custom amount was choosen
		function onCustomAmountFocus() {
			var radioButtons = $('form[name="_xclick"] input:radio');
			if ($('#customAmount').val() == '') {
				checkedInd = radioButtons.index(radioButtons.filter(':checked'));
			}
			$('form[name="_xclick"] input:radio').prop('checked', false);
		}
		
		function onCustomAmountBlur() {
			if ($('#customAmount').val() == '') {
				$('form[name="_xclick"] input:radio:eq('+checkedInd+')').prop("checked", true); 			
			}
		}
		$('#customAmount').on({focus:onCustomAmountFocus, blur:onCustomAmountBlur});

	
});
/* --------- make donation module end -------------- */	