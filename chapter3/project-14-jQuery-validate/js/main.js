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

	//in this case i'm using anonymous function as a handler.
	$('#profile-link').on('click', function() {
		console.log('Profile link was clicked');
	});
});
/* --------- make donation module start -------------- */

jQuery(function($) {

	var checkedInd = 2;

	function showHideDonationForm() {
		$('#donation-address, #donate-form-container').toggle();
	}


	$('#donate-button').on('click', showHideDonationForm);

	$('#donate-form-container').on('click', resetCustomAmount);
	function resetCustomAmount(event) {
		if(event.target.type == "radio") {
			$('#customAmount').val('');
		}
	}

	function onCustomAmountFocus() {
		var radioButtons = $('form[name="_xclick"] input:radio');
		if($('#customAmount').val() == '') {
			checkedInd = radioButtons.index(radioButtons.filter(':checked'));
		}
		$('form[name="_xclick"] input:radio').prop('checked', false);
	}

	function onCustomAmountBlur() {
		if($('#customAmount').val() == '') {
			$('form[name="_xclick"] input:radio:eq(' + checkedInd + ')').prop("checked", true);
		}
	}


	$('#customAmount').on({
		focus : onCustomAmountFocus,
		blur : onCustomAmountBlur
	});
	$('#donate-later-link').on('click', showHideDonationForm);

	// -----------------

	var validator = $('form[name="_xclick"]').validate({
		
		// We can add errorClass for element, if validation of them is failed
		highlight : function(target, errorClass) {
			$(target).addClass("invalidElement");
			// Show the count of errors
			$("#validationSummary").text(validator.numberOfInvalids() + " field(s) are invalid");
			$("#validationSummary").show();
		},
		unhighlight : function(target, errorClass) {
			$(target).removeClass("invalidElement");
			// Show the count of errors
			var errors = validator.numberOfInvalids();
			$("#validationSummary").text( errors + " field(s) are invalid");
			// Hide the count of errors
			if(errors == 0) {
				$("#validationSummary").hide();
			}			
		},
		//Default errorElement is label. We want to use <span>
		// and we'll define style for them in CSSS
		errorElement : "span",
		//default class for error element is "error", we can set custom.
		errorClass : "donationFormError",
		//validation rules for each element
		rules : {
			full_name : {
				required : true,
				minlength : 2
			},
			email_addr : {
				required : true,
				email : true
			},
			zip : {
				 digits:true
			}
		},
		// Custom error messages for each form element
		messages : {
			 full_name: {
                required: "Name is required",
              	minlength: "Name should have at least 2 letters"
            },
			email_addr : {
				required : "Email is required",
			}
		}
	});

});
/* --------- make donation module end -------------- */