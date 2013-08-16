	<html>

	<head>
		<title>Zachary's Portfolio</title>
		<link rel="stylesheet" type="text/css" href="styles/style.css" />
		<script type="text/javascript" src="scripts/javascript.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script src="scripts/jquery-1.8.3.js"></script>
	</head>

	<body>
	<div class="bkgdColor"></div> <!-- BACKGROUND COLOR -->
	<div class="wrapper">
		<div class="header">
			<div class="left">
				<a href="about.php" class="hla
					<?php	
						if(basename($_SERVER['PHP_SELF']) == "about.php")
							echo ' selected';
					?>				
				">about</a>
	
	<form id="slideNumForm" action="setSlideIndex.php" method="GET" style="position: absolute">
		<input id="slideNum" name="slideNum" type="hidden" value="1" />
	</form>
	
		<a style="cursor: pointer" onclick="$('#slideNum').val(1); document.getElementById('slideNumForm').submit();" class="hla
			<?php			
			if(basename($_SERVER['PHP_SELF']) == "work1.php")
				echo ' selected"';
			?>
		">work</a>
	
		<a href="contact.php" class="hla
			<?php	
			if(basename($_SERVER['PHP_SELF']) == "contact.php")
				echo ' selected';
			?>
		">contact</a>
				
		</div>
			<div class="right" onclick="window.location='index.php'">
				<div class="top">
					<a>zachary cox</a>
				</div>
				<div class="bottom">
					<a>web development</a>
				</div>
			</div>
		</div>