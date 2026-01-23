// select html elements in the document
const myTown = document.querySelector('#town');
const myGraphic = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');


// construct api url
const myKey = "95e01d224d23c5bccb00807bc4d6cb8d";
const myLat = 40.78411244475226;
const myLong = -111.89022276209899;

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();

      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}


function displayResults(data) {

  myTown.innerHTML = data.name;
  myDescription.innerHTML = data.weather[0].description;
  myTemperature.innerHTML = `${data.main.temp.toFixed(0)} &deg;F`;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  myGraphic.setAttribute('src', iconSrc);
  myGraphic.setAttribute('alt', data.weather[0].description);
}

apiFetch();