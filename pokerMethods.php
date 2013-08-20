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
                    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
                }

                if (!$mysqli->query("DROP TABLE IF EXISTS test") ||
                    !$mysqli->query("CREATE TABLE test(id INT, lbl VARCHAR(45))") ||
                    !$mysqli->query("INSERT INTO test(id, lbl) VALUES (1, '$phpVal1'), (2, '$phpVal2'), (3, '$phpVal3')")) {
                    echo "Table creation failed: (" . $mysqli->errno . ") " . $mysqli->error;
                }

                if (!$mysqli->query("DROP PROCEDURE IF EXISTS p") ||
                    !$mysqli->query("CREATE PROCEDURE p() READS SQL DATA BEGIN SELECT * FROM test; END;")) {
                    echo "Stored procedure creation failed: (" . $mysqli->errno . ") " . $mysqli->error;
                }

                if (!$mysqli->multi_query("CALL p()")) {
                    echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
                }

                do {
                    if ($res = $mysqli->store_result()) {
                        printf("---\n");
                        var_dump($res->fetch_all());
                        $res->free();
                    } else {
                        if ($mysqli->errno) {
                            echo "Store failed: (" . $mysqli->errno . ") " . $mysqli->error;
                        }
                    }
                } while ($mysqli->more_results() && $mysqli->next_result());

                $mysqli->close();
                break;
            case 'register':
                // CONNECT TO DB
                $mysqli = new mysqli($myServer, $myUser, $myPwd, $myDb);

                if($mysqli->connect_errno){
                    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
                }

                // ENCRYPT EMAIL, USERNAME, PWD AND CREATE VARS WITH NAMES = DB NAMES
                $Email = strtolower($_POST['regEmail']);
                //$Email = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Email, MCRYPT_MODE_CBC, md5(md5($encryptKey))));
                $Username = $_POST['regUsername'];
                $Password = $_POST['regPasswd'];
                //$Password = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Password, MCRYPT_MODE_CBC, md5(md5($encryptKey))));

                $regMsg = 0;

                $strQuery = "CALL RegisterUser('" . $Email . "', '" . $Username . "', '" . $Password . "', @regMsg)";

                echo $strQuery."\n";

                if (!$mysqli->multi_query($strQuery)) {
                    echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
                }

                do {
                    if ($res = $mysqli->store_result()) {
                        printf("---\n");
                        var_dump($res->fetch_all());
                        $res->free();
                    } else {
                        if ($mysqli->errno) {
                            echo "Store failed: (" . $mysqli->errno . ") " . $mysqli->error;
                        }
                    }
                } while ($mysqli->more_results() && $mysqli->next_result());

                $mysqli->close();
                break;

            case 'login':
                // $_SESSION['USER']['NAME'] AND $_SESSION['USER']['ID'] ARE SET IN THIS METHOD

                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $Username = $_POST['logUsername'];

                $Password = $_POST['logPasswd'];
                $Password = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($encryptKey), $Password, MCRYPT_MODE_CBC, md5(md5($encryptKey))));

                $logMsg = 0;

                $params = array(
                    array($Username, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('max')),
                    array($Password, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('max')),
                    array($logMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_BIT)
                );

                $stmt = mysqli_query($mysqli, '{CALL Login(?,?,?)}', $params);

                /*$res = mysql_query('call sp_sel_test()');
                if ($res === FALSE) {
                        die(mysql_error());
                }*/

                if($stmt === false){
                    echo 'Data could not be entered into database.';
                    die(print_r(sqlsrv_errors(), true));
                }

                //make a select statement to get the user id
                $sql = "SELECT Id FROM Members
                        WHERE Username = '$Username'";

                $stmt = mysqli_query($mysqli, $sql);

                if($stmt === false){
                    echo 'Data could not be retrieved from database.';
                    die(print_r(sqlsrv_errors(), true));
                }

                while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC)){
                    $_SESSION['user']['id'] = $row['Id'];
                }

                if($logMsg == 0){
                    $_SESSION['user']['name'] = $Username;
                    echo "";
                }
                else{
                    echo "That username is not registered.";
                }

                $mysqli->close();
                break;

            case 'logout':
                session_destroy();
                break;

            case 'getListAJAX':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                // NOTE: STORED PROCEDURE WILL ALSO RETRIEVE DATA FOR DEFAULT USER
                $MemberId = $_SESSION['user']['id'];
                $ListType = $_REQUEST['listType'];
                $getListMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($ListType, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($getListMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_BIT)
                );

                $stmt = mysqli_query($mysqli, '{CALL GetList(?,?,?)}', $params);

                if($stmt === false){
                    echo "Data could not be retrieved from database.";
                    die(print_r(sqlsrv_errors(), true));
                }

                if($getListMsg == 1){
                    echo "No data was retrieved from database.";
                }

                $x = 0;

                while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC)){
                    if($ListType == "game"){
                        echo "<option name='gameOption'>".$row[$x]."</option>\n";
                        $x+1;
                    }
                    else{
                        echo "<option name='limitOption'>".$row[$x]."</option>\n";
                    }
                }

                $mysqli->close();
                break;

            case 'getLocListAJAX':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                // NOTE: STORED PROCEDURE WILL ALSO RETRIEVE DATA FOR DEFAULT USER
                $MemberId = $_SESSION['user']['id'];
                $getListMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($getListMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_BIT)
                );

                $stmt = mysqli_query($mysqli, '{CALL GetLocList(?,?)}', $params);

                if($stmt === false){
                    echo "Data could not be retrieved from database.";
                    die(print_r(sqlsrv_errors(), true));
                }

                if($getListMsg == 1){
                    echo "No data was retrieved from database.";
                }

                while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                    echo "<span name=\"location\">".$row['Location']."</span><span name=\"locType\">".$row['LocType']."</span>";
                }

                $mysqli->close();
                break;

            case 'addLocOption':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $MemberId = $_SESSION['user']['id'];
                $PhpLocNameVal = $_REQUEST['phpLocNameVal'];
                $PhpLocType = $_REQUEST['phpLocType'];
                $AddLocMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($PhpLocNameVal, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($PhpLocType, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($AddLocMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT)
                );

                $stmt = mysqli_query($mysqli, '{CALL AddLocOption(?,?,?,?)}', $params);

                if($stmt == false){
                    die(print_r(sqlsrv_errors(), true));
                }

                if($AddLocMsg == 1){
                    echo "That option is already listed!";
                }

                if($AddLocMsg == 2){
                    echo "You have exceeded the maximum number of listed items!";
                }

                $mysqli->close();
                break;

            case 'addLimitOption':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $PhpLimitVal = $_REQUEST['phpLimitVal'];
                $MemberId = $_SESSION['user']['id'];
                $AddLimitMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($PhpLimitVal, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($AddLimitMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT)
                );

                $stmt = mysqli_query($mysqli, '{CALL AddLimitOption(?,?,?)}', $params);


                if($stmt == false){
                    die(print_r(sqlsrv_errors(), true));
                }

                if($AddLimitMsg == 1){
                    echo "That option is already listed!";
                }

                if($AddLimitMsg == 2){
                    echo "You have exceeded the maximum number of listed items!";
                }

                $x = 0;

                $mysqli->close();
                break;

            case 'addGameOption':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $PhpGameVal = $_REQUEST['phpGameVal'];
                $MemberId = $_SESSION['user']['id'];
                $AddGameMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($PhpGameVal, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_VARCHAR('MAX')),
                    array($AddGameMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT)
                );

                $stmt = mysqli_query($mysqli, '{CALL AddGameOption(?,?,?)}', $params);

                if($stmt == false){
                    die(print_r(sqlsrv_errors(), true));
                }

                if($AddGameMsg == 1){
                    echo "That option is already listed!";
                }

                if($AddGameMsg == 2){
                    echo "You have exceeded the maximum number of listed items!";
                }

                $x = 0;

                $mysqli->close();
                break;

            case 'addSession':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
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

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
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
                    array($AddSessionMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_INT),
                );

                $stmt = mysqli_query($mysqli, '{CALL AddSession(?,?,?,?,?,?,?,?,?,?,?,?)}', $params);

                if($stmt == false){
                    die(print_r(sqlsrv_errors(), true));
                }

                if($AddSessionMsg == 1){
                    echo "End time cannot be before start time!";
                }

                $mysqli->close();
                break;

            case 'editSession':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
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
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $MemberId = $_SESSION['user']['id'];
                $GetSessionsMsg = 0;

                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                    array($GetSessionsMsg, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_INT, SQLSRV_SQLTYPE_BIT)
                );

                $stmt = mysqli_query($mysqli, '{CALL GetSessions(?,?)}', $params);

                if($stmt === false){
                    echo 'Data could not be retrieved from database.';
                    die(print_r(sqlsrv_errors(), true));
                }

                // ADD AN OUTPUT PARAM- IF OUTPUT PARAM = 1, STATUS MSG READS: "NO SESSIONS FOUND, YOU SHOULD ADD A SESSION",
                // OTHERWISE, ENTER THIS WHILE LOOP
                if($GetSessionsMsg == 0){
                    while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                        echo $row['Id']."#"
                            .$row['StartTime']."#"
                            .$row['Location']."#"
                            .$row['GameType']."#"
                            .$row['Limits']."#"
                            .$row['Duration']."#"
                            .$row['BuyIn']."#"
                            .$row['CashOut']."#"
                            .$row['RingTour']."#"
                            .$row['Place']."#"
                            .$row['Rate']."#"
                            .$row['Return']."#"
                            .$row['LocType']."#"
                            .$row['Notes']."%";
                    }
                }
                else{
                    echo $GetSessionsMsg;
                }

                $mysqli->close();
                break;
            case 'deleteSessionAJAX':
                // CONNECT TO DB
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
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
                $mysqli = mysqli_connect($myServer, $myUser, $myPwd, $myDb);

                if (mysqli_connect_errno()) {
                    printf("Can't connect to localhost. Error: %s\n", mysqli_connect_error());
                    exit();
                }

                $MemberId = $_SESSION['user']['id'];
                $SessionId = $_SESSION['editRowId'];

                // GET SESSION START DATE AND ENTER INTO START DATE FIELD
                $params = array(
                    array($MemberId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                    array($SessionId, SQLSRV_PARAM_IN, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR), SQLSRV_SQLTYPE_UNIQUEIDENTIFIER),
                );

                $stmt = mysqli_query($mysqli, '{CALL EditGetVals(?,?)}', $params);

                if($stmt === false){
                    echo 'Data could not be retrieved from database.';
                    die(print_r(sqlsrv_errors(), true));
                }

                while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                    echo $row['StartDate']."#"
                        .$row['StartTime']."#"
                        .$row['EndDate']."#"
                        .$row['EndTime']."#"
                        .$row['Location']."#"
                        .$row['GameType']."#"
                        .$row['RingTour']."#"
                        .$row['Limits']."#"
                        .$row['BuyIn']."#"
                        .$row['CashOut']."#"
                        .$row['Place']."#"
                        .$row['Notes']."#";
                }

                $mysqli->close();
                break;
        }
    }
    catch (Exception $e){
        echo 'Caught exception: '.$e->getMessage();
    }
?>