document.querySelector('#lastModified').textContent = "Last Modification: " + document.lastModified;

const rightNow = new Date();
//console.log(rightNow);
//console.log(rightNow.getFullYear());
document.querySelector('#currentyear').textContent = rightNow.getFullYear();