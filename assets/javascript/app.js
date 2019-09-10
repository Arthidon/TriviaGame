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
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
    
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
        ${loadRemainingQuestion()}
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
            preloadImage('win');
            setTimeout(nextQuestion, 3 * 1000);
            console.log("Wins");
        } else {
            lost++;
            preloadImage('lost');
            setTimeout(nextQuestion, 3 * 1000);
            console.log("Lost!");
        }
        console.log("test ", selectedAnswer);

      });

function displayResult() {
    const result =`
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length}</p>
        <button class="btn bt-dark" id="reset">Reset Game</button>
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

    function loadRemainingQuestion() {
        const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
        const totalQuestion = quizQuestions.length;

        return `Remaining Questions: ${remainingQuestion}/${totalQuestion}`;

    }


//Display images
    function randomImage(images) {
       const random = Math.floor(Math.random() * images.length);
        randomImage = images[random];
        return randomImage;
    }



    function preloadImage(status){
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if (status === 'win') {
            $('#game').html(`
                <p class = "preload-image">Congratulations, you picked the correct answer</p>
                <p class = "preload-image">The correct answer is <b>${correctAnswer}</b></p>
                <img src="${randomImage(funImages)}"/>
            
            `)
        } 
        
        
        else {
            $('#game').html(`
                <p class = "preload-image">The correct answer was <b>${correctAnswer}</b></p>
                <p class = "preload-image">That was Horrible!</p>
                <img src="${randomImage(sadImages)}"/>
            `)
        }

}



$('#start').click(function() {
    $('#start').remove();
    $('time').html(counter);
    loadQuestion();
})
