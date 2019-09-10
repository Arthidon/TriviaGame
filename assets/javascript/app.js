//Initial Values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;



function nextQuestion() {
    
    isQuestionOver = (quizQuestions.length - 1) === currentQuestion;

    if (isQuestionOver) {
        //TODO
        console.log("GAME OVER!!");
    }

    else {
    currentQuestion++;
    loadQuestion();
    }

}

//Start 30 second Timer for each question


function timeUp(){
    clearInterval(timer);

    lost++;

    nextQuestion();
}

function countDown() {
    counter--;
    $('#time').html("Timer: " + counter);

    if (counter === 0) {
        //TODO
        timeUp();
    }
}



// display question and choices in game DIV

    function loadQuestion() {
        counter = 3;
        timer = setInterval(countDown, 1000);

        question = quizQuestions[currentQuestion].question; //
        choices = quizQuestions[currentQuestion].choices; // 


        $('#time').html('Time: ' + counter);
       $('#game').html("<h4>" + question + "</h4>"
       + "<P>" + loadChoices(choices) + "</p>"
       )
        
    }


    // display choices
    function loadChoices(choices) {
       var result = "";
        //$(result).addClass("choice");
        
        
        

        for ( i = 0; i < choices.length; i++) {
            $(result).addClass("choice");    
            $(result).data("data-answer", choices[i]);
           
            result += "<p class= choice data-answer= choices[i]>" + choices[i] + "</p>";
      
        console.log(result);
        }
        return result;
    }


loadQuestion();
//class="choice" data-answer="choices[i]"