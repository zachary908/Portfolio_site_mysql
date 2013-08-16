<?php
// DISPLAY CONTENTS OF SLIDENUM VAR
// ("HEADER..." LINE MUST BE COMMENTED OUT WHEN THIS IS IN USE)
//		echo $_GET["slideNum"];
//		session_start();
	$_SESSION["slideNumServer"] = $_GET["slideNum"];

// NEXT LINE DISPLAYS CONTENTS OF SESSION VAR FOR DEBUGGING ("HEADER..."
//	LINE MUST BE COMMENTED OUT WHEN VAR_DUMP IS IN USE)
//	var_dump($_SESSION);	
	
	header("location: work1.php");
?>