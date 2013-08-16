<?php
	include 'controls/pokerHeader.php';
?>
	<!-- THIS HIDDEN TABLE HOLDS ALL DATA FOR CURRENT USER -->
	<div id="sumData" style="position: absolute; visibility: hidden"></div>

	<!-- THIS HIDDEN TABLE HOLDS FILTERED DATA -->
	<table id="summary" class="inactive">
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
				<th>R/T</th>
				<th>Place</th>
				<th>Rate</th>
				<th>Return</th>
				<th>Live/Online</th>
				<th>Notes</th>
			</tr>
		</tbody>
		<tbody id="sumTableBody"></tbody>
	</table>
	
	<div class="filterWrap">
		<div class="sumFilter floatingFix">
			<div class="fleft">
				<div class="sumFilterLbl fleft">Select a category to see results...</div>
				<select id="baseTbl" onchange="fillTblSelect(); showSumTbl('bySess')">
					<option selected="true">Overall</option>
					<option>Live</option>
					<option>Online</option>
					<option>Cash</option>
					<option>Tournament</option>
				</select><br><br>
			</div>
			<div class="fleft">
				<div class="sumFilterLbl fleft" style="margin-left: 50px">Select up to 4 categories to compare...</div>
				<select id="compareTbl" multiple class="multiSelect"></select>
				<button onclick="showSumTbl()">GO</button>
			</div>
		</div>
	</div>
	
	<div class="sumTblGraphWrap floatingFix">
		<div class="sumTblWrap">
			<table class="sumTotTbl active" id="totals" name="sumTotTbl">
				<tbody>
					<tr>
						<th colspan="4">Overall Totals</th>
					</tr>
					<tr>
						<td class="tblLbl">Total Earnings:</td><td id="totEarn" class="tblData"></td>
						<td class="tblLbl">Tot. Hours Played:</td><td id="totHrs" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumTotTbl inactive" id="totalsLive" name="sumTotTbl">
				<tbody>
					<tr>
						<th colspan="4">Live Totals</th>
					</tr>
					<tr>
						<td class="tblLbl">Total Live Earnings</td><td id="totEarnLive" class="tblData"></td>
						<td class="tblLbl">Tot. Hrs. Played Live</td><td id="totHrsLive" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumTotTbl inactive" id="totalsOnline" name="sumTotTbl">
				<tbody>
					<tr>
						<th colspan="4">Online Totals</th>
					</tr>
					<tr>
						<td class="tblLbl">Total Online Earnings</td><td id="totEarnOnline" class="tblData"></td>
						<td class="tblLbl">Tot. Hrs. Played Online</td><td id="totHrsOnline" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumTotTbl inactive" id="totalsCash" name="sumTotTbl">
				<tbody>
					<tr>
						<th colspan="4">Cash Totals</th>
					</tr>
					<tr>
						<td class="tblLbl">Total Cash Game Earnings</td><td id="totEarnCash" class="tblData"></td>
						<td class="tblLbl">Tot. Hrs. Played in Cash Games</td><td id="totHrsCash" class="tblData"></td>
				</tbody>
			</table>
			
			<table class="sumTotTbl inactive" id="totalsTourney" name="sumTotTbl">
				<tbody>
					<tr>
						<th colspan="4">Tournament Totals</th>
					</tr>
					<tr>
						<td class="tblLbl">Total Tournament Earnings</td><td id="totEarnTour" class="tblData"></td>
						<td class="tblLbl">Tot. Hrs. Played in Tournaments</td><td id="totHrsTour" class="tblData"></td>
					</tr>
				</tbody>
			</table>
		</div> <!-- END sumTblWrap -->
		
		<div class="sumGraphWrap">
			<canvas id="cvs1" width="800px" height="400px"></canvas>
		</div><!-- END sumGraphWrap -->
	</div><!-- END sumTblGraphWrap -->
	
	<div class="sumTblGraphWrap floatingFix">
		<div class="sumTblWrap">
			<table class="sumAvgTbl active" id="avgs" name="sumAvgTbl">
				<tbody>
					<tr>
						<th colspan="6">Overall Averages</th>
					</tr>
					<tr>
						<td class="tblLbl">Avg. Earnings Per Session:</td><td id="avgEarn" class="tblData"></td>
						<td class="tblLbl">Avg. Hours Per Session:</td><td id="avgHrs" class="tblData"></td>
						<td class="tblLbl">Avg. Rate Per Session:</td><td id="avgRate" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumAvgTbl inactive" id="avgsLive" name="sumAvgTbl">
				<tbody>
					<tr>
						<th colspan="6">Live Averages</th>
					</tr>
					<tr>
						<td class="tblLbl">Avg. Earnings Per Session:</td><td id="avgEarnLive" class="tblData"></td>
						<td class="tblLbl">Avg. Hours Per Session:</td><td id="avgHrsLive" class="tblData"></td>
						<td class="tblLbl">Avg. Rate Per Session:</td><td id="avgRateLive" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumAvgTbl inactive" id="avgsOnline" name="sumAvgTbl">
				<tbody>
					<tr>
						<th colspan="6">Online Averages</th>
					</tr>
					<tr>
						<td class="tblLbl">Avg. Earnings Per Session:</td><td id="avgEarnOnline" class="tblData"></td>
						<td class="tblLbl">Avg. Hours Per Session:</td><td id="avgHrsOnline" class="tblData"></td>
						<td class="tblLbl">Avg. Rate Per Session:</td><td id="avgRateOnline" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumAvgTbl inactive" id="avgsCash" name="sumAvgTbl">
				<tbody>
					<tr>
						<th colspan="6">Cash Averages</th>
					</tr>
					<tr>
						<td class="tblLbl">Avg. Earnings Per Session:</td><td id="avgEarnCash" class="tblData"></td>
						<td class="tblLbl">Avg. Hours Per Session:</td><td id="avgHrsCash" class="tblData"></td>
						<td class="tblLbl">Avg. Rate Per Session:</td><td id="avgRateCash" class="tblData"></td>
					</tr>
				</tbody>
			</table>
			
			<table class="sumAvgTbl inactive" id="avgsTourney" name="sumAvgTbl">
				<tbody>
					<tr>
						<th colspan="6">Tournament Averages</th>
					</tr>
					<tr>
						<td class="tblLbl">Avg. Earnings Per Tournament:</td><td id="avgEarnTour" class="tblData"></td>
						<td class="tblLbl">Avg. Hours Per Tournament:</td><td id="avgHrsTour" class="tblData"></td>
						<td class="tblLbl">Avg. Rate Per Tournament:</td><td id="avgRateTour" class="tblData"></td>
					</tr>
				</tbody>
			</table>
		</div><!-- END sumAvgTblWrap -->
		
		<div class="sumGraphWrap">
			<canvas id="cvs2" width="800px" height="400px"></canvas>
		</div><!-- END sumGraphWrap -->
	</div><!-- END sumTblGraphWrap -->
	
	<script>
		$(document).ready(getSessionsAndSum());
	</script>

<?php
	include 'controls/pokerFooter.php';
?>