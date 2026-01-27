const spotlight = document.querySelector('#spot');

const path = './data/members.json';

async function getMembers() {
  const response = await fetch(path);
  const data = await response.json();
  //console.log(data.members);
  //https://www.freecodecamp.org/news/filter-arrays-in-javascript/
  const payingmembers = data.members.filter(member => member.level > 1);
  //console.log(payingmembers);
  displayMembers(payingmembers)
}

getMembers();

const displayMembers = (myArray) => {
  for (let step = 0; step < 3; step++) {
    const random = Math.floor(Math.random() * myArray.length);
    //console.log(random)
    let picked = myArray[random];
    myArray.splice(random, 1);
    //console.log(picked)
    //console.log(myArray)
    showOnPage(picked)
  } // end loop
}// end display members

function showOnPage(x) {
  //console.log(x)
  const sl = document.createElement('div')

  const name = document.createElement('h2')
  name.innerHTML = x.name
  sl.appendChild(name)

  const photo = document.createElement('img')
  photo.src = `images/${x.logopath}`
  photo.alt = x.name
  sl.appendChild(photo)

  const phone = document.createElement('p')
  phone.innerHTML = x.phone
  sl.appendChild(phone)

  const address = document.createElement('p')
  address.innerHTML = x.address
  sl.appendChild(address)

  const link = document.createElement('a')
  link.href = x.url
  link.textContent = "Link"
  link.target = "_blank"
  sl.appendChild(link)

  const level = document.createElement('p')
  level.innerHTML = `Member Level is ${x.level}`
  sl.appendChild(level)

  spotlight.appendChild(sl)
}