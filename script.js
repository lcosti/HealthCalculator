var User = {
		id: 0,
		name: 0,
		age : 0,
		gender: 0,
		gymMember: 0,
		gym: 0,
		gymPrice: 0,
		exerciseLevel: 0,
		exerciseDuration: 0,
		height: 0,
		weight: 0,
		heartRate: 0
	};
var currentQuestion = 1;
var currentStep = 1;

$(document).ready(function(){
// Clear Text Box when focus
$('input[type=text]').focus(function(){
	if (this.value.indexOf('Enter') != -1 || this.value.indexOf('Whoops') != -1){
	this.value = "";
	}
});
// Functions
function phaseIn(element){ 
	$(element).animate({
		left: "0",
		opacity: "1"		  
	}, 100);
}
function phaseOut(element){ 
	$(element).animate({
		left: "50%",
		opacity: "0"
	}, 100);
}
function collectAnswers(element){
	 var inputName = $(element).attr("name");
	 switch(inputName){
		case "yourName":
		 	User.name = element.value;
			$('.aboutyou h2').text("About " + User.name);
			if(User.name != 0){
				$("#progressDot11").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;		 
		case "age":
		 	User.age = parseInt(element.value);
			var MinHR = Math.round((70/100) * (225 - User.age));
			var MaxHR =  Math.round((75/100) * (225 - User.age));
			$("#heartRate").text(MinHR + "-" + MaxHR);
			if(User.age != 0){
				$("#progressDot12").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "gender":
		 	User.gender = element.value
			if (User.gender === "girl"){
				$(".aboutyou img").attr("src", "images/youF.png")
			} else if (User.gender === "boy"){
				$(".aboutyou img").attr("src", "images/youM.png")
			}
			if(User.gender != 0){
				$("#progressDot13").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "gymMember":
		 	if(element.value === "1"){
				User.gymMember = true;
				phaseIn($('#whichGym'));
				}
			if(element.value === "0"){
				User.gymMember = false;
				phaseOut($('#whichGym'));
				}
			if (User.gymMember != 0 || User.gymMember === false){
				if(User.gymMember === true && User.gym === 0){				
				} else {
					$("#progressDot21").css("background-color", "rgb(5, 163, 5)");
				}
			}
		 	break;
		case "gym":
			if($(element).attr("value") === "1"){
				User.gym = "Virgin"
				User.gymPrice = 84;
				} else if($(element).attr("value") === "2"){
					User.gym = "GymBox"
				User.gymPrice = 73;
				} else {User.gym = 0;}
				if(User.gymMember === true && User.gym != 0){
					$("#progressDot21").css("background-color", "rgb(5, 163, 5)");	
				} else { $("#progressDot21").css("background-color", "rgb(226, 226, 226)");	}
			break;
		case "exerciseLevel":
			if(element.value === "0"){
				phaseOut($('#exerD'));
				$('input:text[name="exerciseLevel"]').val("");
			} else {
				phaseIn($('#exerD'));
				$('input:radio[name="exerciseLevel"]').prop('checked', false);
			}
			if($(element).parent().children('select').val() === "week"){
				User.exerciseLevel = element.value
			} else{	User.exerciseLevel = (element.value / 4);
			}
			if(User.exerciseLevel != 0){
				$("#progressDot22").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "exerciseDuration":
		 	User.exerciseDuration = parseInt($(element).val());
			if(User.exerciseDuration != 0){
				$("#progressDot23").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "height":
		 	if($(element).parent().children('select').val() === "feet"){
				// Get Entered Weight	
				var baseHeight = element.value;
				var splitHeight = baseHeight.split('.');
				var feet = splitHeight[0];
				var inches = splitHeight[1] / 12;
				var heightDecimal = parseInt(feet) + inches;			
				var convertedHeight = (heightDecimal/0.032808);
				User.height = Math.floor(convertedHeight);
			} else{
				User.height = parseInt(element.value);
			}
			if(User.height != 0){
				$("#progressDot31").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "heightUnits":
		 	if(element.val() === "cm"){
			User.height = parseInt(element.parent().parent().children("input[type='text']").val());
			} else if(element.val() === "feet"){
				var baseHeight = parseFloat(element.parent().parent().children("input[type='text']").val());
				if(baseHeight.indexOf(".") != -1){
				var splitHeight = baseHeight.split('.');
				var feet = splitHeight[0];
				var inches = splitHeight[1] / 12;				
				var heightDecimal = parseInt(feet) + inches;			
				var convertedHeight = (heightDecimal/0.032808);
				} else { var convertedHeight = baseHeight/0.032808}
				User.height = Math.floor(convertedHeight);
			}
		 	break;
		case "weight":
			if($(element).parent().children('select').val() === "lb"){	
				var baseWeight = element.value;
				var splitWeight = baseWeight.split('.');
				var stone = splitWeight[0];
				var lb = splitWeight[1];
				//convert all to lb
				if(lb != null){
					var weightInLb = (stone * 14) + parseInt(lb);
				} else {var weightInLb = (stone * 14);}
				
				var weightInKg = weightInLb * 0.453592;
				User.weight = Math.floor(weightInKg);
			} else{
				User.weight = element.value;		 	
			}
			if(User.weight != 0){
				$("#progressDot32").css("background-color", "rgb(5, 163, 5)");
			}
			break;
		case "heartRate":
		 	User.heartRate = parseInt(element.value);
			if(User.heartRate != 0){
				$("#progressDot33").css("background-color", "rgb(5, 163, 5)");
			} else { $("#progressDot33").css("background-color", "rgb(226, 226, 226) "); }
		 	break;
		 }
		 // Check if all questions answered
		 var questionsAnswered = 0;
		 for( var i = 0 ; i< $(".progressDot").length ; i++){
			 var thisDot = $(".progressDot")[i];
			 if($(thisDot).css("background-color") === "rgb(5, 163, 5)"){
				 questionsAnswered ++;
				 }
			 }
			 if (questionsAnswered === 9){
				 $(".submit").css("transform", "scale(1)");
				 }
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
$('input').change(function() {
	collectAnswers(this);
});
$('select').change(function() {
	collectAnswers($(this).find(":selected"));
});
function rotateRight(){
	var sections = $("section");
	var questions = $(".questionContainer");
	var currentQuestion = questions
	for(var i=0 ; i<sections.length ; i++){
		var thisSection = sections[i];
		if(thisSection.className.indexOf("deg1") != -1){
			$(thisSection).removeClass("deg1");
			$(thisSection).addClass("deg3");
		} else if(thisSection.className.indexOf("deg2") != -1){
			$(thisSection).removeClass("deg2");
			$(thisSection).addClass("deg1");
		} else if(thisSection.className.indexOf("deg3") != -1){
			$(thisSection).removeClass("deg3");
			$(thisSection).addClass("deg2");
		}		
	}
}
function fadeOutQuestions(){
	$(".questionContainer").each(function(){
			$(this).css("opacity", 0);
			$(this).css("z-index", 0);
		});
	}
function changeQuestion(nextQuestion, nextStep){
	if (currentQuestion === nextQuestion){}
		else{
			fadeOutQuestions();
			$("#question" + nextQuestion).css("opacity", 1);
			$("#question" + nextQuestion).css("z-index", 1);
			changeStep(nextStep);
			currentQuestion = nextQuestion;			
		}
	}
function changeStep(nextStep){
	if(nextQuestion === null){var nextQuestion=0;}
	if(currentStep === nextStep && currentQuestion === nextQuestion){}
	else{ 
			$(".breadcrumb").each(function(){
				$(this).css("transform", "scale(1)");
				$(this).css("background", "white");
			});
		var questionContainer = $("#question" + currentQuestion);
		if(nextStep === 1){
			$(questionContainer).css("transform", "translateX(0%)");
		} else if(nextStep === 2){
			$(questionContainer).css("transform", "translateX(-33%)");
		} else if(nextStep === 3){
			$(questionContainer).css("transform", "translateX(-65%)");
		}
		currentStep = nextStep;		
		}
	$("#breadcrumb" + currentStep).css("transform", "scale(1.2)");
	$("#breadcrumb" + currentStep).css("background", "rgb(60, 133, 244)");
}
// Input Functions
$("section").click(function(){
	var thisSection = this.className;	
	if(thisSection.indexOf("deg1") != -1){
	} else if(thisSection != -1){
		while(thisSection.indexOf("deg1") === -1){
			rotateRight();
			thisSection = this.className;
		}
		if (thisSection.indexOf("aboutyou") != -1){
			var nextQuestion = 1;
				changeQuestion(nextQuestion, 1);
		}else if (thisSection.indexOf("Fitness") != -1){
			var	nextQuestion = 2;
			changeQuestion(nextQuestion, 1);
		} else if (thisSection.indexOf("Health") != -1){
			var nextQuestion = 3;
				changeQuestion(nextQuestion, 1);
		}
	}
});
$("button").click(function(){
	if (this.id === "next"){
		var nextStep = currentStep + 1;
		if (nextStep === 4 && currentQuestion != 3){
			var nextQuestion = currentQuestion + 1;
			rotateRight();
			changeQuestion(nextQuestion, 1);
			}
			else if(nextStep === 4 && currentQuestion === 3){}
			else{
				changeStep(nextStep);
					}
	} else if (this.id === "previous"){
		var nextStep = currentStep - 1;
		if (nextStep < 1){
			nextStep = 1;
			} else{
		changeStep(nextStep)	;
					}
	}
});
$(".breadcrumb").click(function(){
	var nextStep = parseInt(this.id.substring(this.id.length - 1, this.id.length));
	changeStep(nextStep);
	});
	// Set Up function
function setUpCalc(){
	changeQuestion(1);
	changeStep(1);
	setTimeout(function() {
    $(".container").css("transform","scale(1)");
	$(".circlePulseContainer").css("transform","scale(1)");
}, 100);
setTimeout(function() {
    $(".circlePulseSmall").css("transform","scale(1)");
}, 300);	
	setTimeout(function() {
     $(".circlePulse").css("transform","scale(1)");	
}, 500);
	
}
// Calculation Function
$('.getResults').click(function(){
	//Collect all values
	var Answers = [];	
	console.log(User);
	if(User.gender === "boy"){
		var caloriesBurned = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * User.exerciseDuration / 4.184));		
	}
	else if(User.gender === "girl"){
		var caloriesBurned = Math.round((((User.age * 0.074) + (User.weight * 0.1263) + (User.heartRate * 0.4472) - 20.4022) * User.exerciseDuration / 4.184));
	}
	var caloriesPerWeek = caloriesBurned * User.exerciseLevel;
	var caloriesPerMonth = caloriesPerWeek * 4;
	var pricePerCalorie = parseInt(User.gymPrice) / caloriesPerMonth;
	console.log(caloriesBurned);
	console.log(Math.round(pricePerCalorie));
});
setUpCalc();
});