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

$(function() {		
		function loadData(dataUrl, rootElement, target) {
			$.ajax({ 
	    		url: dataUrl,
	    		type: 'GET',
	    		dataType: 'json'
			}).done(function (data) {			
				var optionsHTML = '';	
				$.each(data[rootElement], function(index) {
	  				optionsHTML+='<option value="'+data[rootElement][index].code+'">'+data[rootElement][index].name+'</option>'
	  			});	
	  			var targetCurrentHTML = target.html();						
				var targetNewHTML = targetCurrentHTML + optionsHTML;
				target.html(targetNewHTML);   		
			}).fail(function (jqXHR, textStatus) {
				if (textStatus === 'parsererror') {
	                console.log('Requested JSON parse failed.');
	            } else if (textStatus === 'abort') {
	                console.log('Ajax request was aborted.');
	            } else{
	            	console.log('Error status code:' + jqXHR.status);
	            }
			});
		}
					
	    loadData('data/us-states-list.json', 'usstateslist', $('#state'));
		loadData('data/counries-list.json', 'countrieslist', $('#counriesList'));
	
/* Loading the states using the .getJSON() method
 
	function loadJsonData(dataURL, rootElement, target){
		$.getJSON(dataURL, function (data) {			
				var optionsHTML = '';	
				$.each(data[rootElement], function(index) {
	  				optionsHTML+='<option value="'+data[rootElement][index].code+'">'+data[rootElement][index].name+'</option>'
	  			});	
	  			var targetCurrentHTML = target.html();						
				var targetNewHTML = targetCurrentHTML + optionsHTML;
				target.html(targetNewHTML);   		
		       });		
	}
		loadJsonData('data/us-states-list.json', 'usstateslist', $('#state'));
 */	
	
		// -----------------------------------------------
/*		
		function showHideDonationForm() {
			$('#donation-address, #donate-form-container').toggle();
		}
		
		$('#donate-button').on('click', showHideDonationForm);	
		$('#donate-later-link').on('click', showHideDonationForm);
*/

		function showHideDonationForm(first, next) {
		        first.fadeToggle('slow', function() {
		                next.fadeToggle('slow');
		        });
		}
		
		var donAddress = $('#donation-address');
		var donForm = $('#donate-form-container');		

		$('#donate-button').on('click', function() {
		        showHideDonationForm(donAddress, donForm)
		});
		
		$('#donate-later-link').on('click', function() {
		        showHideDonationForm(donForm, donAddress)
		});		
		
		// Intercept any click on the donate form in a capturing phase
		$('#donate-form-container').on('click', resetCustomAmount);
		function resetCustomAmount(event) {
			if (event.target.type == "radio") {
				$('#customAmount').val('');
			}
		}
     
        // On submit event serialize the form
		$('#donate-form').submit(function(){
		  var formData = $(this).serialize();
		  console.log("The Donation form is serialized: " + formData);
		  $.ajax({
		  	   type:'GET',
		  	   url: 'https://www.paypal.com/cgi-bin/webscr',
		  	   data: formData 
		  });
		  
		});
		


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