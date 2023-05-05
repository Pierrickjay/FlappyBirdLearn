const menu = document.querySelector('.menu');
const animation = document.querySelector('#animation');
const jouerLink = document.querySelector('.menu li:first-child a');
const bestScoreLink = document.querySelector('#best-score');
const menuBestScore = document.querySelector('.menuBestScore');
const menuGameOver = document.querySelector('.gameOverLayout');
const startOverLink = document.querySelector('#StartAgain');
const backMenuLink = document.querySelector('#retry');
const valScore = document.querySelector('#Score')
const bestScorePrint = document.querySelector('#BestScorePrint');
let	changeBlockId;
let	flappyLowerId;
let	checkFlappyId;
let scoreFlappyID;
const game = document.querySelector('.game');
const block = document.querySelector('#block');
const hole = document.querySelector('#hole');
const block2 = document.querySelector('#block2');
const hole2 = document.querySelector('#hole2');
var gameOn = false;

function change_score()
{
	const valText = valScore.textContent;
	let valNum = Number(valText);
	valNum +=1;
	valScore.textContent = valNum;
	if (valNum > 100 && valNum < 102)
	{
		clearInterval(changeBlockId);
		changeBlockId = setInterval(change_block_pos, 200);
		console.log("enter here \n");
	}
	if (valNum > 250 && valNum < 252)
	{
		clearInterval(changeBlockId);
		changeBlockId = setInterval(change_block_pos, 170);
	}
	if (valNum > 500 && valNum < 502)
	{
		clearInterval(changeBlockId);
		changeBlockId = setInterval(change_block_pos, 150);
	}
}

 function change_block_pos()
{
	const styleBlock =  getComputedStyle(block);
	const styleBlock2 =  getComputedStyle(block2);
	const styleHole = getComputedStyle(hole);
	const styleHole2 = getComputedStyle(hole2);
	const topHole = parseInt(styleHole.top);
	const topHole2 = parseInt(styleHole2.top);
	const left = parseInt(styleBlock.left);
	const left2 = parseInt(styleBlock2.left);
	if (gameOn == true)
	{
		block.style.left = `${left - 20}px`;
		hole.style.left = `${left - 20}px`;
		block2.style.left = `${left2 - 20}px`;
		hole2.style.left = `${left2 - 20}px`;
		if (left < -20)
		{
			var random = Math.floor(Math.random() * (440));
			hole.style.top = `${random}px`;
			block.style.left = "500px";
			hole.style.left = "500px";
		}
		if (left2 < -20)
		{
			var random = Math.floor(Math.random() * (440));
			hole2.style.top = `${random}px`;
			block2.style.left = "500px";
			hole2.style.left = "400px";
		}
	}
}

 function set_value_back()
{
	block.style.left = "310px";
	hole.style.left = "310px";
	hole2.style.left = "530px";
	block2.style.left = "530px";
	animation.style.top = "320px";
	valScore.textContent = "0";
}


 function check_flappy_pos()
{
	const styleHole =  getComputedStyle(hole);
	const styleHole2 =  getComputedStyle(hole2);
	const left = parseInt(styleHole.left);
	const left2 = parseInt(styleHole2.left);
	const flap = getComputedStyle(animation);
	const topFlap = parseInt(flap.top);

	if ((left > 0 && parseInt(flap.left) > left - 50 && (topFlap < parseInt(styleHole.top) || topFlap > parseInt(styleHole.top) + 152)) // 200 - flappy heigt(48)
		|| (left2 > 0 && parseInt(flap.left) > left2 - 50 && (topFlap < parseInt(styleHole2.top) || topFlap > parseInt(styleHole2.top) + 152)))
		{
			return true;
		}
	return (false);
}

 function change_flappy_pos()
{
	const game2 = document.querySelector('.game');
	const flap = getComputedStyle(animation);
	const heightFlap = parseInt(flap.top);
	if (heightFlap - 30 > 0 && gameOn == true)
		animation.style.top = `${heightFlap - 50}px`
}

 function make_flappy_lower()
{
	const flap = getComputedStyle(animation);
	const heightFlap = parseInt(flap.top);
	if (heightFlap + 10 + parseInt(flap.height) < 640 && gameOn == true)
		animation.style.top = `${heightFlap + 10}px`
}

jouerLink.addEventListener('click', () => {
	// On modifie la propriété "display" du menu pour le masquer
	menu.style.display = 'none';
	game.style.display = 'block';
	menuGameOver.style.display = 'none';
	let gameOver = false;

	clearInterval(changeBlockId);
	clearInterval(flappyLowerId);
	clearInterval(checkFlappyId);
	clearInterval(scoreFlappyID);
	gameOn = true;
	changeBlockId = setInterval(change_block_pos, 300);
	document.addEventListener('click', change_flappy_pos);
	flappyLowerId = setInterval(make_flappy_lower, 80);
	scoreFlappyID = setInterval(change_score, 90);
	checkFlappyId = setInterval(() => {
		gameOver = check_flappy_pos();
		if (gameOver)
		{
			console.log("Game Over");
			const valText = valScore.textContent;
			let bestscore = Number(valText);
			changeBestScore(bestscore);
			clearInterval(changeBlockId);
			clearInterval(flappyLowerId);
			clearInterval(checkFlappyId);
			clearInterval(scoreFlappyID);
			document.removeEventListener('click', change_flappy_pos);
			gameOn = false;
			menuGameOver.style.display = 'block';
			clearInterval(this);
			return ;
		}
	}, 1);
});


bestScoreLink.addEventListener('click', () => {
	// Masquer le menu principal
	menu.style.display = 'none';
	// Afficher le menu de meilleur score
	menuBestScore.style.display = 'block';
	animation.style.display ='none';
	const backArrowLink = document.querySelector('#back');
	// Retour en arriere
	backArrowLink.addEventListener('click', () => {
		menu.style.display = 'block';
		animation.style.display ='block';
		menuBestScore.style.display = 'none';
	})
});

startOverLink.addEventListener('click', () => {
	gameOn = true;
	set_value_back();
	menuGameOver.style.display = 'none';
	clearInterval(changeBlockId);
	clearInterval(flappyLowerId);
	clearInterval(checkFlappyId);
	clearInterval(scoreFlappyID);
	gameOn = true;
	changeBlockId = setInterval(change_block_pos, 300);
	document.addEventListener('click', change_flappy_pos);
	flappyLowerId = setInterval(make_flappy_lower, 100);
	scoreFlappyID = setInterval(change_score, 70);
	checkFlappyId = setInterval(() => {
		gameOver = check_flappy_pos();
		if (gameOver)
		{
			const valText = valScore.textContent;
			let bestscore = Number(valText);
			changeBestScore(bestscore);
			menuGameOver.style.display = 'block';
			clearInterval(changeBlockId);
			clearInterval(flappyLowerId);
			clearInterval(checkFlappyId);
			clearInterval(scoreFlappyID);
			document.removeEventListener('click', change_flappy_pos);
			gameOn = false;
			return ;
		}
	}, 1);
})

backMenuLink.addEventListener('click', () => {
	gameOn = false;
	set_value_back();
	game.style.display = 'none';
	menu.style.display = 'block';
})


const firstscore = document.querySelector('#first');
const secondscore = document.querySelector('#second');
const thirdscore = document.querySelector('#third');
const fourscore = document.querySelector('#four');
const fivescore = document.querySelector('#five');

function changeBestScore(bestscore)
{
	const bestScorePrintText = bestScorePrint.textContent;
	const val1Text = firstscore.textContent;
	const val2Text = secondscore.textContent;
	const val3Text = thirdscore.textContent;
	const val4Text = fourscore.textContent;
	const val5Text = fivescore.textContent;
	let val1num = Number(val1Text);
	let val2num = Number(val2Text);
	let val3num = Number(val3Text);
	let val4num = Number(val4Text);
	let val5num = Number(val5Text);
	if (bestscore > Number(bestScorePrintText))
	{
		bestScorePrint.textContent = bestscore;
	}
	if (bestscore > val1num)
	{
		firstscore.textContent = bestscore
		changeBestScore(val1num);
	}
	else if (bestscore > val2num)
	{
		secondscore.textContent = bestscore;
		changeBestScore(val2num);
	}
	else if (bestscore > val3num)
	{
		thirdscore.textContent = bestscore;
		changeBestScore(val3num);
	}
	else if (bestscore > val4num)
	{
		fourscore.textContent = bestscore;
		changeBestScore(val4num);
	}
	else if (bestscore > val5num)
	{
		fivescore.textContent = bestscore;
	}
}
