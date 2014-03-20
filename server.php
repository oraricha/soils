<?php
	if (isset($_REQUEST['email'])) {
	//if "email" is filled out, send email
		//send email
		$email = $_REQUEST['email'];
		$to = "a@a.com, a@a.com";
		$name = $_REQUEST['name'];
		$subject = "Message from sensoils.com (From:" . $name . "(" . $email . ")";
		$message = $_REQUEST['message'];
		mail(
			$to,
			$subject,
			$message);
		echo "Your message has been sent.";
	}	else {
		//if "email" is not filled out, display the form
		echo "Email is missing";
	}
?>