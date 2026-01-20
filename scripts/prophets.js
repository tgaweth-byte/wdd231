const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.prophets); // temporary testing of data retreival
  displayProphets(data.prophets);
}
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  // On ajoute manuellement Dallin H. Oaks à la liste reçue
  const dallin = {
    "name": "Dallin H.",
    "lastname": "Oaks",
    "birthdate": "12 August 1932",
    "birthplace": "Utah",
    "imageurl": "https://byui-cse.github.io/cse-ww-program/data/images/prophets/dallin-oaks.jpg"
  };
  data.prophets.push(dallin); // On l'ajoute à la fin du tableau

  displayProphets(data.prophets);
}
getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthday = document.createElement('p');
    let birthplace = document.createElement('p');
    let portrait = document.createElement('img');

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank

    // Build the birth information
    birthday.textContent = `Date of Birth: ${prophet.birthdate}`
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append the section(card) with the created elements
    card.appendChild(fullName); //fill in the blank
    card.appendChild(birthday);
    card.appendChild(birthplace);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
}