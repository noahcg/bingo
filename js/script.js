import BingoCard from "./modules/bingoCard.js";
import Person from "./modules/person.js";

const myCard = new BingoCard(5);
myCard.init();

const players = [];

function createPlayer(name) {
  return new Person(name);
}

function addCardToPlayer(player) {
  if (players.length < 1) {
    throw new Error("there aren't any players");
  } else {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name == player) {
        players[i].hasCard = true;
      }
    }
  }
}

function displayPlayers(arr) {
  const table = document.createElement("table"),
    th = document.createElement("thead"),
    tb = document.createElement("tbody"),
    listContainer = document.querySelector("aside");

  table.setAttribute("id", "player-list");
  table.classList.add("table", "table-striped", "table-sm");

  table.appendChild(th);
  table.appendChild(tb);

  th.innerHTML = "<tr><th>Player Name</th><th>Add Card?</th></tr>";

  if (listContainer.querySelector("#player-list") != null) {
    listContainer.removeChild(document.getElementById("player-list"));
    listContainer.appendChild(table);
  } else {
    listContainer.appendChild(table);
  }

  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement("tr"),
      playerName = document.createTextNode(arr[i].name);

    row.innerHTML = `<td class='player-name'></td>
        <td>
          <button class='btn btn-primary add-card'>
            <svg class="bi bi-table" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M15 4H1V3h14v1z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z" clip-rule="evenodd"/>
              <path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v2H0V2z"/>
            </svg>
          </button>
        </td>`;

    row.getElementsByClassName("player-name")[0].append(playerName);
    tb.appendChild(row);
  }
}

function resetModal() {
  const thing = document.getElementById("playerNameInput");
  thing.value = "";
}

const addPlayerButton = document.getElementById("addPlayerButton"),
  playerModal = document.getElementById("exampleModal");

addPlayerButton.addEventListener("click", function () {
  let newPlayer = document.getElementById("playerNameInput").value;
  players.push(createPlayer(newPlayer));
  displayPlayers(players);
  resetModal();
  displayPlayerInfo(players);
});

function displayPlayerInfo(arr) {
  const nameField = document.getElementsByClassName("player-info")[0]
      .childNodes[3],
    textField = document.getElementsByClassName("player-info")[0].childNodes[5];

  for (let i = 0; i < arr.length; i++) {
    const pName = arr[i].name,
      pHasCard = arr[i].hasCard;

    nameField.append(pName);
    textField.append(pHasCard);
  }
}

displayPlayerInfo(players);
