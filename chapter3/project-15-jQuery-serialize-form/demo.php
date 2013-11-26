<?php
if (isset($_POST['paypal_email'])) {
	$paypal_email = $_POST['paypal_email'];
	$item_name = $_POST['item_name'];
	$currency_code = $_POST['currency_code'];
	$amount = $_POST['amount'];
	$full_name = $_POST['full_name'];
	$email_addr = $_POST['email_addr'];

	echo('Got from the client and will send to PayPal: ' . $paypal_email . '    Payment type: ' . $item_name . 
	'   amount: ' . $amount .' '. $currency_code . '    Thank you ' . $full_name 
	. '    The confirmation will be sent to ' . $email_addr);	
	
} else {
	echo('Error getting data');
}
exit();
?>