<?php
	include 'controls/pokerHeader.php';
?>
	<form id="editSession" action="../pokerEditSession.php" method="POST" style="position: absolute">
		<input id="editRowId" name="editRowId" type="hidden" value="" />
	</form>
	
	<div id="sessData" style="position: absolute; visibility: hidden"></div>
	<div id="sessStatus" class="centerText">
		<?php
			if(isset($_SESSION["statusMsg"])){
				$statusMsg = $_SESSION["statusMsg"];
				echo $statusMsg;
			}
		?>
	</div><br>
	<div class="filterWrap">
		<div class="sessFilter floatingFix">
			<div class="fleft">
				<div id="filter" onkeypress="checkEnter(event, 'applyFilter($('#category').val()), $('#operator').val())">
					<div>Select a category to filter...</div>
					<select id="category" onchange="fillOperator(); fillFilterVal()">
						<option value="start">Start Time</option>
						<option value="location">Location</option>
						<option value="gameType">Game Type</option>
						<option value="limit">Limit</option>
						<option value="duration">Duration</option>
						<option value="buyin">Buy-In</option>
						<option value="cashout">Cash Out</option>
						<option value="ringTour">Ring/Tournament</option>
						<option value="place">Place</option>
						<option value="rate">Rate</option>
						<option value="return">Return</option>
						<option value="live">Live/Online</option>
					</select>
					<select id="operator" onchange="fillFilterVal()"></select>
					<span id="filterVal"></span>
					<button type="button" onclick="applyFilter($('#category').val(), $('#operator').val(), $('#filterInput1').val(), $('#filterInput2').val())">Apply Filter</button>
					<button type="button" onclick="fillTable(); fillOperator(); fillFilterVal()">Clear Filter</button>
					<div id="filterErrLbl"></div><br>
				</div>
			</div>
		</div>
	</div>
	
	<table id="sessions" class="sessionsTbl">
		<tbody>
			<tr>
				<th></th>
				<th>Start Time</th>
				<th>Location</th>
				<th>Game Type</th>
				<th>Limits</th>
				<th>Duration</th>
				<th>Buy In</th>
				<th>Cash Out</th>
				<th class="hide">R/T</th>
				<th>Place</th>
				<th>Rate</th>
				<th>Return</th>
				<th class="hide">Live/Online</th>
				<th>Notes</th>
				<th></th>
				<th></th>
			</tr>
		</tbody>
		<tbody id="sessTableBody"></tbody>
		<tbody>
			<tr>
				<td></td><td></td><td></td><td></td>
				<td>Hours Played:</td>
				<td></td>
				<td>Buy-In:</td>
				<td>Cash-Out:</td>
				<td>ROI:</td>
				<td>$/hour:</td>
			</tr>
		</tbody>
		
	</table>
	<button type="button" onclick="parent.location='pokerAddSession.php'">Add Session</button>
	<script>
		$(document).ready(getSessions());
		$(document).ready(fillOperator());
		$(document).ready(fillFilterVal());
	</script>
<?php
	include 'controls/pokerFooter.php';
?>