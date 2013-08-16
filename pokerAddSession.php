<?php
	include 'controls/pokerHeader.php';
?>
	
	<div class="modalHeaderWrap">
		<div class="modalHeader">
			New Session
		</div>
	</div>
	
	<!-------------------------------------->
	<div class="modalRow">	
		<div class="modalLabelWrap">
			<div class="modalLabel">Start Date:</div>
		</div>
		<input type="text" id="datepicker" />
		<script>
			$("#datepicker").datepicker();
			$("#datepicker").datepicker("setDate", new Date());
		</script>
	</div>
	<!-------------------------------------->
	<div class="modalRow">	
		<div class="modalLabelWrap">
			<div class="modalLabel">Start Time:</div>
		</div>
		<!-- INITIALLY SELECT STHOUR/STMIN FROM CURRENT TIME, ROUNDED TO NEAREST 5 MIN -->
		<select id="stHour">
			<option name="stHourOption">1</option>
			<option name="stHourOption">2</option>
			<option name="stHourOption">3</option>
			<option name="stHourOption">4</option>
			<option name="stHourOption">5</option>
			<option name="stHourOption">6</option>
			<option name="stHourOption">7</option>
			<option name="stHourOption">8</option>
			<option name="stHourOption">9</option>
			<option name="stHourOption">10</option>
			<option name="stHourOption">11</option>
			<option name="stHourOption">12</option>
		</select>
		<span>:</span>
		<select id="stMin">
			<option name="stMinOption">00</option>
			<option name="stMinOption">05</option>
			<option name="stMinOption">10</option>
			<option name="stMinOption">15</option>
			<option name="stMinOption">20</option>
			<option name="stMinOption">25</option>
			<option name="stMinOption">30</option>
			<option name="stMinOption">35</option>
			<option name="stMinOption">40</option>
			<option name="stMinOption">45</option>
			<option name="stMinOption">50</option>
			<option name="stMinOption">55</option>
		</select>
		<select id="stAmPm">
			<option name="stAmPmOption">am</option>
			<option name="stAmPmOption">pm</option>
		</select>
		<!-- FUNCTION THAT GETS CURRENT TIME AND SETS THE SELECTED START HRS/MIN/AMPM -->
		<script>
			getTime('stHourOption', 'stMinOption', 'stAmPmOption');
		</script>
	</div>
	<!-------------------------------------->
	<div class="modalRow">	
		<div class="modalLabelWrap">
			<div class="modalLabel">End Date:</div>
		</div>
		<input type="text" id="datepicker1" />
		<script>
			$("#datepicker1").datepicker();
			$("#datepicker1").datepicker("setDate", new Date());
		</script>
	</div>
	<!-------------------------------------->
	<div class="modalRow">	
		<div class="modalLabelWrap">
			<div class="modalLabel">End Time:</div>
		</div>
		<select id="endHour">
			<option name="endHrOption">1</option>
			<option name="endHrOption">2</option>
			<option name="endHrOption">3</option>
			<option name="endHrOption">4</option>
			<option name="endHrOption">5</option>
			<option name="endHrOption">6</option>
			<option name="endHrOption">7</option>
			<option name="endHrOption">8</option>
			<option name="endHrOption">9</option>
			<option name="endHrOption">10</option>
			<option name="endHrOption">11</option>
			<option name="endHrOption">12</option>
		</select>
		<span>:</span>
		<select id="endMin">
			<option name="endMinOption">00</option>
			<option name="endMinOption">05</option>
			<option name="endMinOption">10</option>
			<option name="endMinOption">15</option>
			<option name="endMinOption">20</option>
			<option name="endMinOption">25</option>
			<option name="endMinOption">30</option>
			<option name="endMinOption">35</option>
			<option name="endMinOption">40</option>
			<option name="endMinOption">45</option>
			<option name="endMinOption">50</option>
			<option name="endMinOption">55</option>
		</select>
		<select id="endAmPm">
			<option name="endAmPmOption">am</option>
			<option name="endAmPmOption">pm</option>
		</select>
		<script>
			getTime('endHrOption', 'endMinOption', 'endAmPmOption');
		</script>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Location:</div>
		</div>
		<select id="locationOptions" style="width:150px" onchange="showLocType()"></select>
		<script>getLocList()</script>
		
		<span onclick="showModal2('addLocationModal', 'addLocName')" style="cursor:pointer">Add Location</span>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Location Type:</div>
		</div>
		<script>$(document).ready(function(){
			showLocType();
			});
		</script>

		<div id="locTypeVal"></div>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Game Type:</div>
		</div>	
		<select id="gameOptions" style="width:150px"></select>
		<script>getList("game", "gameOptions")</script>
		
		<span onclick="showModal2('addGameModal', 'addGame')" style="cursor:pointer">Add Game Type</span>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel" style="visibility:hidden">Game Type:</div>
		</div>
		<div>
			<form name="ringTourType">
				<input type="radio" name="ringTourRadio" id="ring" value=0 checked="checked">Ring
				<input type="radio" name="ringTourRadio" id="tourney" value=1>Tournament
			</form>
		</div>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Limits:</div>
		</div>	
		<select id="limitOptions" style="width:150px"></select>
		<script>getList("limit", "limitOptions")</script>
		
		<span onclick="showModal2('addLimitModal', 'addLimit')" style="cursor:pointer">Add Limit</span>
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Buy In:</div>
		</div>
		<span>$</span>
		<input id="buyin" type="text" style="width:138px" onkeypress="checkEnter(event, 'addSession');" />
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Cash Out:</div>
		</div>
		<span>$</span>
		<input id="cashout" type="text" style="width:138px" onkeypress="checkEnter(event, 'addSession');" />
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Place:</div>
		</div>	
		<input id="place" type="text" onkeypress="checkEnter(event, 'addSession');" />
	</div>
	<!-------------------------------------->
	<div class="modalRow">
		<div class="modalLabelWrap">
			<div class="modalLabel">Note:</div>
		</div>
		<textarea id="notes" rows="5" cols="38" maxlength="240"></textarea>
	</div>
	<!-------------------------------------->
	<div id='addSessErrLbl'></div><br>
	<button class="modalBtn" onclick="addSession()">Submit</button>
	<button class="modalBtn" onclick="$('#status').val('Add session cancelled.'); $('#statusForm').submit()">Cancel</button>
	<!-------------------------------------->
	<div id="test1"></div><br>
	<div id="test2"></div><br>
	
<?php
	include 'controls/pokerFooter.php';
?>