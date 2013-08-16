<?php
	include 'pokerConfig.php';
?>

<html>
<head>
	<title>Zax Poker Page</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/jquery-ui-1.10.3.custom.js"></script>
	<script src="../scripts/pokerjs.js"></script>
	<link rel="stylesheet" type="text/css" href="../styles/pokerStyle.css" />
	<link rel="stylesheet" href="../css/ui-lightness/jquery-ui-1.10.3.custom.css" />
</head>

<body>
	<div id="fullCover"></div>
	
	<div class="modalWrap" id="modalWrap">
		<!-- registerModal -->	
		<div class="modalGlobal" id="registerModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">
					Register
				</div>
				<div class="modalSubHead">
					Already registered? <span onclick="hideModal('registerModal'); showModal('loginModal', 'logUsername')" style="font-style: italic; cursor: pointer">Sign in</span>
				</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Email Address:</div>
				</div>	
				<input id="regEmail" type="text" onkeypress="checkEnter(event, 'register');">
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Username:</div>
				</div>
				<input id="regUsername" type="text" onkeypress="checkEnter(event, 'register');">
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Password:</div>
				</div>
				<input id="regPasswd" type="password" onkeypress="checkEnter(event, 'register');">
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Confirm Password:</div>
				</div>
				<input id="regConfirmPasswd" type="password" onkeypress="checkEnter(event, 'register');">
			</div>
			<div class="modalRow">
				<div id="regErrLbl"></div>
			</div>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="register()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal('registerModal')">Cancel</button>
			</div>
		</div>
		<!-- END registerModal -->
	
		<!-- loginModal -->
		<div class="modalGlobal" id="loginModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Login</div>
				<div class="modalSubHead">
					Not signed up? <span onclick="hideModal('loginModal'); showModal('registerModal', 'regEmail')" style="font-style: italic; cursor: pointer">Register</span>
				</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Username:</div>
				</div>
				<input id="logUsername" type="text" onkeypress="checkEnter(event, 'login');">
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Password:</div>
				</div>
				<input id="logPasswd" type="password" onkeypress="checkEnter(event, 'login');">
			</div>
			<div id="logErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="login()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal('loginModal')">Cancel</button>
			</div>
		</div>
		<!-- END loginModal -->
		
	</div><!-- END modalWrap -->
	<div class="headerBkgd">
		<div class="headerWrap">
			<div class="header">
				<div class="left">
					<div>
						Me Logo Here
					</div>
					<button onclick="showModal('registerModal', 'regEmail')">Register</button><br>
					<button onclick="showModal('loginModal', 'logUsername')">Log In</button><br>
				</div>
				<div class="right floatingFix">
					<div class="fright">
					
					</div><br>
					<div class="fright">
						<button onclick="logout()">Log out</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
	