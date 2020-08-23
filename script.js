window.onload = function(){
	const X_CLASS = 'x'
	const CIRCLE_CLASS = 'circle'
	const WINNING_COMBINATIONS = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6]
	]
	const cellElements = document.querySelectorAll('[data-cell]')
	const board = document.getElementById('board')
	const nextPlayer = document.getElementById('next-player')
	const winningMessageElement = document.getElementById('message')
	const historyMessageElement = document.getElementById('history-log')
	const restartButton = document.getElementById('reset')
	const historyButton = document.getElementById('history')
	const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
	let history = []
	let historyIndex = 0
	let circleTurn


	startGame()

	restartButton.addEventListener('click', startGame)
	historyButton.addEventListener('click', showHistory)

	function startGame() {
	  circleTurn = false
	  cellElements.forEach(cell => {
	    cell.classList.remove(X_CLASS)
	    cell.classList.remove(CIRCLE_CLASS)
	    cell.removeEventListener('click', handleClick)
	    cell.addEventListener('click', handleClick, { once: true })
	  })
	  setNextPlayer()
	  winningMessageElement.classList.remove('show')
	  historyMessageElement.classList.remove('show')
	}

	function handleClick(e) {
	  const cell = e.target
	  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	  placeMark(cell, currentClass)
	  if (checkWin(currentClass)) {
	    endGame(false)
	  } else if (isDraw()) {
	    endGame(true)
	  } else {
	    swapTurns()
	    setNextPlayer()
	  }
	}

	function endGame(draw) {
	  if (draw) {
	    winningMessageTextElement.innerText = 'Draw!'
	    history.push('DraW')
	  } else {
	  	let insideMessage = `${circleTurn ? "O - " : "X - "} won!`
	    winningMessageTextElement.innerText = insideMessage
	    history.push(insideMessage)
	  }
	  winningMessageElement.classList.add('show')
	  nextPlayer.innerText = ' '
	  historyIndex ++
	}

	function isDraw() {
	  return [...cellElements].every(cell => {
	    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
	  })
	}

	function placeMark(cell, currentClass) {
	  cell.classList.add(currentClass)
	}

	function swapTurns() {
	  circleTurn = !circleTurn
	}

	function setNextPlayer() {
	  board.classList.remove(X_CLASS)
	  board.classList.remove(CIRCLE_CLASS)
	  if (circleTurn) {
	    board.classList.add(CIRCLE_CLASS)
	    nextPlayer.innerText = ' O'
	  } else {
	    board.classList.add(X_CLASS)
	    nextPlayer.innerText = ' X'
	  }
	}

	function checkWin(currentClass) {
	  return WINNING_COMBINATIONS.some(combination => {
	    return combination.every(index => {
	      return cellElements[index].classList.contains(currentClass)
	    })
	  })
	}

	function showHistory() {
		console.log('history')
		if (history === undefined || history.length == 0) {
			winningMessageElement.classList.remove('show')
			historyMessageElement.classList.add('show')
			historyMessageElement.innerText = 'There was no finished games yet!'
		} else {
		 const innerMsg = history.map(function (historyItem) {
				return '<li>' + historyItem + '</li>'
			}).join('')
		 	console.log(innerMsg)
		 	winningMessageElement.classList.remove('show')
		 	historyMessageElement.classList.add('show')
			historyMessageElement.innerHTML = '<ul>' + innerMsg + '</ul>'
		}

	}



};