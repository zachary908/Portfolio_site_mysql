<?php
	include 'pokerConfig.php';
?>

<html>
<head>
	<title>Zax MySQL Poker Page</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/jquery-ui-1.10.3.custom.js"></script>
	<script src="../scripts/pokerjs.js"></script>
	<link rel="stylesheet" type="text/css" href="../styles/pokerStyle.css" />
	<link rel="stylesheet" href="../css/ui-lightness/jquery-ui-1.10.3.custom.css" />
	<!-- GOOGLE ANALYTICS TRACKING CODE: -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
		_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
		ga('create', 'UA-43676050-1', 'zacharybriancox.com');
		ga('send', 'pageview');
	</script>
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
				<div>
					<span onclick="hideModal('loginModal'); showModal('forgotModal', 'forgotPwdEmail')" style="font-style: italic; cursor: pointer">Forgot password?</span>
				</div>
			</div>
			<div id="logErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="login()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal('loginModal')">Cancel</button>
			</div>
		</div>
		<!-- END loginModal -->
		
		<!-- forgotModal -->
		<div class="modalGlobal" id="forgotModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Forgot Password</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">Email:</div>
				</div>
				<input id="forgotPwdEmail" type="text" onkeypress="checkEnter(event, 'forgotPassword');">
			</div>
			<div id="forgotPwdErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="forgotPassword()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal('forgotModal')">Cancel</button>
			</div>
		</div>
		<!-- END forgotModal -->
		
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
	
	
	
	