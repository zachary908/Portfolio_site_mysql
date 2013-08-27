<?php
// ALL CALLS TO DB MADE FROM THIS PAGE	

    if(!isset($_SESSION)){
        session_start();
    }

    include("controls/pokerConfig.php");

    try{
        $methodSwitch = $_REQUEST["method"];

        switch($methodSwitch){ 
            case 'test':
                // GET VARS FROM POKERJS POST
                $phpVal1 = $_POST['val1'];
                $phpVal2 = $_POST['val2'];
                $phpVal3 = $_POST['val3'];

                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);
                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                if (!$mysqli->query("DROP TABLE IF EXISTS test") ||
                    !$mysqli->query("CREATE TABLE test(id INT, lbl VARCHAR(45))") ||
                    !$mysqli->query("INSERT INTO test(id, lbl) VALUES (1, '$phpVal1'), (2, '$phpVal2'), (3, '$phpVal3')")) {
                    echo "Table creation failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                if (!$mysqli->query("DROP PROCEDURE IF EXISTS p") ||
                    !$mysqli->query("CREATE PROCEDURE p() READS SQL DATA BEGIN SELECT * FROM test; END;")) {
                    echo "Stored procedure creation failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                if (!$mysqli->multi_query("CALL p()")) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                do {
                    if ($res = $mysqli->store_result()) {
                        printf("---\n");
                        var_dump($res->fetch_all());
                        $res->free();
                    } else {
                        if ($mysqli->errno) {
                            echo "Store failed: (".$mysqli->errno.") ".$mysqli->error;
                        }
                    }
                } while ($mysqli->more_results() && $mysqli->next_result());

                $mysqli->close();
                break;
            case 'getUserIdOnName':
                // $_SESSION['USER']['ID'] IS SET IN THIS METHOD
                // GET VARS
                $Username = $_SESSION['user']['name'];

                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);
                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }
                
                $strQuery = "SELECT Id FROM members WHERE Username = '".$Username."';";
                if(!$mysqli->multi_query($strQuery)){
                    echo "Query failed: (".$mysqli->errno.") ".$mysqli->error;
                }
                
                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                
                // SET $_SESSION['user']['id'] BASED ON $_SESSION['user']['name']
                $_SESSION['user']['id'] = $row['Id'];
                
                $res->free();
                
                $mysqli->close();
                break;
                
            case 'register':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                // ENCRYPT EMAIL, USERNAME, PWD AND CREATE VARS WITH NAMES = DB NAMES
                $Email = strtolower($_POST['regEmail']);
                $EncEmail = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Email, MCRYPT_MODE_CBC, md5(md5($encryptKey))));
                $Username = $_POST['regUsername'];
                $Password = $_POST['regPasswd'];
                $EncPassword = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Password, MCRYPT_MODE_CBC, md5(md5($encryptKey))));

                $strQuery1 = "CALL RegisterUser('".$EncEmail."', '".$Username."', '".$EncPassword."', @regMsg);";

                if (!$mysqli->multi_query($strQuery1)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                // GET THE VALUE OF THE OUTPUT VARIABLE
                // IF REGMSG = 1, EMAIL EXISTS ALREADY,
                // IF REGMSG = 2, USERNAME EXISTS ALREADY
                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                echo $row['regMsg'];
                
                // SET $_SESSION['user']['name']
                if($row['regMsg'] == 0){
                    $_SESSION['user']['name'] = $Username;
                }
                
                $res->free();
                
                $mysqli->close();
                break;

            case 'login':
                // $_SESSION['USER']['NAME'] IS SET IN THIS METHOD

                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $Username = $_POST['logUsername'];

                $Password = $_POST['logPasswd'];
                $EncPassword = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Password, MCRYPT_MODE_CBC, md5(md5($encryptKey))));

                $strQuery = "CALL Login('".$Username."', '".$EncPassword."', @logMsg)";
                
                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                
                // IF LOGMSG = 0, USER IS LOGGED IN
                // IF LOGMSG = 1, USERNAME AND/OR PWD NOT FOUND
                
                // SET $_SESSION['user']['name']
                if($row['logMsg'] == 0){
                    $_SESSION['user']['name'] = $Username;
                }

                echo $row['logMsg'];
                
                $mysqli->close();
                break;

            case 'logout':
                session_destroy();
                break;

            case 'getListAJAX':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                // NOTE: STORED PROCEDURE WILL ALSO RETRIEVE DATA FOR DEFAULT USER
                $MemberId = $_SESSION['user']['id'];
                $ListType = $_REQUEST['listType'];
                $getListMsg = 0;
				
				$strQuery = "CALL GetList('".$MemberId."', '".$ListType."');";

                if (!$mysqli->multi_query($strQuery)) {
					echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
				}

                if($getListMsg == 1){
                    echo "No data was retrieved from database.";
                }

                do {
					/* store first result set */
					if ($result = $mysqli->store_result()) {
						while ($row = $result->fetch_row()) {
							if($ListType == "game"){
								printf("<option name='gameOption'>".$row[0]."</option>\n");
							}
							else{
								printf("<option name='limitOption'>".$row[0]."</option>\n");
							}
						}
						$result->free();
					}
					/* print divider */
					if ($mysqli->more_results()) {
						printf("-----------------\n");
					}
				} while ($mysqli->next_result());

                $mysqli->close();
                break;

            case 'getLocListAJAX':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                // NOTE: STORED PROCEDURE WILL ALSO RETRIEVE DATA FOR DEFAULT USER
                $MemberId = $_SESSION['user']['id'];
                $getListMsg = 0;
				
				$strQuery = "CALL GetLocList('".$MemberId."');";
				
				if (!$mysqli->multi_query($strQuery)) {
					echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
				}

				do {
					/* store first result set */
					if ($result = $mysqli->store_result()) {
						while ($row = $result->fetch_row()) {
							printf("<span name=\"location\">".$row[0]."</span><span name=\"locType\">".$row[1]."</span>");
						}
						$result->free();
					}
					/* print divider */
					if ($mysqli->more_results()) {
						printf("-----------------\n");
					}
				} while ($mysqli->next_result());

                $mysqli->close();
                break;

            case 'addLocOption':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $MemberId = $_SESSION['user']['id'];
                $PhpLocNameVal = $_REQUEST['phpLocNameVal'];
                $PhpLocType = $_REQUEST['phpLocType'];

                $strQuery = "CALL AddLocOption('".$MemberId."', '".$PhpLocNameVal."', '".$PhpLocType."', @AddLocMsg);";
                        
                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }
                    
                // GET VALUE OF AddLocMsg
                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                
                $res->free();
                
                // IF AddLocMsg = 1, OPTION ALREADY EXISTS
                if ($row['AddLocMsg'] == 1) {
                    echo "That option is already listed!";
                }
                // IF AddLocMsg = 2, USER HAS REACH MAX. LOCATIONS (25)
                else if ($row['AddLocMsg'] == 2) {
                    echo "You have exceeded the maximum number of listed items!";
                }
                else {
                    echo "";
                }

                $mysqli->close();
                break;

            case 'addLimitOption':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $PhpLimitVal = $_REQUEST['phpLimitVal'];
                $MemberId = $_SESSION['user']['id'];
                $AddLimitMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($PhpLimitVal, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($AddLimitMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT)
                );

				$strQuery = "CALL AddLimitOption('".$MemberId."', '".$PhpLimitVal."', @AddGameMsg);";

                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }
                    
                // GET VALUE OF AddGameMsg
                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                
                $res->free();
                
                // IF AddGameMsg = 1, OPTION ALREADY EXISTS
                if ($row['AddLimitMsg'] == 1) {
                    echo "That option is already listed!";
                }
                // IF AddGameMsg = 2, USER HAS REACH MAX. GAMES (25)
                else if ($row['AddLimitMsg'] == 2) {
                    echo "You have exceeded the maximum number of listed items!";
                }
                else {
                    echo "";
                }

                $mysqli->close();
                break;

            case 'addGameOption':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $PhpGameVal = $_REQUEST['phpGameVal'];
                $MemberId = $_SESSION['user']['id'];
				$AddGameMsg = 0;
				
                $strQuery = "CALL AddGameOption('".$MemberId."', '".$PhpGameVal."', @AddGameMsg);";
                        
                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }
                    
                // GET VALUE OF AddGameMsg
                $res = $mysqli->store_result();
                $row = $res->fetch_assoc();
                
                $res->free();
                
                // IF AddGameMsg = 1, OPTION ALREADY EXISTS
                if ($row['AddGameMsg'] == 1) {
                    echo "That option is already listed!";
                }
                // IF AddGameMsg = 2, USER HAS REACH MAX. GAMES (25)
                else if ($row['AddGameMsg'] == 2) {
                    echo "You have exceeded the maximum number of listed items!";
                }
                else {
                    echo "";
                }

                $mysqli->close();
                break;

            case 'addSession':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $MemberId = $_SESSION['user']['id'];
                $SqlStartDate = $_REQUEST['phpStartDate'];
                $SqlEndDate = $_REQUEST['phpEndDate'];
                $SqlLocation = $_REQUEST['phpLocation'];
                $SqlGameType = $_REQUEST['phpGameType'];
                $SqlRingTour = intval($_REQUEST['phpRingTour']);
                $SqlLimits = $_REQUEST['phpLimits'];
                $SqlBuyin = floatval($_REQUEST['phpBuyin']);
                $SqlCashout = floatval($_REQUEST['phpCashout']);
                $SqlPlace = intval($_REQUEST['phpPlace']);
                $SqlNotes = $_REQUEST['phpNotes'];
                $AddSessionMsg = "";

				$strQuery = "CALL AddSession('".$MemberId."', '".$SqlStartDate."', '".$SqlEndDate."', '".$SqlLocation."', '".$SqlGameType."', '".$SqlRingTour.
					"', '".$SqlLimits."', '".$SqlBuyin."', '".$SqlCashout."', '".$SqlPlace."', '".$SqlNotes."', @AddSessionMsg);";

                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }

                if($AddSessionMsg == 1){
                    echo "End time cannot be before start time!";
                }

                $mysqli->close();
                break;

            case 'editSession':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $SessionId = $_SESSION['editRowId'];
                $SqlStartDate = $_REQUEST['phpStartDate'];
                $SqlEndDate = $_REQUEST['phpEndDate'];
                $SqlLocation = $_REQUEST['phpLocation'];
                $SqlGameType = $_REQUEST['phpGameType'];
                $SqlRingTour = intval($_REQUEST['phpRingTour']);
                $SqlLimits = $_REQUEST['phpLimits'];
                $SqlBuyin = floatval($_REQUEST['phpBuyin']);
                $SqlCashout = floatval($_REQUEST['phpCashout']);
                $SqlPlace = intval($_REQUEST['phpPlace']);
                $SqlNotes = $_REQUEST['phpNotes'];
                $EditSessionMsg = "";

                $params = array(
                    array($SessionId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                    array($SqlStartDate, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_SMALLDATETIME),
                    array($SqlEndDate, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_SMALLDATETIME),
                    array($SqlLocation, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($SqlGameType, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($SqlRingTour, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_INT),
                    array($SqlLimits, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($SqlBuyin, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_DECIMAL('18', '2')),
                    array($SqlCashout, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_DECIMAL('18', '2')),
                    array($SqlPlace, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT),
                    array($SqlNotes, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($EditSessionMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT),
                );

                $stmt = mysqli_query($mysqli, '{CALL EditSession(?,?,?,?,?,?,?,?,?,?,?,?)}', $params);

                if($stmt == false){
                    die(print_r(sqlsrv_errors(), true));
                }

                if($EditSessionMsg == 1){
                    echo "End time cannot be before start time!";
                }

                $mysqli->close();
                break;
            case 'GetSessions':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $MemberId = $_SESSION['user']['id'];
                $GetSessionsMsg = 0;

				$strQuery = "CALL GetSessions('".$MemberId."', @GetSessionsMsg);";
				
                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }
				
				do {
					/* store first result set */
					if ($result = $mysqli->store_result()) {
						while ($row = $result->fetch_row()) {
							printf($row[0]."#".$row[1]."#".$row[2]."#".$row[3]."#".$row[4]."#".$row[5]."#".$row[6]."#".$row[7]."#".$row[8]."#".$row[9]."#"
							.$row[10]."#".$row[11]."#".$row[12]."#".$row[13]."%s", '%');
						}
						$result->free();
					}
				} while ($mysqli->next_result());

                // ADD AN OUTPUT PARAM- IF OUTPUT PARAM = 1, STATUS MSG READS: "NO SESSIONS FOUND, YOU SHOULD ADD A SESSION",
                // OTHERWISE, ENTER THIS WHILE LOOP
                // if($GetSessionsMsg == 0){
                    // while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                        // echo $row['Id']."#"
                            // .$row['StartTime']."#"
                            // .$row['Location']."#"
                            // .$row['GameType']."#"
                            // .$row['Limits']."#"
                            // .$row['Duration']."#"
                            // .$row['BuyIn']."#"
                            // .$row['CashOut']."#"
                            // .$row['RingTour']."#"
                            // .$row['Place']."#"
                            // .$row['Rate']."#"
                            // .$row['Return']."#"
                            // .$row['LocType']."#"
                            // .$row['Notes']."%";
                    // }
                // }
                // else{
                    // echo $GetSessionsMsg;
                // }

                $mysqli->close();
                break;
            case 'deleteSessionAJAX':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $MemberId = $_SESSION['user']['id'];
                $DelSessId = $_POST['delSessId'];

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                    array($DelSessId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                );

                $stmt = mysqli_query($mysqli, '{CALL DeleteSession(?,?)}', $params);

                if($stmt === false){
                    echo 'Data could not be retrieved from database.';
                    die(print_r(sqlsrv_errors(), true));
                }
                else{
                    echo 'Session deleted.';
                }

                $mysqli->close();
                break;
            case 'editGetVals':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error;
                }

                $MemberId = $_SESSION['user']['id'];
                $SessionId = $_SESSION['editRowId'];

				$strQuery = "CALL EditGetVals('".$MemberId."', '".$SessionId."');";

                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (".$mysqli->errno.") ".$mysqli->error;
                }
				
				do {
					/* store first result set */
					if ($result = $mysqli->store_result()) {
						while ($row = $result->fetch_row()) {
							printf($row[0]."#".$row[1]."#".$row[2]."#".$row[3]."#".$row[4]."#".$row[5]."#".$row[6]."#".$row[7]."#".$row[8]."#".$row[9]."#"
							.$row[10]."#".$row[11]);
						}
						$result->free();
					}
				} while ($mysqli->next_result());

                $mysqli->close();
                break;
        }
    }
    catch (Exception $e){
        echo 'Caught exception: '.$e->getMessage();
    }
?>