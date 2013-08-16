<?php

	$_SESSION['statusMsg'] = $_POST['status'];
	//var_dump($_SESSION);
	header("location: pokerSessions.php");
	
?>