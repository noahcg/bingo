import BingoCard from "./modules/bingoCard.js";
import Person from "./modules/person.js";

const addPlayerButton = document.getElementById("addPlayerButton"),
  players = [];

function createPlayer(name) {
  return new Person(name);
}

function createCard(r) {
  return new BingoCard(r);
}

function addCardToPlayer(player) {
  if (players.length < 1) {
    throw new Error("there aren't any players");
  } else {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name == player) {
        const gw = document.getElementsByClassName("game-window")[i];
        players[i].hasCard = true;
        players[i].board = createCard(5).init(gw, i);
      }
    }
  }
}

function displayPlayers(arr, callback) {
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
  callback(arr);
}

function resetModal() {
  const thing = document.getElementById("playerNameInput");
  thing.value = "";
}

function createPlayerUICard(players) {
  const container = document.getElementById("player-row");
  let template;

  players.forEach(function (item, index) {
    template = `<div class="col-md-6">
      <div
        class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col p-4 d-flex flex-column position-static player-info">
          <strong class="d-inline-block mb-2 text-primary">Player</strong>
          <h3 class="mb-0">${item.name}</h3>
          <p class="card-text mb-auto">${
            !item.hasCard
              ? "I'm a new player, I don't have any bingo cards yet."
              : "Great! Now I have a bingo card."
          }</p>
        </div>
        <div class="col-auto p-4 game-window"></div>
      </div>
    </div>`;
  });

  container.innerHTML += template;
}

addPlayerButton.addEventListener("click", function () {
  let newPlayer = document.getElementById("playerNameInput").value;
  players.push(createPlayer(newPlayer));

  displayPlayers(players, function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const addCardButton = document.getElementsByClassName("add-card")[i];
      addCardButton.addEventListener("click", function () {
        addCardToPlayer(arr[i].name);
      });
    }
  });

  resetModal();
  createPlayerUICard(players);
});
