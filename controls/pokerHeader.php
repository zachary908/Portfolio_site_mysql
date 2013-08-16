<html>
<head>
	<title>My Poker Page</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/jquery-ui-1.10.3.custom.js"></script>
	<script src="../scripts/pokerjs.js"></script>
	<script src="../RGraph/libraries/RGraph.common.core.js"></script>
	<script src="../RGraph/libraries/RGraph.common.tooltips.js"></script>
	<script src="../RGraph/libraries/RGraph.common.dynamic.js"></script>
	<script src="../RGraph/libraries/RGraph.common.key.js"></script>
	<script src="../RGraph/libraries/RGraph.drawing.rect.js"></script>
	<script src="../RGraph/libraries/RGraph.bar.js"></script>
	<script src="../RGraph/libraries/RGraph.pie.js"></script>
	<script src="../RGraph/libraries/RGraph.line.js"></script>
	<script src="../RGraph/libraries/RGraph.scatter.js"></script>
	<link rel="stylesheet" type="text/css" href="../styles/pokerStyle.css" />
	<link rel="stylesheet" href="../css/ui-lightness/jquery-ui-1.10.3.custom.css" />
	<link rel="stylesheet" href="../RGraph/css/animations.css" />
	<link rel="stylesheet" href="../RGraph/css/ModalDialog.css" />
	<link rel="stylesheet" href="../RGraph/css/website.css" />
</head>

<body>
<?php
	if(basename($_SERVER['PHP_SELF']) == "pokerAddSession.php"){
		echo '<script>
			locListDest = "locationOptions";
			locTypeDest = "locTypeVal";
			gameListDest = "gameOptions";
			limitListDest = "limitOptions";
			</script>';
	}
	else if(basename($_SERVER['PHP_SELF']) == "pokerEditSession.php"){
		echo '<script>
			locListDest = "editLocationOptions";
			locTypeDest = "editLocTypeVal";
			gameListDest = "editGameOptions";
			limitListDest = "editLimitOptions";
			</script>';
	}
	else if(basename($_SERVER['PHP_SELF']) == "pokerSessions.php"){
		echo '<script>
			statusDiv = "sessStatus";
			dataDiv = "sessData";
			tblBodyName = "sessTableBody";
			</script>';
	}
	else if(basename($_SERVER['PHP_SELF']) == "pokerSummary.php"){
		echo '<script>
			statusDiv = "sumStatus";
			dataDiv = "sumData";
			tblBodyName = "sumTableBody";
			</script>';
	}
?>
	<div id="fullCover2"></div>
	<form id="statusForm" action="../pokerSetStatus.php" method="POST" style="position: absolute">
		<input id="status" name="status" type="hidden" value="" />
	</form>
	<div id="locationReturn" style="display:none"></div>
	<div id="gameReturn" style="display:none"></div>
	<div id="limitReturn" style="display:none"></div>
	<div class="modalWrap" id="modalWrap2">
	
		<!-- ADDLOCATION MODAL -->
		<div class="modalGlobal" id="addLocationModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Add Location</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">New Location Name:</div>
				</div>
				<input id="addLocName" type="text" onkeypress="checkEnter(event, 'addLocOption');">
			</div>
			<div class="modalRow">
				<form name="locationType">
					<input type="radio" name="locTypeRadio" id="live" value=0 checked="checked">Live
					<input type="radio" name="locTypeRadio" id="online" value=1>Online
				</form>
			</div>
			<div id="addLocErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="addLocOption();">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal2('addLocationModal')">Cancel</button>
			</div>
		</div>
		
		<!-- ADDGAME MODAL -->
		<div class="modalGlobal" id="addGameModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Add Game Type</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">New Game Type:</div>
				</div>
				<input id="addGame" type="text" onkeypress="checkEnter(event, 'addGameOption');">
			</div>
			<div id="addGameErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="addGameOption()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal2('addGameModal')">Cancel</button>
			</div>
		</div>
		
		<!-- ADDLIMIT MODAL -->
		<div class="modalGlobal" id="addLimitModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Add Limit</div>
			</div>
			<div class="modalRow">
				<div class="modalLabelWrap">
					<div class="modalLabel">New Limit:</div>
				</div>
				<input id="addLimit" type="text" onkeypress="checkEnter(event, 'addLimitOption');">
			</div>
			<div id="addLimitErrLbl"></div><br>
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="addLimitOption()">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal2('addLimitModal')">Cancel</button>
			</div>
		</div>
		
		<!-- CONFIRM DELETE MODAL -->
		<div class="modalGlobal" id="confirmDltModal">
			<div class="modalHeaderWrap">
				<div class="modalHeader">Confirm Session Delete</div>
			</div>
			<div class="modalRow">
				Are you sure you want to delete the session that started on <br>
				<span id="dltRowStartDate"></span> ?<br>
			</div>
			<input type="hidden" id="dltRowId" />
			<div class="modalBtnWrap">
				<button class="modalBtn" onclick="deleteRow(dltRowId.value)">Submit</button>
				<button class="modalBtn" onclick="clrCloseModal2('confirmDltModal')">Cancel</button>
			</div>
		</div>
		
	</div><!-- END modalWrap -->
	
	<!-- BEGIN HEADER -->
	<div class="headerBkgd">
		<div class="headerWrap">
			<div class="header">
				<div class="left">
					<div>
						Me Logo Here<br>
						and home link
					</div>
				</div>
				<div class="center fleft">
					<a href="pokerSummary.php" class="navSect fleft 
						<?php			
							if(basename($_SERVER['PHP_SELF']) == "pokerSummary.php")
								echo ' selected';
						?>
					">summary</a>
					<a href="pokerSessions.php" class="navSect fleft
						<?php			
							if(basename($_SERVER['PHP_SELF']) == "pokerSessions.php")
								echo ' selected';
						?>
					">sessions</a>
					<a href="pokerAddSession.php" class="navSect fleft
						<?php			
							if(basename($_SERVER['PHP_SELF']) == "pokerAddSession.php")
								echo ' selected';
						?>
					">add session</a>
				</div>
				<div class="right floatingFix">
					<div class="fright">
					<?php
						if(isset($_SESSION['user']['name'])){
							echo $_SESSION['user']['name'];
						}
					?>
					</div><br>
					<div class="fright">
						<button onclick="logout()">Log out</button>
					</div>
				</div>
			</div>
		</div>
	</div>