/*GAME FUNCTION
-Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct number if he loses
- Let player choose to play again
*/

///UI elements - use const to declare
const UIgame = document.querySelector('.game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

///Play Again Event Listen
///Since the class play-again was added dynamically, we will have to use event delegatio. So the event listener will be added to the parent element, which is div with the class name 'game'

UIgame.addEventListener('mousedown',reloadGame);///we are not using click here as click will automatically reload the page by calling the reload function. Hence we use the mousedown function so the event leads to the next logical step after the mosedown event is complete
function reloadGame(e){
if(e.target.className === 'play-again'){
window.location.reload(); ///here we use the document reload method
}
}

//Game Values - use let to declare
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

console.log(winningNum);
///Assign UI min and max using textContent - textContent property sets or returns the text content of the specified node
UIminNum.textContent = min;
UImaxNum.textContent = max;

///Listen for Guess through the submit button
UIguessBtn.addEventListener('click', guessNumber);

///guessNumber Function
function guessNumber(){
  console.log(UIguessInput.value)///this will return a string so we will have to parse it with parseInt method for comparision of values to take place
  let guess = parseInt(UIguessInput.value);///if no input is passed here then NaN will be returned - which can be vieiwed on the console
  console.log(guess);

  ///Validate
  if(isNaN(guess)|| guess < min || guess > max) /////if no input is passed, then NaN will be returned(which can be vieiwed on the console) and that has to be checked in the if statement by the isNaN() method
  {
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
    UIguessInput.style.borderColor = 'red';

  }

  //Check if game is won - Correct Number
  if(guess === winningNum){
    ///game over - won
    gameOver(true,`${winningNum} is correct. YOU WIN!!`);
  }
  else{
    ///Wrong Number
    guessesLeft--;
    console.log(guessesLeft);
    if(guessesLeft === 0)
    {
      ///Game over - lost
      gameOver(false, `You lost, the winning number was ${winningNum}`);
    }else
    ///Game - continues; answer wrong
    {
      ///check for the guess to be within the limit of max and min 
      if(isNaN(guess)|| guess < min || guess > max) 
  {
    setMessage(`Please enter a number between ${min} and ${max}. You have ${guessesLeft} guess left`,'red');
    UIguessInput.style.borderColor = 'red';

  }else //game continues with message of number of guesses left
  {
    UIguessInput.style.borderColor = 'red';

  setMessage(`Incorrect Guess, you have ${guessesLeft} guess left`,'red');

  ///Clear Input for the next value to be added
  UIguessInput.value = '';
}
      
    }

  }

}
//Set message function
function setMessage(msg,color){ ///we will add a color parameter so we can use different colours for different types of messages
UImessage.style.color = color;
UImessage.textContent = msg;
}

//Game over function
function gameOver(won,msg){
let color;
won === true ? color = 'green' : color = 'red'
///Disable the guess input as required
UIguessInput.disabled = true; 

//Make the input border green to notify the user is correct
UIguessInput.style.borderColor = color;
UImessage.style.color = color;

setMessage(msg);

///Play again
UIguessBtn.value = 'Play Again';
UIguessBtn.classList.add('play-again');
UIguessBtn.style.background = 'green';
UIguessBtn.style.color = 'white';
}

//Function for getRandomNumber

function getRandomNumber(min, max){
return Math.floor(Math.random() * (max - min +1) + min);
}
