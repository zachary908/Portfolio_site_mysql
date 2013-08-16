
<script src="scripts/javascript.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="scripts/jquery-1.8.3.js"></script>

<div class="navWorkWrap floatingFix">
	<div class="navWorkCont floatingFix">
		<div>
			<input id="leftArrow" type="image" src="images/arrow4_left.png" style="float: left; cursor: pointer;" onclick="setIndex('left')"></input>
		</div>
		
		<div class="navThumbsWrap">
			<div class="navThumb">
				<input class="navThumbImg" id="navThumbImg1" type="image" src="images/navThumbVIP.png" style="cursor: pointer;" onclick="applyBorder(1);"></input>
			</div>
			<div class="navThumb">
				<input class="navThumbImg" id="navThumbImg2" type="image" src="images/navThumbIG.png" style="cursor: pointer;" onclick="applyBorder(2);"></input>
			</div>
			<div class="navThumb">			
				<input class="navThumbImg" id="navThumbImg3" type="image" src="images/endoodle-thumb.png" style="cursor: pointer;" onclick="applyBorder(3);"></input>
			</div>
			<div class="navThumb">
				<input class="navThumbImg" id="navThumbImg4" type="image" src="images/IG_home.png" style="cursor: pointer;" onclick="applyBorder(4);"></input>
			</div>
		</div>
		
		<div>
		<input id="rightArrow" type="image" src="images/arrow4_right.png" style="float: right; cursor: pointer;" onclick="setIndex('right')"></input>
		</div>
	</div>
</div>
