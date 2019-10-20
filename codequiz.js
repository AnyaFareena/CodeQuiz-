
var sec = 30;
var time;

//initialize all the components
function initialise() {
    var grid = document.createElement('div');
    grid.setAttribute('class','grid');
    grid.setAttribute('id','grid');
    document.body.appendChild(grid);
    var quiz = document.createElement('div');
    quiz.setAttribute('id','quiz');
    grid.appendChild(quiz);
    var question = document.createElement('p');
    question.setAttribute('id','question');
    grid.appendChild(question);
    var buttons = document.createElement('button');
    buttons.setAttribute('class','buttons');
    grid.appendChild(buttons);
    var btn0 = document.createElement('button');
    btn0.setAttribute('id','btn0');
    buttons.appendChild(btn0);
    var choice0 = document.createElement('span');
    choice0.setAttribute('id','choice0');
    btn0.appendChild(choice0);
    var btn1 = document.createElement('button');
    btn1.setAttribute('id','btn1');
    buttons.appendChild(btn1);
    var choice1 = document.createElement('span');
    choice1.setAttribute('id','choice1');
    btn1.appendChild(choice1);
    var btn2 = document.createElement('button');
    btn2.setAttribute('id','btn2');
    buttons.appendChild(btn2);
    var choice2 = document.createElement('span');
    choice2.setAttribute('id','choice2');
    btn2.appendChild(choice2);
    var btn3 = document.createElement('button');
    btn3.setAttribute('id','btn3');
    buttons.appendChild(btn3);
    var choice3 = document.createElement('span');
    choice3.setAttribute('id','choice3');
    btn3.appendChild(choice3);
    var progress = document.createElement('p');
    progress.setAttribute('id','progress');
    grid.appendChild(progress);
    startTheQuiz();
} 

//get the start button disabled once the quiz starts
function startTheQuiz() {
    document.getElementById("onSubmit").setAttribute("disabled", "disabled");
    populate();
    time = setInterval(myTimer, 1000);
}

//to display timer
function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec === -1) {
        clearInterval(time);
        alert("Time out!!");
        showScores();}
    else if (quiz.isEnded()){
        clearInterval(time);
        alert("Completed");
    }
    }

    //populate questions and its choices
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
            // show question
            var element = document.getElementById("question");
            element.innerHTML = quiz.getQuestionIndex().text;

            // show options
            var choices = quiz.getQuestionIndex().choices;
            for(var i = 0; i < choices.length; i++) {
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
            }

            showProgress();
    }

};

//uses constructor function to get the answer verified
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

//shows the progess quesstions x of total are completed
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//function to display final scores and write to local storage
function showScores() {
    var gameOverHTML= "Your scores: " + quiz.score + " "+ "of total "+ quiz.questions.length;
    console.log(gameOverHTML);
    var inputext=document.createElement('P');
    inputext.innerText="Enter your initials here:";
    var inputIni = document.createElement("INPUT");
    inputIni.setAttribute("type", "text");
    inputIni.setAttribute("value", "");
    var element = document.getElementById('grid');
    element.innerHTML=gameOverHTML;
    element.appendChild(inputext) ;
    element.appendChild(inputIni);
    var saveScore = document.createElement('button');
    saveScore.setAttribute('id','saveScore');
    saveScore.innerHTML='Save Your Score';
    element.appendChild(saveScore);
    saveScore.addEventListener('click', function(event) {
        var saveData={
            'Score':quiz.score,
            'Initial':inputIni.value
        };
        localStorage.setItem('saveData',JSON.stringify(saveData));

    });

};
//diaply the total scores using View button
function displayScores() {
    var scores = document.getElementById('coding');
    var retrievedObject = JSON.parse(localStorage.getItem('saveData'));
    if (retrievedObject== null) { 
        alert("No data was saved");}
    else {
    var score = retrievedObject.Score;
    var initial = retrievedObject.Initial;
    scores.innerHTML="Data is retrived from window.localStorage" + "<br>"+"Score for" +initial+ " is: " + score;}
}

// create questions
var questions = [
    new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
    new Question("Which event occurs when the user clicks on an HTML element?", ["mouseClick","mouseOver","onChange","onClick"], "onClick"),
    new Question("How to write an IF statement in JavaScript?", ["if i==5","if i==5 then","if (i==5)", "if: i==5"], "if (i==5)"),
    new Question("How can you add a comment in a JavaScript?", ["//Comment","'Comment'","Comment=",":Comment"], "//Comment"),
    new Question("Which operator is used to assign a value to a variable?", ["=",":","-","x"], "="),
    new Question("How does a FOR loop start?", ["for(i=0;i<=5)","for(i<=5;i++)","for(i=1 to 5)","for(i=0;i<=5;i++)"], "for(i=0;i<=5;i++)")
];

// create quiz
var quiz = new Quiz(questions);

