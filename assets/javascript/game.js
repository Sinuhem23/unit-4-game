
// main var
var characters, gameState



/* RESET FUNCTIONS */


// startGame - primary reset function.
// called at the bottom of the file to start.
function startGame() {
	// resets all to original state;
	characters = resetCharacters()
	gameState = resetGameState()

	// displays characters
	renderCharacters()
}

function resetCharacters() {
	// resets character's stats to originals.
	return {
		'ryu': {
			name: 'Ryu',
			health: 180,
			attack: 8,
			imageUrl: 'assets/images/ryu.png',
			enemyAttackBack: 15
		},
		'ken': {
			name: 'Ken',
			health: 100,
			attack: 14,
			imageUrl: 'assets/images/ken.jpg',
			enemyAttackBack: 5
		},
		'sagat': {
			name: 'Sagat',
			health: 120,
			attack: 8,
			imageUrl: 'assets/images/sagat.jpg',
			enemyAttackBack: 20
		},
		'mBison': {
			name: 'M. Bison',
			health: 150,
			attack: 7,
			imageUrl: 'assets/images/M.Bison.jpg',
			enemyAttackBack: 25
		}
	}
}

function resetGameState() {
	// resets game state to originals.
	return {
		selectedCharacter: null,
		selectedDefender: null,
		enemiesLeft: 0,
		numAttacks: 0
	}
}

/* RENDERING FUNCTIONS */


function createCharDiv(character, key) {

	var charDiv = $("<div class='character' data-name='" + key + "'>")
	var charName = $("<div class='character-name'>").text(character.name)
	var charImage = $("<img alt='image' class='character-image'>").attr('src', character.imageUrl)
	var charHealth = $("<div class='character-health'>").text(character.health)
	charDiv.append(charName).append(charImage).append(charHealth)
	return charDiv
}


// displays all characters in character-area to start
function renderCharacters() {
	console.log('rendering characters')
	// iterate through characters object,
	// display each character to the charactersSelect div
	var keys = Object.keys(characters)
	for (var i = 0; i < keys.length; i++) {
		// get the current character out of the object
		var characterKey = keys[i]
		var character = characters[characterKey]
		// append elements to the #character-area element
		var charDiv = createCharDiv(character, characterKey)
		$('#character-area').append(charDiv)
	}
}

// renders just the opponents (not the character that was just selected)
function renderOpponents(selectedCharacterKey) {
	// iterate through opponents object, and display
	// opponent divs for every key that is NOT the selectedCharacter
	var characterKeys = Object.keys(characters)
	for (var i = 0; i < characterKeys.length; i++) {
		if (characterKeys[i] !== selectedCharacterKey) {
			var enemyKey = characterKeys[i]
			var enemy = characters[enemyKey]

			var enemyDiv = createCharDiv(enemy, enemyKey)
			$(enemyDiv).addClass('enemy')
			$('#available-to-attack-section').append(enemyDiv)
		}
	}
}


/*
The player chooses an opponent by clicking on an enemy's picture.
*/
function enableEnemySelection() {
	$('.enemy').on('click.enemySelect', function () {
		console.log('opponent selected')
		var opponentKey = $(this).attr('data-name')
		gameState.selectedDefender = characters[opponentKey]

		// move enemy
		$('#defender').append(this)
		/*
	  Once the player selects an opponent,
		that enemy is moved to a `defender area`.
		The player will now be able to click the `attack` button
		*/
		$('#attack-button').show()
		$('.enemy').off('click.enemySelect')
	})
}

function attack(numAttacks) {
	console.log('attacking defender')
	// The opponent will lose `HP` (health points).
	gameState.selectedDefender.health -= gameState.selectedCharacter.attack * numAttacks
}

//  The opponent character will instantly counter the attack.
function defend() {
	console.log('defender countering')
	// the selectedCharacter will lose HP
	gameState.selectedCharacter.health -= gameState.selectedDefender.enemyAttackBack
}


// returns boolean if the passed character is dead
function isCharacterDead(character) {
	console.log('checking if player is dead')
	return character.health <= 0
}

// checks if you won
function isGameWon() {
	console.log('checking if you won the game')
	return gameState.enemiesLeft === 0
}

// this function returns a boolean, indicating that the attack phase has been completed
function isAttackPhaseComplete() {
	// logic to check if defender or players are dead.
	if (isCharacterDead(gameState.selectedCharacter)) {
		// you lose!
		alert('You were defeated by ' + gameState.selectedDefender.name + '. Click reset to play again.')
		// display lose message to user, and present reset button.
		$('#selected-character').empty()
		$('#reset-button').show()

		return true // returning true because attack phase has completed.
	} else if (isCharacterDead(gameState.selectedDefender)) {
		console.log('defender dead')

		// decrement enemiesLeft counter and empty defender div
		gameState.enemiesLeft--
		$('#defender').empty()

		// checks if you win the game, or if there are more characters to fight
		if (isGameWon()) {
			// show reset button and alert
			alert('You win! Click Reset to play again')
			$('#reset-button').show()
		} else {
			// Prompt user to select another enemy
			alert('You defeated ' + gameState.selectedDefender.name + '! Select another enemy to fight.')
			enableEnemySelection()
		}
		return true // returning true because attack phase has completed.
	}
	// returning false, because attack phase is not complete.
	return false
}

// used when clicking on reset button to reset the game.
function emptyDivs() {
	// empty out all content areas
	$('#selected-character').empty()
	$('#defender').empty()
	$('#available-to-attack-section .enemy').empty()
	$('#character-area').empty()
	$('#characters-section').show()
}

// Attach handlers and start game once document has fully loaded.

$(document).ready(function () {
	/* CLICK HANDLERS */

	/*
	* When the game starts, the player will choose a character
	by clicking on the fighter's picture.
	The player will fight as that character for the rest of the game.
	*/

	
	// attached function to all current and future elements with a class of character
	// inside of the element with ID character-area, triggered on click.
	$('#character-area').on('click', '.character', function () {
		// store selected character in javascript

		var selectedKey = $(this).attr('data-name')
		gameState.selectedCharacter = characters[selectedKey]
		console.log('player selected')

		// move to selected section
		$('#selected-character').append(this)

		/*
	  Enemies are moved to a different area of the screen.
		*/
		renderOpponents(selectedKey)

		// then hid the characters-section from view
		$('#characters-section').hide()

		// number of enemies, and enable enemy selection;
		gameState.enemiesLeft = Object.keys(characters).length - 1
		enableEnemySelection()
	})

	$('#attack-button').on('click.attack', function () {
		console.log('attack clicked')
		// increment attackCounter (for power scaling of player attacks)
		gameState.numAttacks++

		// attack and defend stages
		attack(gameState.numAttacks)
		defend()

		// display updated values for character health
		$('#selected-character .character-health').text(gameState.selectedCharacter.health)
		$('#defender .character-health').text(gameState.selectedDefender.health)

		// hide the attack button if attack phase is over
		if (isAttackPhaseComplete()) {
			$(this).hide()
		}
	})

	$('#reset-button').on('click.reset', function () {

    console.log('resetting game')
    // empty all divs before resetting the game
		emptyDivs()

		// hide reset button
		$(this).hide()

		// start the game again
		startGame()
    
   
      

		
	})

	// KICKS OFF THE GAME
	startGame()
})