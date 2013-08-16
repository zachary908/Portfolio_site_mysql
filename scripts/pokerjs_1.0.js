// GENERAL-PURPOSE FUNCTIONS
// ----------------------------------------

function debug(thing){
	alert("ID: " + thing.id + " NAME: " + thing.name + " VALUE: " + thing.value);
}

function checkEnter(event, funcName){
	var keycode = (event.keyCode) ? event.keyCode : event.which;
	if(keycode == '13')
	{
		window[funcName]();
	}
}

function checkEmail(emailAddr){	
	emailAddr = $.trim(emailAddr);
	var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

	if(emailRegEx.test(emailAddr)){
		return true;
	}
	else{
		return false;
	}
}

function checkPwd(pwdEntry){
	pwdEntry = $.trim(pwdEntry);
	if(pwdEntry.length >= 6 && pwdEntry.length <= 20){
		return true;
	}
	else{
		return false;
	}
}

function checkName(usernameEntry){
	usernameEntry = $.trim(usernameEntry);
	if(usernameEntry.length >= 3 && usernameEntry.length <= 20){
		return true;
	}
	else{
		return false;
	}
}

function checkChars(entry){
	entry = $.trim(entry);
	var charRegEx = /[@#%^&*()]/;
	
	if(charRegEx.test(entry)){
		return false;
	}
	else{
		return true;
	}
}

function showModal(elementId, defaultInput){
	var whichElement = document.getElementById(elementId);
	
	if(whichElement != null && whichElement != undefined){
		whichElement.style.display = 'block';
		whichElement.parentNode.className = 'modalWrap';
	}
	
	var cover = document.getElementById('fullCover');
	cover.style.visibility = 'visible';
	
	var wrap = document.getElementById('modalWrap');
	wrap.style.display = 'block';
	
	if(defaultInput != null && defaultInput != undefined){
		document.getElementById(defaultInput).focus();
	}
}

function showModal2(elementId, defaultInput){
	var whichElement = document.getElementById(elementId);
	
	if(whichElement != null && whichElement != undefined){
		whichElement.style.display = 'block';
		whichElement.parentNode.className = 'modalWrap';
	}
	
	var cover = document.getElementById('fullCover2');
	cover.style.visibility = 'visible';
	
	var wrap = document.getElementById('modalWrap2');
	wrap.style.display = 'block';
	
	if(defaultInput != null && defaultInput != undefined){
		document.getElementById(defaultInput).focus();
	}
}

function hideModal(elementId){
	var whichElement = document.getElementById(elementId);
	
	if(whichElement != null && whichElement != undefined){
		whichElement.style.display = 'none';
		whichElement.parentNode.className = 'modalWrap';
	}
	
	var wrap = document.getElementById('modalWrap');
	wrap.style.display = 'none';
	
	var cover = document.getElementById('fullCover');
	cover.style.visibility = 'hidden';
}

function hideModal2(elementId){
	var whichElement = document.getElementById(elementId);
	
	if(whichElement != null && whichElement != undefined){
		whichElement.style.display = 'none';
		whichElement.parentNode.className = 'modalWrap';
	}
	
	var wrap = document.getElementById('modalWrap2');
	wrap.style.display = 'none';
	
	var cover = document.getElementById('fullCover2');
	cover.style.visibility = 'hidden';
}

// CLEAR ALL INPUTS BEFORE CLOSING MODAL
function clrCloseModal(elementId){
	var whichElement = document.getElementById(elementId);

	if(whichElement != null && whichElement != undefined){
		$("#" + elementId + " input").val("");
		hideModal(elementId);
	}
}

// CLEAR ALL NON-RADIO INPUTS BEFORE CLOSING MODAL
function clrCloseModal2(elementId){
	var whichElement = document.getElementById(elementId);

	if(whichElement != null && whichElement != undefined){
		$("#" + elementId + " input[type != 'radio']").val("");
		hideModal2(elementId);
	}
}

function parseReq(newLocNameVal){
	var y = document.getElementsByName("location");
	var string1 = "";
	for(var j=0; j<y.length; j++){
		if(y[j].innerHTML == newLocNameVal){
			string1 = string1 + "<option selected>" + y[j].innerHTML + "</option>";
		}
		else{
			string1 = string1 + "<option>" + y[j].innerHTML + "</option>";
		}
	}
	document.getElementById("locationOptions").innerHTML = string1;
	showLocType();
}

function showLocType(){
	var x = document.getElementsByName("locType");
	var y = document.getElementsByName("location");
	var targetVal = $('#locationOptions').val();
	var targetIndex;
	for(var j=0; j<y.length; j++){
		if(targetVal == y[j].innerHTML){
			targetIndex = j;
			break;
		}
	}
	var testType = x[targetIndex].innerHTML
	if(testType == 0){
		$('#locTypeVal').html("Live");
	}
	else{
		$('#locTypeVal').html("Online");
	}
}

function getTime(hourOption, minOption, amPmOption){
	var today = new Date();
	var hour = today.getHours();
	var min = today.getMinutes();

	// PUT TIME OPTIONS INTO ARRAYS
	var hrs = document.getElementsByName(hourOption);
	var mins = document.getElementsByName(minOption);
	var amPms = document.getElementsByName(amPmOption);
	
	// ROUND CURRENT MINS TO NEAREST 5
	var roundMin = 5 * Math.round(min/5);
	
	// IF MIN ROUNDS UP TO 60, ADD 1 TO HOUR AND SET MIN TO 00
	if(min > 56 && min < 60){
		hour = hour + 1;
		roundMin = 0;
	}
	
	// IF CURRENT HR > 12, SUBTRACT 12 AND SET PM
	if(hour > 12){
		for(var k=0; k<amPms.length; k++){
			if(amPms[k].value == "pm"){
				amPms[k].selected = true;
				break;
			}
		}
		hour = hour - 12;
	}
	
	// MATCH CURRENT HR TO STHROPTION
	for(var i=0; i<hrs.length; i++){
		if(hrs[i].value == hour){
			hrs[i].selected = true;
			break;
		}
	}
	
	for(var j=0; j<mins.length; j++){
		if(mins[j].value == roundMin){
			mins[j].selected = true;
			break;
		}
	}
	
}

// DATABASE FUNCTIONS
// ----------------------------------------

function register(){
	$('#regErrLbl').html("");
	if($.trim($('#regEmail').val()) != "" && $.trim($('#regUsername').val()) != "" && $.trim($('#regPasswd').val()) != "" && $.trim($('#regConfirmPasswd').val()) != ""){
		if(checkEmail($('#regEmail').val())){
			if(checkName($('#regUsername').val())){
				if(checkPwd($('#regPasswd').val())){
					if($('#regPasswd').val() == $('#regConfirmPasswd').val()){
						$.post('pokerMethods.php', {method: 'register', regEmail: $.trim($('#regEmail').val().toLowerCase()), 
						regUsername: $.trim($('#regUsername').val()), regPasswd: $.trim($('#regPasswd').val())}, function(message){
							if(message != ""){
								$('#regErrLbl').html(message);
							}
							else{
								alert("You are registered, " + $('#regUsername').val() + "!");
								hideModal('registerModal');
								window.location = 'pokerSummary.php';
							}
						});
					}
					else{
						$('#regErrLbl').html("Passwords do not match.");
					}
				}
				else{
					$('#regErrLbl').html("Password must be 6 - 20 characters.");
				}
			}
			else{
				$('#regErrLbl').html("Username must be 3 - 20 characters.");
			}
		}
		else{
			$('#regErrLbl').html("Email does not appear to be valid.");
		}
	}
	else{
		$('#regErrLbl').html("Please complete all fields.");
	}
}

function login(){
	$('#logErrLbl').html("");
	if($.trim($('#logUsername').val()) != "" && $.trim($('#logPasswd').val()) != ""){
		if(checkName($('#logUsername').val())){
			if(checkPwd($('#logPasswd').val())){
				$.post('pokerMethods.php', {method: 'login', logUsername: $.trim($('#logUsername').val()), logPasswd: $.trim($('#logPasswd').val())}, function(message){
					if(message != ""){
						$('#logErrLbl').html(message);
					}
					else{
						alert("Welcome, " + $('#logUsername').val() + "!");
						hideModal('loginModal');
						window.location = 'pokerSummary.php';
					}
				});
			}
			else{
				$('#logErrLbl').html("Password must be 6 - 20 characters.");
			}
		}
		else{
			$('#logErrLbl').html("Username must be 3 - 20 characters.");
		}
	}
	else{
	$('#logErrLbl').html("Please complete all fields.")
	}
}

function logout(){
	$.post('pokerMethods.php', {method : 'logout'}, function(message){
		window.location = '../poker.php';
	});
}

function getList(listType, listElement, newOptionVal){
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// xmlhttp.onreadystatechange = function(){
		// if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			// document.getElementById(listElement).innerHTML = xmlhttp.responseText;
		// }
	// }
	
	// IF ASYNC SET TO TRUE, ONLY LAST LIST REQUEST WILL APPEAR
	xmlhttp.open("GET", "../pokerMethods.php?method=getListAJAX&listType=" + listType, false);
	xmlhttp.send();
	
	if(listType == "game"){
		document.getElementById('gameReturn').innerHTML = xmlhttp.responseText;
	}
	else{
		document.getElementById('limitReturn').innerHTML = xmlhttp.responseText;
	}
	
	var g;
	var l;
	if(listType == "game"){
		g = document.getElementsByName('gameOption');
		l = document.getElementById('gameOptions');
	}
	else{
		g = document.getElementsByName('limitOption');
		l = document.getElementById('limitOptions');
	}
	
	var string1;
	for(var i=0; i<g.length; i++){
		if(g[i].innerHTML == newOptionVal){
			string1 = string1 + "<option selected>" + g[i].innerHTML + "</option>";
		}
		else{
			string1 = string1 + "<option>" + g[i].innerHTML + "</option>";
		}
	}

	l.innerHTML = string1;

	//document.getElementById(listElement).innerHTML = xmlhttp.responseText;
}

function addGameOption(){
	$("#addGameErrLbl").html("");
	var newGameVal = $("#addGame").val();
	
	if(newGameVal != ""){
		if(checkChars(newGameVal)){
			$.post('pokerMethods.php', {method: 'addGameOption', phpGameVal: newGameVal}, function(message){
				if(message != ""){
					$("#addGameErrLbl").html(message);
				}
				else{
					clrCloseModal2("addGameModal");
					getList("game", "gameOptions", newGameVal);
				}
			});
		}
		else{
			$("#addGameErrLbl").html("Entry cannot contain special characters.");
		}
	}
	else{
		$("#addGameErrLbl").html("Please enter the game type you wish to add.");
	}
}

function addLimitOption(){
	$("#addLimitErrLbl").html("");
	var newLimitVal = $("#addLimit").val();
	
	if(newLimitVal != ""){
		if(checkChars(newLimitVal)){
			$.post('pokerMethods.php', {method: 'addLimitOption', phpLimitVal: newLimitVal}, function(message){
				if(message != ""){
					$("#addLimitErrLbl").html(message);
				}
				else{
					clrCloseModal2("addLimitModal");
					getList("limit", "limitOptions", newLimitVal);
				}
			});
		}
		else{
			$("#addLimitErrLbl").html("Entry cannot contain special characters.");
		}
	}
	else{
		$("#addLimitErrLbl").html("Please enter the limits you wish to add.");
	}
}

function getLocList(newLocName){
	$('#addSessErrLbl').html("");
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// xmlhttp.onreadystatechange = function(){
		// if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			// document.getElementById(listElement).innerHTML = xmlhttp.responseText;
			// var x=document.getElementById('test');
			// x.innerHTML = xmlhttp.responseText
		// }
	//}
	
	// IF ASYNC SET TO TRUE, ONLY LAST LIST REQUEST WILL APPEAR
	xmlhttp.open("GET", "../pokerMethods.php?method=getLocListAJAX", false);
	xmlhttp.send();
	
	//BECAUSE THE REQUEST IS NOT BEING SENT ASYNCHRONOUSLY, THE FOLLOWING LINES CAN BE
	//EXECUTED IMMEDIATELY AFTER THE xmlhttp.send(). THEY DO NOT HAVE TO BE PUT IN A
	//xmlhttp.onreadystatechange FUNCTION
	var x = document.getElementById('test');
	x.innerHTML = xmlhttp.responseText;
	parseReq(newLocName);
}

function addLocOption(){
	$("#addLocErrLbl").html("");
	var locTypeVal = $('input[name="locTypeRadio"]:checked').val();
	var newLocNameVal = $('#addLocName').val();
	if(newLocNameVal != ""){
		if(checkChars(newLocNameVal)){
			$.post('pokerMethods.php', {method: 'addLocOption', phpLocNameVal: newLocNameVal, phpLocType: locTypeVal}, function(message){
				if(message != ""){
					$("#addLocErrLbl").html(message);
				}
				else{
					clrCloseModal2('addLocationModal');
					getLocList(newLocNameVal);
				}
			});
		}
		else{
			$("#addLocErrLbl").html("Entry cannot contain special characters.");
		}
	}
	else{
		$("#addLocErrLbl").html("Please fill in the location name.")
	}
}

function jsToSqlDate(jsDateString){
	// PARSE STARTDATE STRING IN DEFAULT SQL FORMAT: mon dd yyyy hh:miAM (or PM)
	// JS STRING FORMAT: Wed Jul 03 2013 16:10:00 GMT-0400 (Eastern Standard Time)
	var wsRegEx = /\s/;
	var sqlStArray = jsDateString.split(wsRegEx);
	var sqlstring = "";
	var sqlMon = sqlStArray[1];
	var sqlDd = sqlStArray[2];
	var sqlYyyy = sqlStArray[3];
	var hhmmss24 = sqlStArray[4];
	
	var colRegEx = /:/;
	var sqlTimeArray = hhmmss24.split(colRegEx);
	var hh24 = sqlTimeArray[0];
	var mm12 = sqlTimeArray[1];
	var ss12 = sqlTimeArray[2];
	var hh12 = 0;
	var AmPm = "AM"
	
	if(hh24 > 12){
		hh12 = hh24 - 12;
		AmPm = "PM";
	}
	else if(hh24 == 00){
		hh12 = 12;
	}
	else{
		hh12 = hh24;
	}

	sqlstring = sqlMon + " " + sqlDd + " " + sqlYyyy + " " + hh12 + ":" + mm12 + AmPm;
	return sqlstring;
}

function addSession(){
// GET ALL VALS FROM FORM AND VALIDATE

// BUY-IN
	var buyinValid = $('#buyin').val();
// CASH OUT
	var cashout = $('#cashout').val();
// PLACE
	var place = $('#place').val();
	
	if(isNaN(buyinValid)){
		$('#addSessErrLbl').html("Buy-in entry can contain only numbers.");
	}
	else{
		if(isNaN(cashout)){
			$('#addSessErrLbl').html("Cash out entry can contain only numbers.");
		}
		else{
			if(isNaN(place)){
				$('#addSessErrLbl').html("Place entry can contain only numbers.");
			}
			else{
				var buyin = buyinValid;
			
			// START DATE	
				// CONSOLIDATE START DATE/TIME TO STANDARD JS DATE/TIME VALUE
				var stDateStr = $('#datepicker').val();
				// CAST STHRSTR AS NUMERIC DATA TYPE
				var stHrStr24 = parseInt($('#stHour').val());
				var stMinStr = $('#stMin').val();
				var stAmPmStr = $('#stAmPm').val().toString();
				
				if(stAmPmStr == "pm" && stHrStr24 < 12){
					stHrStr24 = stHrStr24.valueOf() + 12;
				}
				
				if(stAmPmStr == "am" && stHrStr24 == 12){
					stHrStr24 = 0;
				}
				
				if(stHrStr24 < 10){
					stHrStr24 = "0" + stHrStr24;
				}
				
				// PARSE THE DATE RETURNED BY DATEPICKER
				var splitRegEx = /\//;
				var stArray = stDateStr.split(splitRegEx);
				// JS MONTHS ARE NUMBERED STARTING AT 0
				var stMonth = stArray[0] - 1;
				var stDate = stArray[1];
				var stYear = stArray[2];
				
				// CREATE JS DATE OBJECT
				var startDate = new Date(stYear, stMonth, stDate, stHrStr24, stMinStr, 0, 0);
				var startDateStr = startDate.toString();
				
				// CONVERT JS DATE TO SQL FORMAT
				var sqlStartDateStr = jsToSqlDate(startDateStr);
				
			// END DATE
				var endDateStr = $('#datepicker1').val();
				// CAST ENDHRSTR AS NUMERIC DATA TYPE
				var endHrStr24 = parseInt($('#endHour').val());
				var endMinStr = $('#endMin').val();
				var endAmPmStr = $('#endAmPm').val();
				
				if(endAmPmStr == "pm" && endHrStr24 < 12){
					endHrStr24 = endHrStr24.valueOf() + 12;
				}
				
				if(endHrStr24 < 10){
					endHrStr24 = "0" + endHrStr24;
				}
				
				var endArray = endDateStr.split(splitRegEx);
				// JS MONTHS ARE NUMBERED STARTING AT 0
				var endMonth = endArray[0] - 1;
				var endDate = endArray[1];
				var endYear = endArray[2];
				
				// CREATE JS DATE OBJECT
				var endDate = new Date(endYear, endMonth, endDate, endHrStr24, endMinStr, 0, 0);
				var endDateStr = endDate.toString();
				
				// PARSE ENDDATE STRING IN DEFAULT SQL FORMAT: mon dd yyyy hh:miAM (or PM)
				var sqlEndDateStr = jsToSqlDate(endDateStr);
				
			// LOCATION
				var location = $('#locationOptions').val();

			// LOCATION TYPE DOES NOT NEED TO BE ADDED TO SESSION TABLE- 
			// IT IS ASSOCIATED WITH THE LOCATION NAME IN THE LOCATION TABLE

			// GAME TYPE
				var gameType = $('#gameOptions').val();

			// RING/TOURNEY
				var ringTour = $('input[name="ringTourRadio"]:checked').val();

			// LIMITS
				var limits = $('#limitOptions').val();
				
				$('#test1').html(startDate);
				$('#test2').html(sqlStartDateStr);
				
				// POST DATA TO DB
				$.post('pokerMethods.php', {method: 'addSession', phpStartDate: sqlStartDateStr, phpEndDate: sqlEndDateStr, phpLocation: location,
					phpGameType: gameType, phpRingTour: ringTour, phpLimits: limits, phpBuyin: buyin, phpCashout: cashout, phpPlace: place}, function(message){
						if(message != ""){
							$('#addSessErrLbl').html(message);
						}
						else{
							$('#status').val("Your session has been added!");
							document.getElementById('statusForm').submit();
						}
					
				});
				
			}
		}
	}
}

function getSessions(){
	$.post('pokerMethods.php', {method: 'getSessions'}, function (message){
		if(message != ""){
			$('#status').val(message);
		}
	});
}