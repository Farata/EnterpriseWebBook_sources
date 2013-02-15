/**
 * @author
 */

window.onload = function() {

	/* --------- login module start -------------- */

	(function() {
		// a self contained "namespace"

		//login section elements
		var loginLink = document.getElementById("login-link");
		var loginForm = document.getElementById("login-form");
		var loginSubmit = document.getElementById('login-submit');
		var logoutLink = document.getElementById('logout-link');
		var profileLink = document.getElementById('profile-link');
		var authorizedSection = document.getElementById("authorized");

		var userName = document.getElementById('username');
		var userPassword = document.getElementById('password');

		function showLoginForm() {
			loginLink.style.display = "none";
			loginForm.style.display = "block";
			loginSubmit.style.display = "block";
		}


		loginLink.addEventListener('click', showLoginForm, false);

		function showAuthorizedSection() {
			authorizedSection.style.display = "block";
			loginForm.style.display = "none";
			loginSubmit.style.display = "none";
		}

		function logIn() {
			//check credential
			var userNameValue = userName.value;
			var userNameValueLength = userName.value.length;
			var userPasswordValue = userPassword.value;
			var userPasswordLength = userPassword.value.length;

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


		loginSubmit.addEventListener('click', logIn, false);

		function logOut() {
			userName.value = '';
			userPassword.value = '';
			authorizedSection.style.display = "none";
			loginLink.style.display = "block";
		}


		logoutLink.addEventListener('click', logOut, false);

		function getProfile() {
			console.log('Profile link was clicked');
		}


		profileLink.addEventListener('click', getProfile, false);

	})();
	/* --------- login module end  -------------- */

	/* --------- make donation module start -------------- */
	(function() {
		var donateButton = document.getElementById('donate-button');
		var donationAddress = document.getElementById('donation-address');
		var donateFormContainer = document.getElementById('donate-form-container');
		var customAmount = document.getElementById('customAmount');
		var donateForm = document.forms['_xclick'];
		var donateLaterLink = document.getElementById('donate-later-link');
		var statesList = document.getElementById('state');
		var counriesList = document.getElementById('counriesList');
		var checkedInd = 2;
		
		var tempContainer = document.getElementById('temp-project-name-container');

		// populate states and countries list via loading external html

		function loadData(dataUrl, target) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						target.innerHTML += xhr.responseText;
					} else {
						// We are just printing the error on the console,
						console.log(xhr.statusText);

						// but app has to show it somewhere on the Web page

						//Option 1 - Show the error on the Web page
						
       					tempContainer.innerHTML += '<p class="error">Error getting ' + target.name + ": "+ xhr.statusText + ", code: "+ xhr.status + "</p>";
                                      
						// Option 2 - User do not care about error
						// Make useful UI replacement - replace dropbox on input text field

						var placeHolder;

						for (var i = 0; i < target.parentNode.childNodes.length; i++) {
							if (target.parentNode.childNodes[i] == target) {
								for (var e = 0; e < target.childNodes.length; e++) {
									if (target.childNodes[e].nodeName.toLowerCase() == 'option') {
										placeHolder = target.childNodes[e].text.replace(/\-/g, "");
									}
								}
								var replacementDiv = document.createElement('div');
								replacementDiv.innerHTML = '<input type="text" placeholder="' + placeHolder + '">';
								target.parentNode.replaceChild(replacementDiv, target.parentNode.childNodes[i])
								break;
							}
						}

					}
				}
			}
			xhr.send();
		}

		// Load the countries and states using XHR
		loadData('data/us-states.html', statesList);
		//loadData('data/countries.html', counriesList);

		//test error - set wrong url
		loadData('data/_countries.html', counriesList);

		// ---

		function showDotationForm() {
			donationAddress.style.display = "none";
			donateFormContainer.style.display = "block";
		}


		donateButton.addEventListener('click', showDotationForm, false);

		var donateFormContainer = document.getElementById('donate-form-container');

		// Intercept any click on the donate form in a capturing phase
		donateFormContainer.addEventListener("click", resetCustomAmount, true);
		function resetCustomAmount(event) {
			// reset the customAmount
			if (event.target.type == "radio") {
				customAmount.value = '';
			}
		}

		//uncheck selected radio buttons if custom amount was choosen
		function onCustomAmountFocus() {
			for (var i = 0; i < donateForm.length; i++) {
				if (donateForm[i].type == 'radio' && donateForm[i].checked == true) {
					checkedInd = i;
					donateForm[i].checked = false;
				}
			}
		}


		customAmount.addEventListener('focus', onCustomAmountFocus, false);

		function onCustomAmountBlur() {
			var value = customAmount.value;
			if (value == '') {
				donateForm[checkedInd].checked = true;
			}
		}


		customAmount.addEventListener('blur', onCustomAmountBlur, false);

		function donateLater() {
			donationAddress.style.display = "block";
			donateFormContainer.style.display = "none";
		}


		donateLaterLink.addEventListener('click', donateLater, false);

	})();
	/* --------- make donation module end -------------- */
}
