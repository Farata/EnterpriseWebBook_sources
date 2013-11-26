/* --------- login section -------------- */

jQuery(function($) {

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
		if(userNameValueLength == 0 || userPasswordLength == 0) {
			if(userNameValueLength == 0) {
				console.log('username is empty');
			}
			if(userPasswordLength == 0) {
				console.log('password is empty');
			}
		} else if(userNameValue != 'admin' || userPasswordValue != '1234') {
			console.log('username or password is invalid');
		} else if(userNameValue == 'admin' && userPasswordValue == '1234') {
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

jQuery(function($) {

	var checkedInd = 2;

	function showHideDonationForm(first, next) {
		first.fadeToggle('slow', function() {
			next.fadeToggle('slow');
		});
	}


	$('#donate-button').on('click', function() {
		showHideDonationForm($('#donation-address'), $('#donate-form-container'))
	});

	$('#donate-later-link').on('click', function() {
		showHideDonationForm($('#donate-form-container'), $('#donation-address'))
	});

	$('#donate-form-container').on('click', resetCustomAmount);
	function resetCustomAmount(event) {
		if(event.target.type == "radio") {
			$('#customAmount').val('');
		}
	}

	//uncheck selected radio buttons if custom amount was choosen

	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if($('#customAmount').val() == '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
	}

	function onCustomAmountBlur() {
		var customAmountValue = $('#customAmount').val();
		if(customAmountValue == '') {
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').prop("checked", true);
			$('#customAmount').attr('value', '');
		} else {
			$('#customAmount').attr('value', customAmountValue);
		}
	}


	$('#customAmount').on({
		focus : onCustomAmountFocus,
		blur : onCustomAmountBlur
	});

	/*  ======================= Using  serialize   ============================== */

	function onOffButton(btn, flag, btnClass) {
		if(flag == true) {
			btn.attr("disabled", true);
			btn.addClass(btnClass);
		} else {
			btn.attr("disabled", false);
			btn.removeClass("submitDisabled");
		}
	}

   
	$('.donate-button-submit').on('click', submitSerializedData);

	function submitSerializedData(event) {

		// disable the button to prevent double click
		onOffButton($('.donate-button-submit'), true, 'submitDisabled');

		//Block the default action of the event
		event.preventDefault();

		var queryString;

		// get inputs data exept name=cdm and empty amounts
		queryString = $('form[name="_xclick"]').find(':input[type=hidden][name!=cmd], :input[name=amount][value!=""], :input[name=full_name], :input[name=email_addr]').serialize();

		console.log('-------- get the form inputs data  -----------');
		console.log("Submitting to the server: " + queryString);
			
			$.ajax({
			    type : 'POST',
			    url : 'demo.php',
			    data : queryString
			}).done(function(response) {
				console.log('-------- response from demo.php  -----------');
				console.log("Got the response from the ajax() call to demo.php: " + response);
                // enable the donate button again
				onOffButton($('.donate-button-submit'), false, 'submitDisabled');
			}).fail(function (jqXHR, textStatus, error) {   

     	      console.log('AJAX request failed: ' + error + ". Code: " + jqXHR.status);

     	      // The code to display the error in the 
     	      // browser's window goes here                
             });
	}

});
/* --------- make donation module end -------------- */