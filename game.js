const menu = document.querySelector('.menu');
const animation = document.querySelector('.animation');
const jouerLink = document.querySelector('.menu li:first-child a');
const bestScoreLink = document.querySelector('#best-score');
const menuBestScore = document.querySelector('.menuBestScore');

jouerLink.addEventListener('click', () => {
// On modifie la propriété "display" du menu pour le masquer
menu.style.display = 'none';
});
bestScoreLink.addEventListener('click', () => {
	// Masquer le menu principal
	menu.style.display = 'none';
	// Afficher le menu de meilleur score
	menuBestScore.style.display = 'block';
	animation.style.display ='none';
	const backArrowLink = document.querySelector('#back');
	backArrowLink.addEventListener('click', () => {
		menu.style.display = 'block';
		animation.style.display ='block';
		menuBestScore.style.display = 'none';
	})
});
