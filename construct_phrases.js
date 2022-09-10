/**************
 *  Variables *
 **************/

const affichage_phrase = document.getElementById('affichage_phrase');
const input_bases = document.getElementById('input_bases');
const submit = document.querySelector('#submit');
const nouveau_mot = document.querySelector('#nouveau_mot');
const mots_entres = document.querySelector('#mots_entres');
const afficher_la_selection = document.querySelector('#afficher_la_selection');

var mots_places = [];

var base = [];

var mots_a_placer = [];

submit.addEventListener('click', ajouter_mot);

function mise_a_zero() {
	base = [];
	mots_a_placer = [];
	mots_places = [];
	affichage_phrase.textContent = "";
	input_bases.innerHTML = "";
	mots_entres.textContent= "";
	mots_entres.style.color = 'black';
	afficher_la_selection.checked = true;
	}

function ajouter_mot() {
	base.push(nouveau_mot.value);
	mots_entres.textContent += nouveau_mot.value + " ";
	input_bases.innerHTML = "";
	createNewInput();
	selectSons();
	nouveau_mot.value = "";
	nouveau_mot.focus();
	}
	
afficher_la_selection.addEventListener('change', ($event) => {
			if ($event.target.checked) {
				mots_entres.style.color = 'blue';				
			} else {
				mots_entres.style.color = 'white';
			}
		});


/***********************
 * Fonction de mélange *
 * *********************/

function shuffle(array1, array2) {
	var currentIndex = array1.length;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		array2.push(array1[randomIndex]);
		const index = array1.indexOf(array1[randomIndex]);
		array1.splice(index, 1);
		}
		array1.push(...array2);
		return array2;
	}
	
/*****************************
 * Fonction de creation html *
 *****************************/
function createNewInput () {
	shuffle(base, mots_a_placer);
	for (let i=0; i<mots_a_placer.length; i++) {
		var newDivMot = document.createElement('div');
		var newInput = document.createElement('input');
		newInput.type = 'checkbox';
		newInput.id = i;
		var newLabel = document.createElement('label');
		newLabel.htmlFor = i;
		newLabel.appendChild(document.createTextNode(mots_a_placer[i]));
		newDivMot.appendChild(newInput);
		newDivMot.appendChild(newLabel);
		input_bases.appendChild(newDivMot);	
	}
	mots_a_placer.splice(0, mots_a_placer.length);
}

createNewInput();

/**************************
 *  FONCTION DE SÉLECTION *
 **************************/
 
function selectSons () {
	for (let i=0; i<base.length; i++) {
		const x = document.getElementById(i).addEventListener('change', ($event) => {
			if ($event.target.checked) {
				mots_places.push(base[i]);
				afficher_les_mots(mots_places);
				} else {
					const index = mots_places.indexOf(base[i]);
					mots_places.splice(index, 1);				
					afficher_les_mots(mots_places);
			}
		});
	}
}

selectSons();

/*******************************************************
 *  FONCTION DE MELANGE ET DE MISE À ZÉRO *
 *******************************************************/

function afficher_les_mots(mots_places) {		
	affichage_phrase.textContent = " ";
	for (compteur=0; compteur <mots_places.length; compteur +=1) {
		affichage_phrase.textContent += mots_places[compteur] + " ";}
	}

function effacer() {
	var clist = document.getElementsByTagName("input");
	for (var i = 0; i < clist.length; i++) { clist[i].checked = false; }
	affichage_phrase.textContent = " ";
	mots_places.splice(0, mots_places.length);
	input_bases.innerHTML = "";
	createNewInput();
	selectSons();
	mots_entres.style.color = 'white';
}


