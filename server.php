<?php
	if (isset($_REQUEST['email'])) {
	//if "email" is filled out, send email
		//send email
		$email = $_REQUEST['email'];
		$name = $_REQUEST['name'];
		$subject = $_REQUEST['subject'];
		$message = $_REQUEST['message'];
		mail(
			"uxappdev@gmail.com",
			$subject,
			$message,
			"From:" . $name . "(" . $email . ")");
		echo "Thank you for using our mail form";
	}	else {
		//if "email" is not filled out, display the form
		echo "FAILLLLL!!!!!!!!!!!!!";
		}
?>