<?php
	include 'Controls/config.php';
	
	//Get the user's email address and the password reset token from the URL
	$Email = str_replace(" ", "+", $_GET["a"]);
	$Token = $_GET["b"];
	$Status = 1;
	
	//If the pwd reset token matches the one in the DB, 
	//use the changePassword stored procedure to update the user's password
	$connectionInfo = array("Database"=>$myDB, "UID"=>$myUser, "PWD"=>$myPass);
	$conn = sqlsrv_connect($myServer, $connectionInfo);	

	$params = array
	( 
		array($Email, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('max')),
		array($Token, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('max')),
		array($Status, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_BIT)
	);
	
	$stmt = sqlsrv_query($conn, '{CALL ForgotPassword(?,?,?)}', $params);
	
	//If the token is correct, go to the ChooseNewPwd page and with the email address of the user
	//If not, show error

	include 'Controls/header.php';
?>

	<div style="width: 540px; height: 250px; margin: auto; padding: 20px">
		<?php if($Status===0){ ?>
			<div id="successPwd">
				<div class="modalTableRow">
					<div class="modalLabelWrap" style="width: 200px">
						<div class="modalLabel">Enter a new password:</div>
					</div>					
					<input type="password" id="forgotPwd_Enter" style="float: left">
				</div>
				
				<div class="modalTableRow">
					<div class="modalLabelWrap" style="width: 200px">
						<div class="modalLabel">Confirm new password:</div>
					</div>
					<input type="password" id="forgotPwd_Confirm" style="float: left">
				</div>
				<div class="modalTableRow">
					<div id="forgotPwd_Fail" class="errorLabel"></div>
				</div>
				<div style="margin-top: 20px; clear: both; text-align: center">
					<button id="btnForgotPwdSubmit" class="modalButton" onclick="postNewPwd('<?php echo $Email ?>')">SUBMIT</button>
				</div>
			</div>		
			<div id="forgotPwd_Success" class="errorLabel" style="text-align: center"></div>
			
	<?php } else{ ?>
		This link has expired.
	
	<?php } ?>
	</div>
	
	<div class="bkgdBottom">
<?php
	include 'Controls/footer.php';
?>