<?php
	include 'controls/header.php';
	include 'controls/workHeader.php';
?>

	<!-- 
	EACH PROJECT WILL HAVE ITS OWN PAGE.
	IF THE USER SELECTS THE "WORK" LINK ON THE HOME PAGE,
	THE WORK1 PAGE WILL OPEN. IF THE USER CLICKS AN IMAGE,
	THE CORRESPONDING PAGE WILL OPEN. THE TOP OF EACH 
	PROJECT'S PAGE WILL CONTAIN NAV TO OTHER PROJECT PAGES
	IN THE FORM OF SMALL IMAGES THAT DEPICT EXAMPLE 
	PROJECTS. THE USER CAN ALSO NAVIGATE VIA ARROWS WHICH 
	SCROLL BACK AND FORTH THROUGH CONSECUTIVE PROJECTS. 
	-->

	<div class="workSlideWrapper">
		<div class="workSlideViewport">
			<div class="workSlideCont">
				<div class="workSlide" id="slide1">
					<div class="projCaptionWrap">
						<div class="projCaption">
							VideoInterviewPractice.com is a great way for people to improve their job
							interviewing skills. Members can record a practice interview, then get feedback
							and tips from friends and even industry professionals. I was involved in this
							project from the SQL database to the html.							
						</div> 
					</div>
					<img class="workImg" src="images/vip-home.png">
					<img class="workImg" src="images/vip-profile.png">
					<img class="workImg" src="images/vip-coach-slider.png">
				</div>
				
				<div class="workSlide" id="slide2">
					<div class="projCaptionWrap">
						<div class="projCaption">
							InnerGap is an online interview tool for Human Resources professionals. 
							They've got a fantastic app with loads of functionality in an intuitive,
							user-friendly interface. Plus, its simple layout and oversize elements
							mean it's ready for a quick conversion to a responsive design.
						</div> 
					</div>
					<img class="workImg" src="images/IG_home.png" />
					<img class="workImg" src="images/IG_signin.png">
					<img class="workImg" src="images/IG_interview_progress.png">
					<img class="workImg" src="images/IG_perfect_interview.png">
				</div>
				
				<div class="workSlide" id="slide3">
					<div class="projCaptionWrap">
						<div class="projCaption">
							Endoodle.com is a fun social artworking site where people can create their own
							doodles, or add to someone else's creation. 
						</div> 
					</div>
					<img class="workImg" src="images/endoodle-home.png">
					<img class="workImg" src="images/endoodle-activity.png">
					<img class="workImg" src="images/endoodle-doodle.png">
					<img class="workImg" src="images/endoodle-redoodle.png">
				</div>
				
				<div class="workSlide" id="slide4">
					<div class="projCaptionWrap">
						<div class="projCaption">
							InnerGap is an online interview tool for Human Resources professionals. 
							They've got a fantastic app with loads of functionality in an intuitive,
							user-friendly interface. Plus, its simple layout and oversize elements
							mean it's ready for a quick conversion to a responsive design.
						</div> 
					</div>
					<img class="workImg" src="images/IG_add_job.png">
					<img class="workImg" src="images/IG_interview_progress.png">
				</div>
			</div>
		</div>			
	</div>
	
	<script>
		applyBorder(<?php 
			if(isset($_SESSION["slideNumServer"])){
				echo $_SESSION["slideNumServer"]; 
			}
			else{
				echo 1;
			}
			?>);
	</script>

<?php
	include 'controls/footer.php';
?>