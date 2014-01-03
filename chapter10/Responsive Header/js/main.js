window.onload = function() {

	// Using an anonymous wrapper for encapsulating code in its own namespace.
	// This does not only protect code against name clashes,
	// but it also allows for better modularization of programs.
	

	/* --------- login section -------------- */

	var ssc = (function() {
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

}
