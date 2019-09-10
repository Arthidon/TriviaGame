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
        displayResult();
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
        timeUp();
    }
}



// display question and choices in game DIV

    function loadQuestion() {
        counter = 30;
        timer = setInterval(countDown, 1000);

        question = quizQuestions[currentQuestion].question; //
        choices = quizQuestions[currentQuestion].choices; // 


        $('#time').html('Time: ' + counter);
       $('#game').html(`
       <h4> ${question} </h4>
        ${loadChoices(choices)}
       `);
        
    }


    // display choices
    function loadChoices(choices) {
       var result = '';
        
        for ( i = 0; i < choices.length; i++) {
            result += `<p class="choice" data-answer='${choices[i]}' > ${choices[i]} </p>`
              
        }
        return result;
    }

    //check if clicked item is correct answer

      $(document).on('click', '.choice', function() {
        clearInterval(timer);
        const selectedAnswer = $(this).attr('data-answer');
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if (correctAnswer === selectedAnswer) {
            // User Wins
            score++;
            nextQuestion();
            console.log("Wins");
        } else {
            lost++;
            nextQuestion();
            console.log("Lost!");
        }
        console.log("test ", selectedAnswer);

      });

function displayResult() {
    const result =`
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length}</p>
        <button class="btn bt-primary" id="reset">Reset Game</button>
    `;

    $("#game").html(result);
}
    $(document).on('click', '#reset', function(){
        counter = 30;
        currentQuestion = 0;
        score = 0;
        lost = 0;
        timer = null;

        loadQuestion();
    });


loadQuestion();
