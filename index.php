<?php
	include 'controls/header.php';
?>

	<div class="inset">
		<div class="tagline">
			you've come to the right page.
		</div>

<!-- The images' div's are divided into 3 parts: the img itself, a transparent
cover, and a text description. The cover and text are shown when the IMG is 
moused over. They are hidden when the mouse is out of the COVER. -->

		<div class="homeImgPanel">
			<div class="homeImgs" id="homeImg1"  onmouseover="showCvr('cvrHomeImg1'); showCvr('descHomeImg1')">
				<img src="images/vip_home_snap.png" alt="Image not found." />
			</div>
			<div class="cvrHomeImgs" id="cvrHomeImg1"></div>
			<div class="descHomeImgs" id="descHomeImg1" onmouseout="hideCvr('cvrHomeImg1'); hideCvr('descHomeImg1')" 
			onclick="$('#slideNum').val(1); document.getElementById('slideNumForm').submit();">
				<div>VideoInterviewPractice.com</div>
			</div>

			<div class="homeImgs" id="homeImg2" onmouseover='showCvr("cvrHomeImg2"); showCvr("descHomeImg2")'>
				<img src="images/IG_sm_home.png" alt="Image not found." />
			</div>
			<div class="cvrHomeImgs" id="cvrHomeImg2"></div>
			<div class="descHomeImgs" id="descHomeImg2" onmouseout="hideCvr('cvrHomeImg2'); hideCvr('descHomeImg2')" 
			onclick="$('#slideNum').val(2); document.getElementById('slideNumForm').submit();">
				<div>InnerGap.com</div>
			</div>

			<div class="homeImgs" id="homeImg3" onmouseover="showCvr('cvrHomeImg3'); showCvr('descHomeImg3')">
				<img src="images/endoodle-home-snap.png" alt="Image not found." />
			</div>
			<div class="cvrHomeImgs" id="cvrHomeImg3"></div>
			<div class="descHomeImgs" id="descHomeImg3" onmouseout="hideCvr('cvrHomeImg3'); hideCvr('descHomeImg3')" 
			onclick="$('#slideNum').val(3); document.getElementById('slideNumForm').submit();">
				<div>Endoodle.com</div>
			</div>
		
			<a href="poker.php" style="text-decoration:none">
				<div class="homeImgs" id="homeImg4" onmouseover="showCvr('cvrHomeImg4'); showCvr('descHomeImg4')">
					<img src="images/lens.png" alt="Image not found." />
				</div>
				<div class="cvrHomeImgs" id="cvrHomeImg4"></div>
				<div class="descHomeImgs" id="descHomeImg4" onmouseout="hideCvr('cvrHomeImg4'); hideCvr('descHomeImg4');">
				
				<!--
				onclick="$('#slideNum').val(4); document.getElementById('slideNumForm').submit();">
				-->
				
					<div>Coming Soon...</div>
				</div>
			</a>	
		</div> <!-- HOMEIMG PANEL -->
	</div> <!-- INSET -->

<?php
	include 'controls/footer.php';
?>
