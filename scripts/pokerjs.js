// GENERAL-PURPOSE FUNCTIONS
// ----------------------------------------

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

// CLEAR ALL NON-RADIO INPUTS BEFORE CLOSING MODAL
function clrCloseModal(elementId){
	var whichElement = document.getElementById(elementId);

	if(whichElement != null && whichElement != undefined){
		$("#" + elementId + " input[type != 'radio']").val("");
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

function fillTblSelect(){	
	// PUT THE OPTIONS CURRENTLY LISTED IN THE BASE FIELD INTO AN ARRAY
	var baseSelect = document.getElementById('baseTbl');
	var selOptArr = baseSelect.options;
	var selFldVal = baseSelect.value;

	// TAKE THE SELECTED VAL OF THE BASETBL FIELD OUT OF THE OPTIONS ARRAY
	var k = 0;
	var nextSelOptArr = new Array;
	for(var i=0; i<selOptArr.length; i++){
		if(selOptArr[i].value != selFldVal){
			var nextOptObj = new Option;
			nextOptObj.text = selOptArr[i].text;
			nextSelOptArr[k] = nextOptObj;
			k = k + 1;
		}
	}
	
	// PUT THE RESULTANT OPTIONS ARRAY INTO THE COMPARETBL SELECT
	var destList = new Array;
	for(var i=0; i<nextSelOptArr.length; i++){
		var nextOptObj = nextSelOptArr[i];
		destList[i] = nextOptObj;
	}
	
	// CLEAR THE PREVIOUS LIST
	var oldOptArr = new Array;
	oldOptArr = document.getElementById('compareTbl').options;
	var oldOptArrLen = oldOptArr.length;
	for(var i=oldOptArrLen; i>0; i--){
		document.getElementById('compareTbl').remove(oldOptArr[i]);
	}
	
	// ADD THE NEW LIST OF OPTIONS TO COMPARETBL
	for(var i=0; i<destList.length; i++){
		document.getElementById('compareTbl').add(destList[i]);
	}
}

function calcData(oper, cat){
	var colNum;
	switch(cat){
		case "sessNum":
			colNum = 0;
			break;
		case "start":
			colNum = 1;
			break;
		case "location":
			colNum = 2;
			break;
		case "gameType":
			colNum = 3;
			break;
		case "limit":
			colNum = 4;
			break;
		case "duration":
			colNum = 5;
			break;
		case "buyin":
			colNum = 6;
			break;
		case "cashout":
			colNum = 7;
			break;
		case "ringTour":
			colNum = 8;
			break;
		case "place":
			colNum = 9;
			break;
		case "rate":
			colNum = 10;
			break;
		case "return":
			colNum = 11;
			break;
		case "live":
			colNum = 12;
			break;
	}
	// tblBodyName IS A GLOBAL VAR EQUAL TO THE NAME OF TABLE BODY CONTAINING FILTERED DATA
	// TO GET DATA TO APPEAR IN CORRECT ORDER, REVERSE THE ORDER OF ROWCOLL,
	// THAT SHOULD REVERSE THE ORDER OF ALL ARRAYS, INCLUDING DATAX
	var tbl = document.getElementById(tblBodyName);
	var rowCollAll = tbl.rows;
	var rowColl = new Array;
	var y = 0;
	for(var x=rowCollAll.length-1; x>=0; x--){
		rowColl[y] = rowCollAll[x];
		y = y + 1;
	}
	
	var retArr = new Array;
	var j = 0;
	var n = 0;
	var sum = 0;
	for(var i=0; i<rowColl.length; i++){
		var cellColl = rowColl[i].cells;
		switch(oper){
			case 'report':
				if(cat == 'start'){
					retArr[j] = (cellColl[colNum].textContent);
				}
				else{
					retArr[j] = parseInt(cellColl[colNum].textContent);
				}
				j = j + 1;
				break;
			case 'runSum':
				var cellVal = parseInt(cellColl[colNum].textContent);
				if(isNaN(cellVal)){
						cellVal = 0;
				}
				
				if(j == 0){
					retArr[j] = cellVal;
					j = j + 1;
				}
				else{
					retArr[j] = retArr[j-1] + cellVal;
					j = j + 1;
				}
				break;
			case 'runAvg':
				var cellVal = parseInt(cellColl[colNum].textContent);
				if(isNaN(cellVal)){
					cellVal = 0;
				}
				sum = sum + cellVal;
				retArr[n] = sum/(i+1);
				n = n + 1;
				break;
		}
	}
	
	return retArr;

	// else if(oper == 'runAvg'){
		// // ------------------------------------------------------------
		// // THE FOLLOWING GIVES A CUMULATIVE AVG CALCULATED FOR EACH SESSION
		// var n = 0;
		// var sum = 0;
		// for(var m=0; m<rowColl.length; m++){
			// var cellColl = rowColl[m].cells;
			// var cellVal = parseInt(cellColl[colNum].textContent);
			// if(isNaN(cellVal)){
				// cellVal = 0;
			// }
			// sum = sum + cellVal;
			// retArr[n] = sum/(m+1);
			// n = n + 1;
		// }
		//------------------------------------------------------------
		// THE FOLLOWING GIVES A RUNNING AVG OF LAST 5 SESSIONS
		// // IF OPER = RUNAVG, CALC AVG OF LAST 5 SESSIONS
		// var row = 4;
		// // GIVE ERROR IF USER HAS RECORDED <5 SESSIONS
		// for(var m=4; m<rowColl.length; m++){
			// var sum = 0;
			// for(var k=row; k>=row-4; k--){
				// var cellColl = rowColl[k].cells;
				// var cellVal = parseInt(cellColl[colNum].textContent);
				// if(isNaN(cellVal)){
						// cellVal = 0;
				// }
			// sum = sum + cellVal;
		// }
		// avg = sum/5;
		// for(var n=0; n<4; n++){
			// retArr[n] = null;
		// }
		// retArr[m] = avg;
		// row = row + 1;
		// }
		//------------------------------------------------------------
	// }
}

function showSumTbl(byX){
	// byX IS THE XAXIS TYPE (EG: byDate, bySession, byWeek, byMon, byLoc, byDayOfWk...)
	
	// PUT COMPARETBL SELECTION(S) AND BASETBL SELECTION INTO ARRAY
	var tblSelArr = new Array;
	tblSelArr[0] = $("#baseTbl").val();
	
	// GET COMPARISON TABLES, IF ANY SELECTED
	var tblSelect = tblSelArr[0];
	var tblCompSelArr = $("#compareTbl").val();
	if(tblCompSelArr){
		for(var i=0; i<tblCompSelArr.length; i++){
			tblSelArr.push(tblCompSelArr[i]);
		}
	}
	
	// ----------------------------------------------------------------------------------
	// TABLES
	// ----------------------------------------------------------------------------------
	
	// HIDE ALL TBLS
	$("[name = 'sumTotTbl']").removeClass('active').addClass('inactive');	
	$("[name = 'sumAvgTbl']").removeClass('active').addClass('inactive');
	
	var totDataXArr = new Array;
	var totDataYArr = new Array;
	var avgDataXArr = new Array;
	var avgDataYArr = new Array;
	var totPtsArr = new Array;
	var avgPtsArr = new Array;
	var lineColors = new Array;
	var totTblId = "";
	var avgTblId = "";
	
	// GET CHART DATA AND DISPLAY TABLES FOR ALL SELECTED CATEGORIES
	for(var i=0; i<tblSelArr.length; i++){
		var tblSelect = tblSelArr[i];
		switch(tblSelect){
			case "Overall":
				fillTable();
				totTblId = "totals";
				avgTblId = "avgs";
				lineColors[i] = 'green';
				break;
			case "Live":
				fillTable();
				applyFilter('live', 'IS', 'Live');
				totTblId = "totalsLive";
				avgTblId = "avgsLive";
				lineColors[i] = 'blue';
				break;
			case "Online":
				fillTable();
				applyFilter('live', 'IS', 'Online');
				totTblId = "totalsOnline";
				avgTblId = "avgsOnline";
				lineColors[i] = 'red';
				break;
			case "Cash":
				fillTable();
				applyFilter('ringTour', 'IS', 'Ring');
				totTblId = "totalsCash";
				avgTblId = "avgsCash";
				lineColors[i] = 'orange';
				break;
			case "Tournament":
				fillTable();
				applyFilter('ringTour', 'IS', 'Tour');
				totTblId = "totalsTourney";
				avgTblId = "avgsTourney";
				lineColors[i] = 'purple';
				break;
		}
		
		var totDataX = new Array;
		var totDataY = new Array;
		var avgDataX = new Array;
		var avgDataY = new Array;
		
		// IF BYX NOT SET, DEFAULT TO BYSESS
		if(!byX){
			var byX = 'bySess';
		}
		
		switch(byX){
			case 'bySess':
				totDataX = calcData('report', 'sessNum');			
				totDataY = calcData('runSum', 'return');
				avgDataX = calcData('report', 'sessNum');			
				avgDataY = calcData('runAvg', 'return');
				break;
			case 'byDate':
				totDataX = calcData('report', 'start');			
				totDataY = calcData('runSum', 'return');
				avgDataX = calcData('report', 'start');			
				avgDataY = calcData('runAvg', 'return');
				break;
		
		}
		
		// SAVE EACH DATA SET IN AN ARRAY
		totDataXArr[i] = totDataX;
		totDataYArr[i] = totDataY;
		avgDataXArr[i] = avgDataX;
		avgDataYArr[i] = avgDataY;
		
		// COMBINE DATA SETS INTO POINT ARRAYS FOR SCATTER PLOTS
		var totPtArr = new Array;
		for(var j=0; j<totDataX.length; j++){
			// IF THE X DATA IS A DATE, CONVERT IT TO RGRAPH FORMAT
			if(byX == 'byDate'){
				totDataX[j] = tblToRGraphDate(totDataX[j]);
				totDataX[j] = new Date(totDataX[j]);
			}
			// totDataX[j] AND totDataY[j] MUST BE ELEMENTS 0 AND 1, RESPECTIVELY, OF A NEW ARRAY
			var pt = new Array;
			pt[0] = totDataX[j];
			pt[1] = totDataY[j];
			totPtArr[j] = pt;
		}
		totPtsArr[i] = totPtArr;
		
		var avgPtArr = new Array;
		for(var j=0; j<avgDataX.length; j++){
			// IF THE X DATA IS A DATE, CONVERT IT TO RGRAPH FORMAT
			// if(byX == 'byDate'){
				// avgDataX[j] = tblToRGraphDate(avgDataX[j]);
				// avgDataX[j] = new Date(avgDataX[j]);
			// }
			// totDataX[j] AND totDataY[j] MUST BE ELEMENTS 0 AND 1, RESPECTIVELY, OF A NEW ARRAY
			var pt = new Array;
			pt[0] = avgDataX[j];
			pt[1] = avgDataY[j];
			avgPtArr[j] = pt;
		}
		avgPtsArr[i] = avgPtArr;
		
		// DISPLAY TABLES FOR SELECTED CATEGORY
		$('#' + totTblId).removeClass("inactive").addClass("active");
		$('#' + avgTblId).removeClass("inactive").addClass("active");
	
	}
	
	// ----------------------------------------------------------------------------------
	// GRAPHS
	// ----------------------------------------------------------------------------------
	
	// ----------------------------------------------------------------------------------
	// XAXIS IS SESSION
	// ----------------------------------------------------------------------------------	
	var xmax = 0;
	for(var j=0; j<totDataXArr.length; j++){
		var currArr = totDataXArr[j];
		for(var i=0; i<currArr.length; i++){
			if(currArr[i] >= xmax){
				xmax = currArr[i];
				// SAVE THE ARRAY IN WHICH THE XMAX OCCURS
				var totXmaxArr = totDataXArr[j];
			}
		}
	}
	
	var xmin = xmax;
	for(var j=0; j<totDataXArr.length; j++){
		var currArr = totDataXArr[j];
		for(var i=0; i<currArr.length; i++){
			if(currArr[i] <= xmin){
				xmin = currArr[i];
				// SAVE THE ARRAY IN WHICH THE XMIN OCCURS
				var totXminArr = totDataXArr[j];
			}
		}
	}
	// ----------------------------------------------------------------------------------

	// // ----------------------------------------------------------------------------------
	// // XAXIS IS DATE
	// // ----------------------------------------------------------------------------------	
	// var xmax = new Date("October 13, 1975 11:13:00");
	// for(var j=0; j<totDataXArr.length; j++){
		// var currArr = totDataXArr[j];
		// for(var i=0; i<currArr.length; i++){
			// if(currArr[i] >= xmax){
				// xmax = currArr[i];
				// // SAVE THE ARRAY IN WHICH THE XMAX OCCURS
				// var totXmaxArr = totDataXArr[j]
			// }
		// }
	// }
	
	// var xmin = new Date();
	// for(var j=0; j<totDataXArr.length; j++){
		// var currArr = totDataXArr[j];
		// for(var i=0; i<currArr.length; i++){
			// if(currArr[i] <= xmin){
				// xmin = currArr[i];
				// // SAVE THE ARRAY IN WHICH THE XMAX OCCURS
				// var totXminArr = totDataXArr[j]
			// }
		// }
	// }
	// // BOTH GRAPHS USE SAME X SCALE, SO SEPARATE XMAXAVG NOT NEEDED
	// var xmaxAvg = 0;
	// for(var j=0; j<avgDataXArr.length; j++){
		// var currArr = avgDataXArr[j];
		// for(var i=0; i<currArr.length; i++){
			// if(currArr[i] >= xmaxAvg){
				// xmaxAvg = currArr[i];
			// }
		// }
	// }
	// // ----------------------------------------------------------------------------------
	
	var ymin = 0;
	for(var j=0; j<totDataYArr.length; j++){
		var currArr = totDataYArr[j];
		for(var i=0; i<currArr.length; i++){
			if(currArr[i] <= ymin){
				ymin = currArr[i];
			}
		}
	}
	
	var yminAvg = 0;
	for(var j=0; j<avgDataYArr.length; j++){
		var currArr = avgDataYArr[j];
		for(var i=0; i<currArr.length; i++){
			if(currArr[i] <= yminAvg){
				yminAvg = currArr[i];
			}
		}
	}
	
	// if(byX == 'byDate'){
		// var timeStr = "";
		// var newStr1 = "";
		// var newStr2 = "";
		// for(var i=0; i<totPtArr.length; i++){
			// timeStr = totPtArr[i][0].toString();
			// timeStr = timeStr.slice(4,15);
			// newStr1 = timeStr.substr(0,6);
			// newStr1 = newStr1.replace("01", "1");
			// newStr1 = newStr1.replace("02", "2");
			// newStr1 = newStr1.replace("03", "3");
			// newStr1 = newStr1.replace("04", "4");
			// newStr1 = newStr1.replace("05", "5");
			// newStr1 = newStr1.replace("06", "6");
			// newStr1 = newStr1.replace("07", "7");
			// newStr1 = newStr1.replace("08", "8");
			// newStr1 = newStr1.replace("09", "9");
			// newStr2 = "," + timeStr.substr(6);
			// totPtArr[i][0] = newStr1 + newStr2;
		// }
		
		// xmax = xmax.toString();
		// xmax = xmax.slice(4,15);
		// newStr1 = xmax.substr(0,6);
		// newStr1 = newStr1.replace("01", "1");
		// newStr1 = newStr1.replace("02", "2");
		// newStr1 = newStr1.replace("03", "3");
		// newStr1 = newStr1.replace("04", "4");
		// newStr1 = newStr1.replace("05", "5");
		// newStr1 = newStr1.replace("06", "6");
		// newStr1 = newStr1.replace("07", "7");
		// newStr1 = newStr1.replace("08", "8");
		// newStr1 = newStr1.replace("09", "9");
		// newStr2 = "," + xmax.substr(6);
		// xmax = newStr1 + newStr2;
		
		// xmin = xmin.toString();
		// xmin = xmin.slice(4,15);
		// newStr1 = xmin.substr(0,6)
		// newStr1 = newStr1.replace("01", "1");
		// newStr1 = newStr1.replace("02", "2");
		// newStr1 = newStr1.replace("03", "3");
		// newStr1 = newStr1.replace("04", "4");
		// newStr1 = newStr1.replace("05", "5");
		// newStr1 = newStr1.replace("06", "6");
		// newStr1 = newStr1.replace("07", "7");
		// newStr1 = newStr1.replace("08", "8");
		// newStr1 = newStr1.replace("09", "9");
		// newStr2 = "," + xmin.substr(6);
		// xmin = newStr1 + newStr2;
	// }

// DISPLAY APPROPRIATE GRAPHS
	// The datasets as shown on the chart. Each point is an array, described below.
        // var data1 = [ [67,78,null, 'The winner!'],[67,40,'red'] ];
        // var data2 = [ [0,78,'green'],[67,40,'green'] ];
        
        // Create the Scatter chart. The arguments are: the canvas ID and the data to be represented on the chart.
        // You can have multiple sets of data if you wish
		// SINCE GRAPH DOESN'T DISPLAY FIRST LABEL, REMOVE IT FROM LABEL ARRAY
		if(totXmaxArr){
			totXmaxArr.shift();
			var canvas = document.getElementById('cvs1');
			RGraph.Reset(canvas);
			var sg = new RGraph.Scatter('cvs1', totPtsArr)
			// Configure the chart to look as you want it to.
				.Set('chart.background.barcolor1', 'white')
				.Set('chart.background.barcolor2', 'white')
				.Set('chart.grid.color', 'rgba(238,238,238,1)')
				.Set('chart.axis.linewidth', 2)
				.Set('chart.line.linewidth', 3)
				.Set('chart.gutter.left', 50)
				.Set('chart.yscale', true)
				.Set('chart.tickmarks', null)
				.Set('chart.units.pre', '$')
				.Set('chart.background.grid.autofit.numhlines', 10)
				.Set('chart.background.grid.autofit.numvlines', xmax-1)
				.Set('chart.xaxis', true)
				.Set('xmin', xmax)
				.Set('xmax', xmin)
				.Set('chart.ticksize', 3)
				.Set('chart.labels', totXmaxArr)
				.Set('chart.line', true)
				.Set('chart.line.colors', lineColors)
				.Set('key', tblSelArr)
				.Set('key.interactive', true)
				.Set('key.halign', 'left')
				// IF YMIN > 0, PUT XAXIS AT BOTTOM OF GRAPH
				if(ymin < 0){
					sg.Set('chart.xaxispos', 'center')
				}
				
				// Now call the .Draw() method to draw the chart.
				sg.Draw();
				
			var canvas = document.getElementById('cvs2');
			RGraph.Reset(canvas);
			var sg2 = new RGraph.Scatter('cvs2', avgPtsArr)
				// Configure the chart to look as you want it to.
				.Set('chart.background.barcolor1', 'white')
				.Set('chart.background.barcolor2', 'white')
				.Set('chart.grid.color', 'rgba(238,238,238,1)')
				.Set('chart.axis.linewidth', 2)
				.Set('chart.line.linewidth', 3)
				.Set('chart.gutter.left', 50)
				.Set('chart.yscale', true)
				.Set('chart.tickmarks', null)
				.Set('chart.units.pre', '$')
				.Set('chart.background.grid.autofit.numhlines', 10)
				.Set('chart.background.grid.autofit.numvlines', xmax-1)
				.Set('chart.xaxis', true)
				.Set('xmin', xmax)
				.Set('xmax', xmin)
				.Set('chart.ticksize', 3)
				.Set('chart.labels', totXmaxArr)
				.Set('chart.line', true)
				.Set('chart.line.colors', lineColors)
				.Set('key', tblSelArr)
				.Set('key.interactive', true)
				.Set('key.halign', 'left')
				// IF YMIN > 0, PUT XAXIS AT BOTTOM OF GRAPH
				if(yminAvg < 0){
					sg2.Set('chart.xaxispos', 'center')
				}
				// Now call the .Draw() method to draw the chart.
				sg2.Draw();
			}
			else{
				var canvas = document.getElementById('cvs1');
				RGraph.Reset(canvas);
				var canvas = document.getElementById('cvs2');
				RGraph.Reset(canvas);
				return;
			}
			
		// var lg = new RGraph.Line('cvs1', totDataYArr)
            // // Configure the chart to look as you want it to.
            // .Set('chart.background.barcolor1', 'white')
            // .Set('chart.background.barcolor2', 'white')
            // .Set('chart.grid.color', 'rgba(238,238,238,1)')
			// // .Set('chart.xaxis', true)
			// .Set('chart.axis.linewidth', 1)
			// .Set('chart.linewidth', 3)
            // .Set('chart.gutter.left', 50)
			// // .Set('chart.xscale', true)
			// .Set('chart.yscale', true)
			// .Set('chart.background.grid.autofit.numhlines', 10)
			// .Set('chart.background.grid.autofit.numvlines', xmax-1)
			// // .Set('chart.xmin', 1)
            // // .Set('chart.xmax', xmax) // Important!
			// .Set('chart.ticksize', 2)
			// .Set('chart.labels', totXmaxArr)
			// // .Set('chart.labels.specific.align', 'center')
			// // .Set('chart.scale.round', true)
			// // .Set('chart.ymin', -2500)
			// .Set('chart.tickmarks', 'circle')
			// .Set('chart.units.pre', '$')
			// // .Set('chart.line', true)
			// // IF YMIN > 0, PUT XAXIS AT BOTTOM OF GRAPH
			// if(ymin < 0){
				// lg.Set('chart.xaxispos', 'center')
			// }
            // // Now call the .Draw() method to draw the chart.
            // lg.Draw();
		
		// var sg = new RGraph.Scatter('cvs1', points)
            // // Configure the chart to look as you want it to.
            // .Set('chart.background.barcolor1', 'white')
            // .Set('chart.background.barcolor2', 'white')
            // .Set('chart.grid.color', 'rgba(238,238,238,1)')
			// // .Set('chart.xaxis', true)
			// .Set('chart.xaxispos', 'center')
			// .Set('chart.axis.linewidth', 1)
			// .Set('chart.line.linewidth', 3)
            // .Set('chart.gutter.left', 50)
			// // .Set('chart.xscale', true)
			// .Set('chart.yscale', true)
			// .Set('chart.background.grid.autofit.numhlines', 10)
			// .Set('chart.background.grid.autofit.numvlines', xmax)
			// // .Set('chart.xmin', 1)
            // .Set('chart.xmax', xmax) // Important!
			// .Set('chart.ticksize', 3)
			// .Set('chart.labels', totDataX)
			// // .Set('chart.labels.specific.align', 'center')
			// // .Set('chart.scale.round', true)
			// // .Set('chart.ymin', -2500)
			// .Set('chart.tickmarks', 'circle')
			// .Set('chart.units.pre', '$')
			// .Set('chart.line', true)
			
            // // Now call the .Draw() method to draw the chart.
            // .Draw();
			
	// The datasets as shown on the chart. Each point is an array, described below.
        // var data1 = [ [67,78,null, 'The winner!'],[67,40,'red'] ];
        // var data2 = [ [0,78,'green'],[67,40,'green'] ];
        
        // Create the Scatter chart. The arguments are: the canvas ID and the data to be represented on the chart.
        // You can have multiple sets of data if you wish
}

function tblToRGraphDate(tblDate){
	// TBL DATE FORMAT IS 'Jul 26 2013<BR>12:30PM'
	// RGRAPH DATE FORMAT IS '2012/12/31 23:59:59'
	var splitRegEx = /\s+/g;
	var splitTbl = tblDate.split(splitRegEx);
	
	if(splitTbl[1] < 10){
		splitTbl[1] = "0" + splitTbl[1];
	}
	var tblDateDD = splitTbl[1];
	var tblDateYYYY = splitTbl[2];
	var tblTime = splitTbl[3];
	var splitTimeRegEx = /:/;
	var tblHrMinAMPM = tblTime.split(splitTimeRegEx);
	var tblHour = parseInt(tblHrMinAMPM[0]);
	var tblMin = tblHrMinAMPM[1].slice(0,2);
	var tblAMPM = tblHrMinAMPM[1].slice(-2);
	
	var tbl24Hour = 0;
	if(tblAMPM == 'AM'){
		if(tblHour == 12){
			tbl24Hour = 0;
		}
		else{
			tbl24Hour = tblHour;
		}
	}
	else if(tblAMPM == 'PM'){
		if(tblHour < 12){
			tbl24Hour = tblHour + 12;
		}
		else{
			tbl24Hour = tblHour;
		}
	}
	
	if(tbl24Hour < 10){
		tbl24Hour = "0" + tbl24Hour;
	}
	
	var MMStr = splitTbl[0];
	var MMNum = "";
	switch(MMStr){
		case "Jan":
			MMNum = "01";
			break;
		case "Feb":
			MMNum = "02";
			break;
		case "Mar":
			MMNum = "03";
			break;
		case "Apr":
			MMNum = "04";
			break;
		case "May":
			MMNum = "05";
			break;
		case "Jun":
			MMNum = "06";
			break;
		case "Jul":
			MMNum = "07";
			break;
		case "Aug":
			MMNum = "08";
			break;
		case "Sep":
			MMNum = "09";
			break;
		case "Oct":
			MMNum = "10";
			break;
		case "Nov":
			MMNum = "11";
			break;
		case "Dec":
			MMNum = "12";
			break;
	}
	
	var tblDateMM = MMNum;
	
	return RGraphDateTime = tblDateYYYY + "/" + tblDateMM + "/" + tblDateDD + " " + tbl24Hour + ":" + tblMin + ":00";
}
		
function showLocType(){
	var x = document.getElementsByName("locType");
	var y = document.getElementsByName("location");
	var targetVal = $("#" + locListDest).val();

	var targetIndex = 0;
	for(var j=0; j<y.length; j++){
		if(targetVal == y[j].innerHTML){
			targetIndex = j;
		}
	}
	var testType = x[targetIndex].innerHTML;
	if(testType == 0){
		$("#"+ locTypeDest).html("Live");
	}
	else{
		$("#"+ locTypeDest).html("Online");
	}
}

// ACCEPTS DURATION STRING IN 12H30M FORMAT, RETURNS DURATION IN MINUTES
function toCalcDur(tblDur){
	var splitH = /h/i;
	var durArr = tblDur.split(splitH);
	var durHr = durArr[0];
	var durComboMin = durArr[1];
	var splitM = /m/i;
	var durMinArr = durComboMin.split(splitM);
	var durMin = durMinArr[0];
	var durHrToMin = durHr * 60;
	var minutes = parseInt(durMin) + parseInt(durHrToMin);
	return minutes;
}

// ACCEPTS DURATION IN MINUTES, RETURNS 12H30M FORMAT STRING
function toTblDur(calcDur){
	var durHr = parseInt(calcDur/60);
	var durMin = parseInt(calcDur%60);
	if(durMin < 10){
		durMin = "0" + durMin;
	}
	var dur = durHr + "h" + durMin + "m";
	return dur;
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
	
	if(hour == 12){
		for(var k=0; k<amPms.length; k++){
			if(amPms[k].value == "pm"){
				amPms[k].selected = true;
				break;
			}
		}
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

function dpToJsDate(dpDate){
	// DATEPICKER FORMAT IS DD/MM/YYYY
	var splitRegEx = /\//g;
	var splitDp = dpDate.split(splitRegEx);
	var dpDateMM = splitDp[0] - 1;
	var dpDateDD = splitDp[1];
	var dpDateYYYY = splitDp[2];
	return jsDate = new Date(dpDateYYYY, dpDateMM, dpDateDD, 0, 0, 0, 0);
}

function tblToJsDate(tblDate){
	// TABLE DATE FORMAT IS: Jul 16 2013 10:25AM
	var splitRegEx = /\s+/g;
	var splitTbl = tblDate.split(splitRegEx);
	var MMStr = splitTbl[0];
	var MMNum = 0;
	switch(MMStr){
		case "Jan":
			MMNum = 0;
			break;
		case "Feb":
			MMNum = 1;
			break;
		case "Mar":
			MMNum = 2;
			break;
		case "Apr":
			MMNum = 3;
			break;
		case "May":
			MMNum = 4;
			break;
		case "Jun":
			MMNum = 5;
			break;
		case "Jul":
			MMNum = 6;
			break;
		case "Aug":
			MMNum = 7;
			break;
		case "Sep":
			MMNum = 8;
			break;
		case "Oct":
			MMNum = 9;
			break;
		case "Nov":
			MMNum = 10;
			break;
		case "Dec":
			MMNum = 11;
			break;
	}
	var tblDateMM = MMNum;
	var tblDateDD = splitTbl[1];
	var tblDateYYYY = splitTbl[2];
	return jsDate = new Date(tblDateYYYY, tblDateMM, tblDateDD, 0, 0, 0, 0);
}

function getList(listType, newOptionVal){
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
	
	// PUT LIST OPTIONS INTO HOLDING ELEMENT- e.g.: "limitReturn" or "gameReturn"
	if(listType == "game"){
		document.getElementById('gameReturn').innerHTML = "";
		document.getElementById('gameReturn').innerHTML = xmlhttp.responseText;
	}
	else{
		document.getElementById('limitReturn').innerHTML = "";
		document.getElementById('limitReturn').innerHTML = xmlhttp.responseText;
	}
	
	var g;
	var l;
	if(listType == "game"){
		g = document.getElementsByName('gameOption');
		l = document.getElementById(gameListDest);
		l.innerHTML = "";
	}
	else{
		g = document.getElementsByName('limitOption');
		l = document.getElementById(limitListDest);
		l.innerHTML = "";
	}
	
	var string1 = "";
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
					getList("game", newGameVal);
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
					getList("limit", newLimitVal);
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

function getLocList(newOptionVal){
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
	var x = document.getElementById('locationReturn');
	x.innerHTML = xmlhttp.responseText;

	var y = document.getElementsByName("location");
	var string1 = "";
	for(var j=0; j<y.length; j++){
		if(y[j].innerHTML == newOptionVal){
			string1 = string1 + "<option selected>" + y[j].innerHTML + "</option>";
		}
		else{
			string1 = string1 + "<option>" + y[j].innerHTML + "</option>";
		}
	}
	document.getElementById(locListDest).innerHTML = string1;
	
	showLocType();
}

function addSession(){
// GET ALL VALS FROM FORM AND VALIDATE

// BUY-IN
	var buyinValid = $('#buyin').val();
// CASH OUT
	var cashout = $('#cashout').val();
// PLACE
	var place = $('#place').val();
// NOTES
	var notes = $('#notes').val();
	
	if(isNaN(buyinValid)){
		$('#addSessErrLbl').html("Buy-in entry can contain only numbers.");
	}
	else{
		if(buyinValid < 0){
			$('#addSessErrLbl').html("Buy-in entry must be a positive number.");
		}
		else{
			if(isNaN(cashout)){
				$('#addSessErrLbl').html("Cash out entry can contain only numbers.");
			}
			else{
				if(cashout < 0){
					$('#addSessErrLbl').html("Cash out entry must be a positive number.");
				}
				else{
					if(isNaN(place)){
						$('#addSessErrLbl').html("Place entry can contain only numbers.");
					}
					else{
						if(place < 0){
							$('#addSessErrLbl').html("Place entry must be a positive integer.");
						}
						else{
							var buyin = buyinValid;
						
					// START DATE				
						// GET TIME VALUES
							var stHrStr12 = parseInt($('#stHour').val());
							var stMinStr = $('#stMin').val();
							var stSecStr = "00";
							var stAmPmStr = $('#stAmPm').val().toString();
							
							// CONVERT 12-HOUR TIME TO 24-HOUR
							if(stHrStr12 == 12){
								if(stAmPmStr == "pm"){
									stHrStr24 = stHrStr12;
								}
								else{
									stHrStr24 = 0;
								}
							}
							else{
								if(stAmPmStr == "pm"){
									stHrStr24 = stHrStr12 + 12;
								}
								else{
									stHrStr24 = stHrStr12;
								}
							}
							
							if(stHrStr24 < 10){
								stHrStr24 = "0" + stHrStr24;
							}
							
							// PARSE THE TIME RETURNED BY ADDSESSION FORM AS SQL TIME
							var sqlStTimeStr = stHrStr24 + ":" + stMinStr + ":" + stSecStr;
							
						// GET DATE VALUES
							// PARSE THE DATE RETURNED BY DATEPICKER AS SQL DATE()
							var stFullDate = $('#datepicker').val(); // DATEPICKER RETURNS "MM/DD/YYYY"
							var splitRegEx = /\//;
							var stArray = stFullDate.split(splitRegEx);
							var stMonth = stArray[0];
							var stDate = stArray[1];
							var stYear = stArray[2];

							var sqlStDate = stYear + "-" + stMonth + "-" + stDate; // SQL EXPECTS "YYYY-MM-DD"
							var sqlStDateStr = sqlStDate.toString();
							
						// CONSOLIDATE DATE AND TIME TO SQL DATETIME FORMAT
							var sqlStDatetimeStr = sqlStDateStr + " " + sqlStTimeStr
							
				// END DATE
						// GET TIME VALUES
							var endHrStr12 = parseInt($('#endHour').val());
							var endMinStr = $('#endMin').val();
							var endSecStr = "00";
							var endAmPmStr = $('#endAmPm').val().toString();
							
							// CONVERT 12-HOUR TIME TO 24-HOUR
							if(endHrStr12 == 12){
								if(endAmPmStr == "pm"){
									endHrStr24 = endHrStr12;
								}
								else{
									endHrStr24 = 0;
								}
							}
							else{
								if(endAmPmStr == "pm"){
									endHrStr24 = endHrStr12 + 12;
								}
								else{
									endHrStr24 = endHrStr12;
								}
							}
							
							if(endHrStr24 < 10){
								endHrStr24 = "0" + endHrStr24;
							}
							
							// PARSE THE TIME RETURNED BY ADDSESSION FORM AS SQL TIME
							var sqlEndTimeStr = endHrStr24 + ":" + endMinStr + ":" + endSecStr;
							
						// GET DATE VALUES
							// PARSE THE DATE RETURNED BY DATEPICKER AS SQL DATE()
							var endFullDate = $('#datepicker1').val(); // DATEPICKER RETURNS "MM/DD/YYYY"
							var splitRegEx = /\//;
							var endArray = endFullDate.split(splitRegEx);
							var endMonth = endArray[0];
							var endDate = endArray[1];
							var endYear = endArray[2];

							var sqlEndDate = endYear + "-" + endMonth + "-" + endDate; // SQL EXPECTS "YYYY-MM-DD"
							var sqlEndDateStr = sqlEndDate.toString();
							
						// CONSOLIDATE DATE AND TIME TO SQL DATETIME FORMAT
							var sqlEndDatetimeStr = sqlEndDateStr + " " + sqlEndTimeStr
							
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
							
							// POST DATA TO DB
							$.post('pokerMethods.php', {method: 'addSession', phpStartDate: sqlStDatetimeStr, phpEndDate: sqlEndDatetimeStr, phpLocation: location,
								phpGameType: gameType, phpRingTour: ringTour, phpLimits: limits, phpBuyin: buyin, phpCashout: cashout, phpPlace: place, phpNotes: notes}, function(message){
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
		}
	}
}

function editSession(){
// GET ALL VALS FROM FORM AND VALIDATE

// BUY-IN
	var buyinValid = $('#editBuyin').val();
// CASH OUT
	var cashout = $('#editCashout').val();
// PLACE
	var place = $('#editPlace').val();
// NOTES
	var notes = $('#editNotes').val();
	
	if(isNaN(buyinValid)){
		$('#editSessErrLbl').html("Buy-in entry can contain only numbers.");
	}
	else{
		if(buyinValid < 0){
			$('#editSessErrLbl').html("Buy-in entry must be a positive number.");
		}
		else{
			if(isNaN(cashout)){
				$('#editSessErrLbl').html("Cash out entry can contain only numbers.");
			}
			else{
				if(cashout < 0){
					$('#editSessErrLbl').html("Cash out entry must be a positive number.");
				}
				else{
					if(isNaN(place)){
						$('#editSessErrLbl').html("Place entry can contain only numbers.");
					}
					else{
						if(place < 0){
							$('#editSessErrLbl').html("Place entry must be a positive integer.");
						}
						else{
							var buyin = buyinValid;
						
					// START DATE				
						// GET TIME VALUES
							var stHrStr12 = parseInt($('#editStHour').val());
							var stMinStr = $('#editStMin').val();
							var stSecStr = "00";
							var stAmPmStr = $('#editStAmPm').val().toString();
							
							// CONVERT 12-HOUR TIME TO 24-HOUR
							if(stHrStr12 == 12){
								if(stAmPmStr == "pm"){
									stHrStr24 = stHrStr12;
								}
								else{
									stHrStr24 = 0;
								}
							}
							else{
								if(stAmPmStr == "pm"){
									stHrStr24 = stHrStr12 + 12;
								}
								else{
									stHrStr24 = stHrStr12;
								}
							}
							
							if(stHrStr24 < 10){
								stHrStr24 = "0" + stHrStr24;
							}
							
							// PARSE THE TIME RETURNED BY ADDSESSION FORM AS SQL TIME
							var sqlStTimeStr = stHrStr24 + ":" + stMinStr + ":" + stSecStr;
							
						// GET DATE VALUES
							// PARSE THE DATE RETURNED BY DATEPICKER AS SQL DATE()
							var stFullDate = $('#datepickerEdit').val(); // DATEPICKER RETURNS "MM/DD/YYYY"
							var splitRegEx = /\//;
							var stArray = stFullDate.split(splitRegEx);
							var stMonth = stArray[0];
							var stDate = stArray[1];
							var stYear = stArray[2];

							var sqlStDate = stYear + "-" + stMonth + "-" + stDate; // SQL EXPECTS "YYYY-MM-DD"
							var sqlStDateStr = sqlStDate.toString();
							
						// CONSOLIDATE DATE AND TIME TO SQL DATETIME FORMAT
							var sqlStDatetimeStr = sqlStDateStr + " " + sqlStTimeStr
							
				// END DATE
						// GET TIME VALUES
							var endHrStr12 = parseInt($('#editEndHour').val());
							var endMinStr = $('#editEndMin').val();
							var endSecStr = "00";
							var endAmPmStr = $('#editEndAmPm').val().toString();
							
							// CONVERT 12-HOUR TIME TO 24-HOUR
							if(endHrStr12 == 12){
								if(endAmPmStr == "pm"){
									endHrStr24 = endHrStr12;
								}
								else{
									endHrStr24 = 0;
								}
							}
							else{
								if(endAmPmStr == "pm"){
									endHrStr24 = endHrStr12 + 12;
								}
								else{
									endHrStr24 = endHrStr12;
								}
							}
							
							if(endHrStr24 < 10){
								endHrStr24 = "0" + endHrStr24;
							}
							
							// PARSE THE TIME RETURNED BY ADDSESSION FORM AS SQL TIME
							var sqlEndTimeStr = endHrStr24 + ":" + endMinStr + ":" + endSecStr;
							
						// GET DATE VALUES
							// PARSE THE DATE RETURNED BY DATEPICKER AS SQL DATE()
							var endFullDate = $('#datepickerEdit1').val(); // DATEPICKER RETURNS "MM/DD/YYYY"
							var splitRegEx = /\//;
							var endArray = endFullDate.split(splitRegEx);
							var endMonth = endArray[0];
							var endDate = endArray[1];
							var endYear = endArray[2];

							var sqlEndDate = endYear + "-" + endMonth + "-" + endDate; // SQL EXPECTS "YYYY-MM-DD"
							var sqlEndDateStr = sqlEndDate.toString();
							
						// CONSOLIDATE DATE AND TIME TO SQL DATETIME FORMAT
							var sqlEndDatetimeStr = sqlEndDateStr + " " + sqlEndTimeStr
							
						// LOCATION
							var location = $('#editLocationOptions').val();

						// LOCATION TYPE DOES NOT NEED TO BE ADDED TO SESSION TABLE- 
						// IT IS ASSOCIATED WITH THE LOCATION NAME IN THE LOCATION TABLE

						// GAME TYPE
							var gameType = $('#editGameOptions').val();

						// RING/TOURNEY
							var ringTour = $('input[name="editRingTourRadio"]:checked').val();

						// LIMITS
							var limits = $('#editLimitOptions').val();
							
							// POST DATA TO DB
							$.post('pokerMethods.php', {method: 'editSession', phpStartDate: sqlStDatetimeStr, phpEndDate: sqlEndDatetimeStr, phpLocation: location,
								phpGameType: gameType, phpRingTour: ringTour, phpLimits: limits, phpBuyin: buyin, phpCashout: cashout, phpPlace: place, phpNotes: notes}, function(message){
									if(message != ""){
										$('#editSessErrLbl').html(message);
									}
									else{
										$('#status').val("Your changes have been recorded.");
										document.getElementById('statusForm').submit();
									}
								
							});
						
						}
					}
				}
			}
		}
	}
}

function editRow(x){
	// GET ROW ID
	var rowId = (x.parentNode.parentNode.id);

	// USE FORM TO POST ROW ID TO EDITSESSIONS PG
	$('#editRowId').val(rowId);
	$('#editSession').submit();
}

function confirmDelete(x){
	// DISPLAY THE CONFIRM DLT MODAL
	var whichElement = document.getElementById('confirmDltModal');
	whichElement.style.display = 'block';
	whichElement.parentNode.className = 'modalWrap';
		
	var cover = document.getElementById('fullCover2');
	cover.style.visibility = 'visible';
	
	var wrap = document.getElementById('modalWrap2');
	wrap.style.display = 'block';
	
	var dltRowId = x.parentNode.parentNode.id;
	document.getElementById('dltRowId').value = dltRowId;
	
	var tbl = document.getElementById('sessions').tBodies[0];
	var rowColl = tbl.rows;
	var startCol = 1; // 1 IS STARTDATE COL
	for(var y=0; y<rowColl.length; y++){
		if(rowColl[y].id == dltRowId){
			var cellColl = rowColl[y].cells;
			var rowStartDate = cellColl[startCol].textContent;
			document.getElementById('dltRowStartDate').innerHTML = rowStartDate;
		}
	}
}

function deleteRow(x){
	// DELETE TABLE ROW IMMEDIATELY 
	// var rowId = (x.parentNode.parentNode.id);
	var rowId = x;
	var tbl = document.getElementById('sessions').tBodies[0];
	var rowColl = tbl.rows;
	clrCloseModal2('confirmDltModal');
	for(var y=0; y<rowColl.length; y++){
		if(rowColl[y].id == rowId){
			document.getElementById('sessions').tBodies[0].deleteRow(y);
		}
	}

	// RE-NUMBER ROWS
	for(var y=0; y<rowColl.length; y++){
		var z = y + 1;
		rowColl[y].cells[0].textContent = z + "."
	}
	
	// MAKE ASYNC AJAX CALL TO DELETE SESSION FROM DB
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			getSessions();
			document.getElementById("statusMsg").innerHTML = xmlhttp.responseText;
		}
	}
	
	// IF ASYNC SET TO TRUE, ONLY LAST LIST REQUEST WILL APPEAR
	xmlhttp.open("POST", "../pokerMethods.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("method=deleteSessionAJAX&delSessId=" + rowId);	
}

function getSessions(){
	$.post('pokerMethods.php', {method: 'GetSessions'}, function (message){
		if(message == 1){
			$('#' + statusDiv).html("You have no recorded sessions. Add one now!");
			document.getElementById(dataDiv).innerHTML = "";
		}
		else{
			document.getElementById(dataDiv).innerHTML = message;
			fillTable();
			//calc('return', 'sum', 'sumTableBody', 'totEarn');
		}
		
	});
}

function getSessionsAndSum(){
	$.post('pokerMethods.php', {method: 'GetSessions'}, function (message){
		if(message == 1){
			$('#' + statusDiv).html("You have no recorded sessions. Add one now!");
			document.getElementById(dataDiv).innerHTML = "";
		}
		else{
			document.getElementById(dataDiv).innerHTML = message;
			fillTable();
			// GET DEFAULT SUMMARY VALS
			calc('return', 'sum', 'sumTableBody', 'totEarn');
			calc('return', 'avg', 'sumTableBody', 'avgEarn');
			calc('duration', 'sum', 'sumTableBody', 'totHrs');
			calc('duration', 'avg', 'sumTableBody', 'avgHrs');
			calc('rate', 'avg', 'sumTableBody', 'avgRate');
			applyFilter('live', 'IS', 'Live'); 
				calc('return', 'sum', 'sumTableBody', 'totEarnLive');
				calc('return', 'avg', 'sumTableBody', 'avgEarnLive'); 
				calc('duration', 'sum', 'sumTableBody', 'totHrsLive');
				calc('duration', 'avg', 'sumTableBody', 'avgHrsLive');
				calc('rate', 'avg', 'sumTableBody', 'avgRateLive');
			fillTable();
			applyFilter('live', 'IS', 'Online');
				calc('return', 'sum', 'sumTableBody', 'totEarnOnline');
				calc('return', 'avg', 'sumTableBody', 'avgEarnOnline');
				calc('duration', 'sum', 'sumTableBody', 'totHrsOnline');
				calc('duration', 'avg', 'sumTableBody', 'avgHrsOnline');
				calc('rate', 'avg', 'sumTableBody', 'avgRateOnline');
			fillTable();
			applyFilter('ringTour', 'IS', 'Ring');
				calc('return', 'sum', 'sumTableBody', 'totEarnCash');
				calc('return', 'avg', 'sumTableBody', 'avgEarnCash');
				calc('duration', 'sum', 'sumTableBody', 'totHrsCash');
				calc('duration', 'avg', 'sumTableBody', 'avgHrsCash');
				calc('rate', 'avg', 'sumTableBody', 'avgRateCash');
			fillTable();
			applyFilter('ringTour', 'IS', 'Tournament');
				calc('return', 'sum', 'sumTableBody', 'totEarnTour');
				calc('return', 'avg', 'sumTableBody', 'avgEarnTour');
				calc('duration', 'sum', 'sumTableBody', 'totHrsTour');
				calc('duration', 'avg', 'sumTableBody', 'avgHrsTour');
				calc('rate', 'avg', 'sumTableBody', 'avgRateTour');
			fillTable();
		}
		showSumTbl('bySess');
		fillTblSelect('tblSelect');
	});
}

function fillTable(){
	// ALL THE FOLLOWING MUST BE IN SEPARATE FXN, 
	// OTHERWISE, CALL WILL BE MADE TO DB EVERY TIME FILTER IS APPLIED
	var dataStr = document.getElementById(dataDiv).innerHTML;
	var splitRegEx = /%/g;
	var rowArr = dataStr.split(splitRegEx);
	var splitSpace = /\s+/g;
	
	// PUT EACH ROW INTO ARRAY AS OBJECT
	// ALL DATA FOR EA. SESSION IS COLLECTED
	var trArr = new Array();
	for(var i=0; i<rowArr.length-1; i++){
		var tr = new Object();
		var attrArr = rowArr[i].split(/#/g);
		tr.id = "tr" + i;
		tr.sessId = attrArr[0];
		// SPLIT THE START DATE STRING SO DATE AND TIME ARE ON 2 SEPARATE LINES		
		tr.startDate = attrArr[1];
		splitDate = tr.startDate.split(splitSpace);
		tr.date = splitDate[0] + " " + splitDate[1] + " " + splitDate[2];
		tr.time = splitDate[3];
		tr.startDate = tr.date + " <br>" + tr.time;
		tr.location = attrArr[2];
		tr.gameType = attrArr[3];
		tr.limit = attrArr[4];
		tr.duration = attrArr[5];
		tr.buyin = attrArr[6];
		tr.cashout = attrArr[7];
		tr.ringtour = attrArr[8];
		tr.place = attrArr[9];
		tr.rate = attrArr[10];
		tr.ret = attrArr[11];
		tr.live = attrArr[12];
		tr.notes = attrArr[13];
		trArr[i] = tr;
	}
	
	// PARSE DESIRED DATA INTO HTML
	// APPLY FILTER BEFORE 'FOR' LOOP
	var dataString = "";
	var x = 1;
	for(var i=0; i<trArr.length; i++){
		dataString = dataString + "<tr id=\"" + trArr[i].sessId + "\">" +
			"<td>" + x + ".</td>" +		// COL 0
			"<td name='startDate'>" + trArr[i].startDate + "</td>" +	// COL 1
			"<td name='location'>" + trArr[i].location + "</td>" +	// COL 2
			"<td name='gameType'>" + trArr[i].gameType + "</td>" +	// COL 3
			"<td name='limit'>" + trArr[i].limit + "</td>" +		// COL 4
			"<td name='duration'>" + trArr[i].duration + "</td>" +	// COL 5
			"<td name='buyin'>" + trArr[i].buyin + "</td>" +		// COL 6
			"<td name='cashout'>" + trArr[i].cashout + "</td>" +	// COL 7
			"<td name='ringtour'>" + trArr[i].ringtour + "</td>" +	// COL 8
			"<td name='place'>" + trArr[i].place + "</td>" +		// COL 9
			"<td name='rate'>" + trArr[i].rate + "</td>" +		// COL 10
			"<td name='return'>" + trArr[i].ret + "</td>" +		// COL 11
			"<td name='live'>" + trArr[i].live + "</td>" +		// COL 12
			"<td name='notes' style='max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + trArr[i].notes + "</td>" +	// COL 13
			"<td><button onclick='editRow(this)'>Edit</button></td>" + // COL 14
			"<td><button onclick='confirmDelete(this)'>Delete</button></td>" + // COL 15
			"</tr>";
			x = x + 1;
	}
	
	// FILL TABLE WITH RESULTS
	if(document.getElementById("filterErrLbl") != null){
		document.getElementById("filterErrLbl").innerHTML = "";
	}
	document.getElementById(tblBodyName).innerHTML = dataString;

}

function fillOperator(){
	var cat = document.getElementById('category').value;
	if(cat == "location" || cat == "gameType" || cat == "limit" || cat == "ringTour" || cat == "live"){
		document.getElementById('operator').innerHTML = "<option>IS</option><option>IS NOT</option>";
	}
	else if(cat == "start"){
		document.getElementById('operator').innerHTML = "<option>IS BEFORE</option><option>IS AFTER</option><option>IS BETWEEN</option>";
	}
	else if(cat == "duration" || cat == "buyin" || cat == "cashout" || cat == "place" || cat == "rate" || cat == "return"){
		document.getElementById('operator').innerHTML = "<option>IS MORE THAN</option><option>IS LESS THAN</option>";
	}
}

function fillFilterVal(){
	var cat = document.getElementById('category').value;
	
	// start = 1;
	// location = 2;
	// gameType = 3;
	// limit = 4;
	// duration = 5;
	// buyin = 6;
	// cashout = 7;
	// ringTour = 8;
	// place = 9;
	// rate = 10;
	// return = 11;
	// live = 12;
	// notes = 13;
	
	// FILL FILTER VAL FIELD WITH OPTIONS FROM TABLE
	switch(cat){
		case "start": // START TIME
			var operator = document.getElementById('operator').value;
			if(operator == "IS BEFORE" || operator == "IS AFTER"){
				filterValStr = "<input type='text' id='filterInput1' />";
			}
			else if(operator == "IS BETWEEN"){
				filterValStr = "<input type='text' id='filterInput1' />" + " AND " +
					"<input type='text' id='filterInput2' />";
			}
			break;
		case "location": // LOCATIONS
			var locations = document.getElementsByName('location');
			// TRIM ARRAY DOWN TO UNIQUE LOCATIONS
			var uniqueLoc = new Array();
			var match = 0;
			var x = 1;
			
			//-------------------------------------------------------------------
			// USE FXN LIKE THIS TO GET AN ARRAY OF UNIQUE VALUES FROM
			// AN ARRAY CONTAINING REPEATED VALUES
			//-------------------------------------------------------------------
			uniqueLoc[0] = locations[0];
			for(i=0; i<locations.length; i++){
				match = 0;
				for(j=0; j<uniqueLoc.length; j++){
					if(uniqueLoc[j].textContent == locations[i].textContent){
						match = 1;
					}
				}
				if(match == 0){
					uniqueLoc[x] = locations[i];
					x = x + 1;
				}
			}
			//-------------------------------------------------------------------
			var filterValStr = "";
			for(var z=0; z<uniqueLoc.length; z++){
				filterValStr = filterValStr + "<option>" + uniqueLoc[z].textContent + "</option>";
			}
			filterValStr = "<select id='filterInput1'>" + filterValStr + "</select>";
			break;
		case "gameType": // GAME TYPE
			var games = document.getElementsByName('gameType');
			// TRIM ARRAY DOWN TO UNIQUE LOCATIONS
			var uniqueGame = new Array();
			var match = 0;
			var x = 1;
			
			//-------------------------------------------------------------------
			// USE FXN LIKE THIS TO GET AN ARRAY OF UNIQUE VALUES FROM
			// AN ARRAY CONTAINING REPEATED VALUES
			//-------------------------------------------------------------------
			uniqueGame[0] = games[0];
			for(i=0; i<games.length; i++){
				match = 0;
				for(j=0; j<uniqueGame.length; j++){
					if(uniqueGame[j].textContent == games[i].textContent){
						match = 1;
					}
				}
				if(match == 0){
					uniqueGame[x] = games[i];
					x = x + 1;
				}
			}
			//-------------------------------------------------------------------
			var filterValStr = "";
			for(var z=0; z<uniqueGame.length; z++){
				filterValStr = filterValStr + "<option>" + uniqueGame[z].textContent + "</option>";
			}
			filterValStr = "<select id='filterInput1'>" + filterValStr + "</select>";
			break;
		case "limit": // LIMITS
			var limits = document.getElementsByName('limit');
			// TRIM ARRAY DOWN TO UNIQUE LOCATIONS
			var uniqueLim = new Array();
			var match = 0;
			var x = 1;
			
			//-------------------------------------------------------------------
			// USE FXN LIKE THIS TO GET AN ARRAY OF UNIQUE VALUES FROM
			// AN ARRAY CONTAINING REPEATED VALUES
			//-------------------------------------------------------------------
			uniqueLim[0] = limits[0];
			for(i=0; i<limits.length; i++){
				match = 0;
				for(j=0; j<uniqueLim.length; j++){
					if(uniqueLim[j].textContent == limits[i].textContent){
						match = 1;
					}
				}
				if(match == 0){
					uniqueLim[x] = limits[i];
					x = x + 1;
				}
			}
			//-------------------------------------------------------------------
			var filterValStr = "";
			for(var z=0; z<uniqueLim.length; z++){
				filterValStr = filterValStr + "<option>" + uniqueLim[z].textContent + "</option>";
			}
			filterValStr = "<select id='filterInput1'>" + filterValStr + "</select>";
			break;
		case "duration": // DURATION
			filterValStr = "<input type='text' id='filterInput1'  />h<input type='text' id='filterInput2' />m";
			break;
		case "buyin": // BUY-IN
			filterValStr = "$<input type='text' id='filterInput1' />";
			break;
		case "cashout": // CASH OUT
			filterValStr = "$<input type='text' id='filterInput1' />";
			break;
		case "ringTour": // RING/TOUR (0 = RING, 1 = TOURNAMENT)
			filterValStr = "<option>Ring</option><option>Tournament</option>";
			filterValStr = "<select id='filterInput1'>" + filterValStr + "</select>";
			break;
		case "place": // PLACE
			filterValStr = "<input type='text' id='filterInput1' />";
			break;
		case "rate": // RATE
			filterValStr = "$/hr.<input type='text' id='filterInput1' />";
			break;
		case "return": // RETURN
			filterValStr = "$<input type='text' id='filterInput1' />";
			break;
		case "live": // RETURN
			filterValStr = "<option>Live</option><option>Online</option>";
			filterValStr = "<select id='filterInput1'>" + filterValStr + "</select>";
			break;	
	} // END SWITCH
	
	document.getElementById('filterVal').innerHTML = filterValStr;
	if(cat == "start"){
		$('#filterInput1').datepicker();
		$('#filterInput1').datepicker('setDate', new Date());
		$('#filterInput2').datepicker();
		$('#filterInput2').datepicker('setDate', new Date());
	}			
	
}

function applyFilter(cat, oper, filVal1, filVal2){
	// start = 1;
	// location = 2;
	// gameType = 3;
	// limit = 4;
	// duration = 5;
	// buyin = 6;
	// cashout = 7;
	// ringTour = 8;
	// place = 9;
	// rate = 10;
	// return = 11;
	// live = 12;
	// notes = 13;

	var error = "";
	
	// CONVERT RING/TOUR VAL TO 0 OR 1
	if(cat == "ringTour"){
		if(filVal1 == "Ring"){
			filVal1 = 0;
		}
		else{
			filVal1 = 1;
		}
	}
	
	// CONVERT LIVE/ONLINE VAL TO 0 OR 1
	if(cat == "live"){
		if(filVal1 == "Live"){
			filVal1 = 0;
		}
		else{
			filVal1 = 1;
		}
	}
	
	// CONVERT DURATION VAL TO DOUBLE-DIGIT STRING
	if(cat == "duration"){
		if(filVal2 < 10){
			if(filVal2 == ""){
				filVal2 = "00";
			}
			else{
				filVal2 = "0" + filVal2;
			}
		}
		else if(filVal2 >= 60){
			error = "Duration minutes must be less than 60.";
		}
		filVal1 = filVal1 + filVal2;
	}
	
	// IF USER FILTERS ON DATE (CAT = 1), CONVERT DATEPICKER VAL TO JS DATE
	if(cat == "start"){
		if(oper == "IS BETWEEN"){
			filVal1 = dpToJsDate(filVal1);
			filVal2 = dpToJsDate(filVal2);
		}
		else{
			filVal1 = dpToJsDate(filVal1);
		}
	}
	
	// IF USER FILTERS ON "PLACE", APPLY TOURNAMENT FILTER FIRST
	
	var tbl = document.getElementById(tblBodyName);
	var rowColl = tbl.rows;
	var filterArr = new Array();
	var j = 0;
	
	//-------------------------------------------------------------------
	// SET CATEGORY NAMES = THEIR COLUMN INDEX
	// ANY CHANGES TO COLUMN ORDER MUST BE REFLECTED HERE
	//-------------------------------------------------------------------
	var colNum = 0;
	switch(cat){
		case "start":
			colNum = 1;
			break;
		case "location":
			colNum = 2;
			break;
		case "gameType":
			colNum = 3;
			break;
		case "limit":
			colNum = 4;
			break;
		case "duration":
			colNum = 5;
			break;
		case "buyin":
			colNum = 6;
			break;
		case "cashout":
			colNum = 7;
			break;
		case "ringTour":
			colNum = 8;
			break;
		case "place":
			colNum = 9;
			break;
		case "rate":
			colNum = 10;
			break;
		case "return":
			colNum = 11;
			break;
		case "live":
			colNum = 12;
			break;
	}
	
	//-------------------------------------------------------------------
	// PUT IDS OF EXCLUDED ROWS INTO FILTER ARRAY
	if(error == "" || error == undefined){
		for(var i=0; i<rowColl.length; i++){
			var cellColl = rowColl[i].cells;
			switch(oper){
				case "IS NOT":
					if(cellColl[colNum].textContent == filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}
					break;
				case "IS":
					if(cellColl[colNum].textContent != filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}
					break;
				case "IS MORE THAN":
					var tblVal = cellColl[colNum].textContent;
					if(cat == "duration"){ // DURATION
						var splitH = /h/i;
						var durArr = tblVal.split(splitH);
						var durHr = durArr[0];
						var durComboMin = durArr[1];
						var splitM = /m/i;
						var durMinArr = durComboMin.split(splitM);
						var durMin = durMinArr[0];
						tblVal = durHr + durMin;
					}
					if(cat == "place"){
						if(cellColl[8].textContent == "0"){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
						else if(parseFloat(tblVal) <= filVal1){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
					}
					else if(parseFloat(tblVal) <= filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}
					break;
				case "IS LESS THAN":
					var tblVal = cellColl[colNum].textContent;
					if(cat == "duration"){ // DURATION
						var splitH = /h/i;
						var durArr = tblVal.split(splitH);
						var durHr = durArr[0];
						var durComboMin = durArr[1];
						var splitM = /m/i;
						var durMinArr = durComboMin.split(splitM);
						var durMin = durMinArr[0]
						tblVal = durHr + durMin;
					}
					if(cat == "place"){
						if(cellColl[8].textContent == "0"){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
						else if(parseFloat(tblVal) >= filVal1){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
					}
					else if(parseFloat(tblVal) >= filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}			
					break;
				case "IS BEFORE":
					var tblDateStr = cellColl[colNum].textContent;
					// CONVERT TABLE DATETIME TO JS DATE
					var tblDate = tblToJsDate(tblDateStr);
					if(tblDate >= filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}
					break;
				case "IS AFTER":
					var tblDateStr = cellColl[colNum].textContent;
					// CONVERT TABLE DATETIME TO JS DATE
					var tblDate = tblToJsDate(tblDateStr);
					if(tblDate < filVal1){
						filterArr[j] = rowColl[i].id;
						j = j + 1;
					}
					break;
				case "IS BETWEEN":
					var tblDateStr = cellColl[colNum].textContent;
					var tblDate = tblToJsDate(tblDateStr);
					if(filVal1 <= filVal2){
						if(tblDate < filVal1 || tblDate >= filVal2){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
					}
					else{
						if(tblDate < filVal2 || tblDate >= filVal1){
							filterArr[j] = rowColl[i].id;
							j = j + 1;
						}
					}
					break;
			} // END SWITCH
		} // END FOR
		for(var x=0; x<filterArr.length; x++){
			for(var y=0; y<rowColl.length; y++){
				if(rowColl[y].id == filterArr[x]){
					document.getElementById(tblBodyName).deleteRow(y);
				}
			}
		}
	}
	else{
		document.getElementById('filterErrLbl').innerHTML = error;
	}
	
	// IF TABLE DEST. IS SUMMARY PG., DON'T RENUMBER ROWS- ROW NUMS WILL BE USED FOR GRAPH X DATA
	if(tblBodyName != 'sumTableBody'){
		// RE-NUMBER ROWS
		for(var y=0; y<rowColl.length; y++){
			var z = y + 1;
			rowColl[y].cells[0].textContent = z + "."
		}
	}
}

function calc(cat, oper, srcBody, retRow){
	//-------------------------------------------------------------------
	// SET CATEGORY NAMES = THEIR COLUMN INDEX
	// ANY CHANGES TO COLUMN ORDER MUST BE REFLECTED HERE
	//-------------------------------------------------------------------
	var colNum = 0;
	switch(cat){
		case "start":
			colNum = 1;
			break;
		case "location":
			colNum = 2;
			break;
		case "gametype":
			colNum = 3;
			break;
		case "limit":
			colNum = 4;
			break;
		case "duration":
			colNum = 5;
			break;
		case "buyin":
			colNum = 6;
			break;
		case "cashout":
			colNum = 7;
			break;
		case "ringTour":
			colNum = 8;
			break;
		case "place":
			colNum = 9;
			break;
		case "rate":
			colNum = 10;
			break;
		case "return":
			colNum = 11;
			break;
		case "live":
			colNum = 12;
			break;
	}
	
	var srcRows;
	srcRows = document.getElementById(srcBody).rows;
	//retRows = document.getElementById(retRow).rows
	var srcCells = new Array();
	var result = 0;
	var sum = 0;
	var data = 0;
	for(var i=0; i<srcRows.length; i++){
		srcCells = srcRows[i].cells;
		
		if(cat == "duration"){
			data = srcCells[colNum].textContent;
			data = toCalcDur(data);
		}
		else{
			data = parseFloat(srcCells[colNum].textContent);
		}
		
		sum = sum + data;
		
		if(oper == 'sum'){
			result = sum;
		}
		if(oper == 'avg'){
			result = sum/srcRows.length;
		}
	}
	
	// NEED TO CONVERT DURATION BACK TO TBL FORMAT
	if(cat == "duration"){
			result = toTblDur(result);
	}
	else{
		result = result.toFixed(2);
	}
	
	var dataString = "<td>" + result + "</td>";
	
	document.getElementById(retRow).innerHTML = dataString;

}

function editGetVals(){
	$.post('pokerMethods.php', {method: 'editGetVals'}, function(message){
		// RETURN DB VARS AS STRING, THEN PARSE INTO ARRAY
		var splitRegEx = /#/g;
		var splitMsgArray = message.split(splitRegEx);
		
		// START DATE
		var editStDate = splitMsgArray[0];
		$('#datepickerEdit').val(editStDate);
		
		// START TIME
		var editStTime = splitMsgArray[1];
			var splitTimeRegEx = /:/g;
			var splitEditStTimeArray = editStTime.split(splitTimeRegEx);
			var editStHr24 = splitEditStTimeArray[0];
			var editStMin24 = splitEditStTimeArray[1];
			var editStAmPm = "am"

			if(editStHr24 > 12){
				editStHr12 = editStHr24 - 12;
				editStAmPm = "pm";
			}
			else{
				editStHr12 = editStHr24;
			}
			
			var editStHrOptions = document.getElementsByName('editStHourOption');
			
			for(var i=0; i<editStHrOptions.length; i++){
				if(editStHrOptions[i].value == editStHr12){
					editStHrOptions[i].selected = true;
				}
			}
			
			var editStMinOptions = document.getElementsByName('editStMinOption');
			
			for(var i=0; i<editStMinOptions.length; i++){
				if(editStMinOptions[i].value == editStMin24){
					editStMinOptions[i].selected = true;
				}
			}
			
			var editStAmPmOptions = document.getElementsByName('editStAmPmOption');
			
			for(var i=0; i<editStAmPmOptions.length; i++){
				if(editStAmPmOptions[i].value == editStAmPm){
					editStAmPmOptions[i].selected = true;
				}
			}
		
		// END DATE
		var editEndDate = splitMsgArray[2];
		$('#datepickerEdit1').val(editEndDate);
		
		// END TIME
		var editEndTime = splitMsgArray[3];
			var splitEditEndTimeArray = editEndTime.split(splitTimeRegEx);
			var editEndHr24 = splitEditEndTimeArray[0];
			var editEndMin24 = splitEditEndTimeArray[1];
			var editEndAMPM = "am"
			
			if(editEndHr24 > 12){
				editEndHr12 = editEndHr24 - 12;
				editEndAMPM = "pm";
			}
			else{
				editEndHr12 = editEndHr24;
			}
			
			var editEndHrOptions = document.getElementsByName('editEndHrOption');
			for(var i=0; i<editEndHrOptions.length; i++){
				if(editEndHrOptions[i].value == editEndHr12){
					editEndHrOptions[i].selected = true;
				}
			}
			
			var editEndMinOptions = document.getElementsByName('editEndMinOption');
			for(var i=0; i<editEndMinOptions.length; i++){
				if(editEndMinOptions[i].value == editEndMin24){
					editEndMinOptions[i].selected = true;
				}
			}
			
			var editEndAmPmOptions = document.getElementsByName('editEndAmPmOption');
			for(var i=0; i<editEndAmPmOptions.length; i++){
				if(editEndAmPmOptions[i].value == editEndAMPM){
					editEndAmPmOptions[i].selected = true;
				}
			}
		
		// LOCATION
		var editLocation = splitMsgArray[4];
		getLocList(editLocation);
		
		//LOCATION TYPE
		showLocType();
			
		// GAME TYPE
		var editGameType = splitMsgArray[5];
		getList('game', editGameType);
		
		// RING/TOUR
		var editRingTourType = splitMsgArray[6];
		var editRingTourTypeOptions = document.getElementsByName('editRingTourRadio');
		for(var i=0; i<editRingTourTypeOptions.length; i++){
			if(editRingTourTypeOptions[i].value == editRingTourType){
				editRingTourTypeOptions[i].checked = true;
			}
		}
		
		// LIMITS
		var editLimit = splitMsgArray[7];
		getList('limit', editLimit);
		
		// BUY-IN
		var editBuyin = splitMsgArray[8];
		$('#editBuyin').val(editBuyin);
		
		// CASH OUT
		var editCashOut = splitMsgArray[9];
		$('#editCashout').val(editCashOut);
		
		// PLACE
		var editPlace = splitMsgArray[10];
		$('#editPlace').val(editPlace);
		
		// NOTES
		var editNotes = splitMsgArray[11];
		$('#editNotes').val(editNotes);
		
	});
}


