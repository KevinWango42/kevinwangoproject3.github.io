// Generate a random integer between min (inclusive) and max (inclusive)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Generate a math problem and update the problem div

  function generateProblem() {
    var num1 = getRandomInt(1, 10);
    var num2 = getRandomInt(1, 10);
    var operator = ['+', '-', 'x'][getRandomInt(0, 2)];
    var problemString = num1 + ' ' + operator + ' ' + num2 + ' = ';
    document.getElementById('problem').textContent = problemString;
  }
  
  // Checks to see if the player's answer is correct and update the score

function checkAnswer() {
  var problemString = document.getElementById('problem').textContent;
  var answer = parseInt(document.getElementById('answer').value);
  var resultDiv = document.getElementById('result');
  var scoreSpan = document.getElementById('score');
  var currentScore = parseInt(scoreSpan.textContent);
  var problemParts = problemString.split(' ');
  var num1 = parseInt(problemParts[0]);
  var operator = problemParts[1];
  var num2 = parseInt(problemParts[2]);
  var correctAnswer;

  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case 'x':
      correctAnswer = num1 * num2;
      break;
    default:
      break;
  }

  if (answer === correctAnswer) {
    resultDiv.textContent = 'Correct!';
    resultDiv.style.color = 'green';
    currentScore += 100; //Updates score every time answer is correct
  } else {
    resultDiv.textContent = 'Incorrect! Try again.';
    resultDiv.style.color = 'red';
    return; // Skip generating a new problem if the answer is incorrect
  }

  scoreSpan.textContent = currentScore;

  // Generates a new problem or show congratulations card

  if (currentScore >= 300) {
    showCongratulationsCard(currentScore);
  } else {
    generateProblem();
    document.getElementById('answer').value = '';
  }
}

  
  // Displays congratulations card after completing 3 equations

  function showCongratulationsCard(score) {
    var gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
  
    var congratsCard = document.createElement('div');
    congratsCard.id = 'congrats-card';
  
    var congratsHeading = document.createElement('h2');
    congratsHeading.textContent = 'Congratulations!';
    congratsCard.appendChild(congratsHeading);
  
    var scoreParagraph = document.createElement('p');
    scoreParagraph.textContent = 'Your final score is: ' + score;
    congratsCard.appendChild(scoreParagraph);
  
    var playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.id = 'play-again-btn';
    playAgainButton.addEventListener('click', playAgain);
    congratsCard.appendChild(playAgainButton);
  
    gameContainer.appendChild(congratsCard);
  }
  
  // Play again function

  function playAgain() {
    var congratsCard = document.getElementById('congrats-card');
    congratsCard.remove();
  
    var gameContainer = document.getElementById('game-container');
  
    var problemDiv = document.createElement('div');
    problemDiv.id = 'problem';
    gameContainer.appendChild(problemDiv);
  
    var answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.id = 'answer';
    answerInput.placeholder = 'Enter your answer';
    gameContainer.appendChild(answerInput);
  
    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.id = 'submit-btn';
    submitButton.addEventListener('click', checkAnswer);
    gameContainer.appendChild(submitButton);
  
    var resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    gameContainer.appendChild(resultDiv);
  
    var scoreContainer = document.getElementById('score-container');
    scoreContainer.style.display = 'block';
  
    generateProblem();
    document.getElementById('answer').value = '';
    document.getElementById('score').textContent = '0';
  
    // Remove the previous event listener, if any

    var oldSubmitButton = document.getElementById('submit-btn');
    if (oldSubmitButton) {
      oldSubmitButton.removeEventListener('click', checkAnswer);
    }
  
    // Add the event listener to the new submit button. This is to fix the error of the 
    // submit button not working after all 3 questions are answered

    submitButton.addEventListener('click', checkAnswer);
  }
  
  
  
  // Starts the game

  function initializeGame() {
    generateProblem();
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
  }
  
  initializeGame();
  