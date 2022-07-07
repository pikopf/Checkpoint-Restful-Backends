const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=";
const counter = document.querySelector(".counter");
let count = localStorage.getItem("count") || 0;

renderCounter();

getPeopleData(8);

function getPeopleData(count) {
  fetch(url + count)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      renderPeopleData(jsonData);
    });
}

function renderPeopleData(peopleData) {
  console.log(peopleData);
  const list = document.querySelector("#memberList");
  let htmlResult = "";

  peopleData.forEach((person) => {
    console.log(person.name.first);

    htmlResult += `
    <article class="person">
     
     <img class="backGr" src="${person.backgroundImage}">
     <div class="buttonX"> <button class="x">X</button> </div>
     <div class="img"><img class="profilePic" src="${person.picture}"></div>
     <div class="name">${person.name.title}${person.name.first} ${person.name.last}</div>
     <div class="profession">${person.title}</div>
     <div class="mutalConnections">
         <p>${person.mutualConnections} mutual connections</p>
     </div>
     <div class="buttonConnect"> <button class="connect">Connect</button> </div>
       
    </article>`;
  });
  list.innerHTML = htmlResult;

  const btnConnects = document.querySelectorAll(".connect");

  btnConnects.forEach((btnConnect) => {
    btnConnect.addEventListener("click", toggleConnect);
  });

  const xButtons = document.querySelectorAll(".x");

  xButtons.forEach((xButton, index) => {
    xButton.addEventListener("click", function () {
      deleteMember(peopleData, index);
    });
  });
}

function deleteMember(peopleData, index) {
  const peopleDataDelete = peopleData.filter((person, personIndex) => {
    return index !== personIndex;
  });

  fetch(url + 1)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      peopleDataDelete.push(jsonData[0]);
      renderPeopleData(peopleDataDelete);
    });
}

function toggleConnect() {
  if (this.innerText === "Connect") {
    this.innerText = "Pending";
    count++;
    renderCounter();
    localStorage.setItem("count", count);
  } else if (this.innerText === "Pending") {
    this.innerText = "Connect";
    count--;
    renderCounter();
    localStorage.setItem("count", count);
  }
}

function renderCounter() {
  counter.innerText = count;
}
