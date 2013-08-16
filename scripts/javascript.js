
/* NAV THUMBS - APPLY BORDER TO THUMB- CALL SLIDER FUNCTION */
/* MAKE SURE WORK1.PHP IS FULLY LOADED BEFORE CALLING THIS FXN FROM INDEX.PHP */

function applyBorder(slideNum){
	$(".navThumbImg").css({"border-width" : "1px", "margin" : "4px", "border-color" : "white"});
	$("#navThumbImg" + slideNum).css({"border-width" : "5px", "margin" : "0px", "border-color" : "#cf0303"});
	slidePos(slideNum);
}

function showCvr(w){
	var a=document.getElementById(w);
	a.style.visibility="visible";
}

function hideCvr(w){
	var b=document.getElementById(w);
	b.style.visibility="hidden";
}

$(document).ready(function(){
	var aboveHeight =  120;
	$(window).scroll(function(){
		if($(window).scrollTop() >= aboveHeight){
			$(".navWorkWrap").addClass("fixed");
		} 
		else{
			$(".navWorkWrap").removeClass("fixed");
		}
	});
}); 


function setIndex(direction){
	var slidePos = $(".workSlideCont").position().left;
	$("input").attr("disabled", "true");
	
/* IF LEFT ARROW CLICKED WHILE 1ST SLIDE IS SHOWN, MAKE INDEX = HIGHEST INDEX AND ANIMATE,
	OTHERWISE, GO TO THE PREVIOUS SLIDE */
	
	if (direction == "left"){
		if (slidePos < 1 && slidePos > -1){
			index = 4;
			applyBorder(index);
		}
		else if(slidePos < -999 && slidePos > -1001){
			index = 1;
			applyBorder(index);
		}
		else if(slidePos < -1999 && slidePos > -2001){
			index = 2;
			applyBorder(index);
		}
		else if(slidePos < -2999 && slidePos > -3001){
			index = 3;

		}
		applyBorder(index);
	}
	
/* IF RIGHT ARROW CLICKED WHILE LAST SLIDE IS SHOWN, MAKE INDEX = 1 AND ANIMATE,
	OTHERWISE, GO TO THE NEXT SLIDE */
	
	else if (direction == "right"){
		if (slidePos < -2999 && slidePos > -3001){
			index = 1;
		}
		else if(slidePos < 1 && slidePos > -1){
			index = 2;
		}
		else if(slidePos < -999 && slidePos > -1001){
			index = 3;
		}
		else if(slidePos < -1999 && slidePos > -2001){
			index = 4;
		}
		applyBorder(index);
	}
	
	$("input").removeAttr("disabled");
}

/* MOVE SLIDE TO CORRESPONDING POSITION */

function slidePos(slideNum){
	var item = $(".workSlideCont");
	var itemPos = item.position().left;
	switch (slideNum){
		case 1:
			$(item).animate({left: "0px"}, "fast");
			break;
		case 2:
			$(item).animate({left: "-1000px"}, "fast");
			break;
		case 3:
			$(item).animate({left: "-2000px"}, "fast");
			break;
		case 4:
			$(item).animate({left: "-3000px"}, "fast");
			break;
		default:
			$(item).animate({left: "0px"}, "fast");
	};
};
