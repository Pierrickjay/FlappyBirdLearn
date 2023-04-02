const menu = document.querySelector('.menu');
const animation = document.querySelector('.animation');
const jouerLink = document.querySelector('.menu li:first-child a');
const bestScoreLink = document.querySelector('#best-score');
const menuBestScore = document.querySelector('.menuBestScore');

jouerLink.addEventListener('click', () => {
	// On modifie la propriété "display" du menu pour le masquer
	menu.style.display = 'none';
	const game = document.querySelector('.game')
	const tubeUp = document.querySelector('#tubeUp');
	const tubeDown = document.querySelector('#tubeDown');
	game.style.display = 'block';
	setInterval(() => {
	  tubeUp.style.left = (parseInt(tubeUp.style.left) - 5) + '%';
	  tubeDown.style.left = (parseInt(tubeDown.style.left) - 5) + '%';
	}, 1000);
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
