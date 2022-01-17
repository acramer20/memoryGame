const gameContainer = document.getElementById("game");
let firstC = null;
let seconC = null;
let noclick = false;
let openCards = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('card');
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // event.target.classList.toggle("black");
  
  if (noclick) {return;}
  if (event.target.classList.contains('open')) {return;}

  let currentCard = event.target
  console.log(currentCard.classList)
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!firstC){
    currentCard.classList.add('open');
    firstC = currentCard
  }
  else if(!seconC){
    currentCard.classList.add('open');
    seconC = currentCard
  }

  if(firstC && seconC){
    noclick = true;
    let name1 = firstC.className;
    let name2 = seconC.className;
    if(name1 === name2){
      openCards += 2;
      firstC.removeEventListener('click', handleCardClick);
      seconC.removeEventListener('click', handleCardClick);
      firstC = null;
      seconC = null;
      noclick = false;
    }
    else {
      setTimeout(function(){
        firstC.style.backgroundColor = '';
        seconC.style.backgroundColor = '';
        firstC.classList.remove('open');
        seconC.classList.remove('open');
        firstC = null;
        seconC = null;
        noclick = false;
      }, 1000)
    }
  }
  
  
  
  if(openCards === COLORS.length){
    alert("Game Over")
  
  }
  
  
}


// when the DOM loads
createDivsForColors(shuffledColors);
