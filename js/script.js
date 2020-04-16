import BingoCard from "./modules/bingoCard.js";
import Person from "./modules/person.js";

const addPlayerButton = document.getElementsByClassName("add-player-button")[0],
  players = [];

// @param {string} name - Name of the player.
function createPlayer(name) {
  return new Person(name);
}

// @param {number} r - Number of rows the table should have.
function createCard(r) {
  return new BingoCard(r);
}

// @param {string} player - Name of an individual player from the players array.
function addCardToPlayer(player) {
  if (players.length < 1) {
    throw new Error("there aren't any players");
  } else {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name == player) {
        const gw = document.getElementsByClassName("game-window")[i],
          ct = document.getElementsByClassName("card-text")[i];

        players[i].hasCard = true;
        players[i].board = createCard(5).init(gw, i);

        ct.innerHTML = "Great! Now I have a bingo card.";
      }
    }
  }
}

// @param {array} players - Array of all the players.
/*
 * @callback requestCallback
 * @param {array} arr - Array of all the players.
 */
function displayPlayers(players, callback) {
  const table = document.createElement("table"),
    th = document.createElement("thead"),
    tb = document.createElement("tbody"),
    listContainer = document.getElementsByClassName("player-table")[0];

  table.setAttribute("id", "player-list");
  table.classList.add("table", "table-striped", "table-dark");

  table.appendChild(th);
  table.appendChild(tb);

  th.innerHTML = "<tr><th>Player Name</th><th colspan='2'>Actions</th></tr>";

  if (listContainer.querySelector("#player-list") != null) {
    listContainer.removeChild(document.getElementById("player-list"));
    listContainer.appendChild(table);
  } else {
    listContainer.appendChild(table);
  }

  for (let i = 0; i < players.length; i++) {
    let row = document.createElement("tr"),
      playerName = document.createTextNode(players[i].name);

    if (players[i].hasCard) {
      row.innerHTML = `<td class='player-name'></td>
        <td>
          <button class='btn btn-primary add-card' disabled>
            <svg class="bi bi-table" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M15 4H1V3h14v1z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z" clip-rule="evenodd"/>
              <path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v2H0V2z"/>
            </svg>
          </button>
        </td>
        <td>
          <button class='btn btn-primary edit-player' data-toggle="modal" data-target="#exampleModal">
            <svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>
            </svg>
          </button>
        </td>`;
    } else {
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
        </td>
        <td>
          <button class='btn btn-primary edit-player' data-toggle="modal" data-target="#exampleModal">
            <svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>
            </svg>
          </button>
        </td>`;
    }

    row.getElementsByClassName("player-name")[0].append(playerName);
    tb.appendChild(row);
  }
  callback(players);
}

function newPlayerModal(callback) {
  let newPlayerForm,
    modal = document.getElementById("exampleModal"),
    modalTitle = modal.getElementsByClassName("modal-title")[0],
    modalBody = modal.getElementsByClassName("modal-body")[0],
    modalFooter = modal.getElementsByClassName("modal-footer")[0],
    saveButton;

  newPlayerForm = `<form>
    <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input
        type="text"
        class="form-control"
        id="playerNameInput"
        aria-describedby="playerName"
      />
      <small id="playerName" class="form-text text-muted"
        >Please add the name of a player.</small
      >
    </div>
    <div class="form-group">
      <label for="hasBoardToggle">Do you have a board?</label>
      <button
        type="button"
        class="btn btn-md btn-toggle"
        data-toggle="button"
        aria-pressed="false"
        autocomplete="off"
      >
        <div class="handle"></div>
      </button>
    </div>
  </form>`;

  saveButton = `<button
    id="savePlayerButton"
    type="button"
    class="btn btn-primary"
    data-dismiss="modal"
  >
    Add New Player
  </button>`;

  modalTitle.innerHTML = "Add New Player";
  modalBody.innerHTML = newPlayerForm;
  dynamicButton.innerHTML = saveButton;

  callback();
}

function editPlayerModal(obj) {
  let editPlayerForm,
    modal = document.getElementById("exampleModal"),
    modalTitle = modal.getElementsByClassName("modal-title")[0],
    modalBody = modal.getElementsByClassName("modal-body")[0],
    dynamicButton = modal.getElementsByClassName("dynamic-button")[0],
    editButton;

  editPlayerForm = `<form>
    <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input
        type="text"
        class="form-control"
        id="playerNameInput"
        aria-describedby="playerName"
        value="${obj.name}"
      />
      <small id="playerName" class="form-text text-muted"
        >Please add the name of a player.</small
      >
    </div>
    <div class="form-group">
      <label for="hasBoardToggle">Do you have a board?</label>
      <button
        type="button"
        class="btn btn-md btn-toggle"
        data-toggle="button"
        aria-pressed="false"
        autocomplete="off"
      >
        <div class="handle"></div>
      </button>
    </div>
  </form>`;

  editButton = `<button
    id="editPlayerButton"
    type="button"
    class="btn btn-primary"
    data-dismiss="modal"
  >
    Edit Player
  </button>`;

  modalTitle.innerHTML = "Edit Player";
  modalBody.innerHTML = editPlayerForm;
  dynamicButton.innerHTML = editButton;
}

function resetModal() {
  const thing = document.getElementById("playerNameInput");
  thing.value = "";
}

// @param {array} players - Array of all the players.
function createPlayerUICard(players) {
  const container = document.getElementById("player-row"),
    toRemove = document.getElementsByClassName("no-players")[0];
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

  if (toRemove) {
    toRemove.remove();
  }
  container.innerHTML += template;
}

addPlayerButton.addEventListener("click", function () {
  newPlayerModal(function () {
    const savePlayerButton = document.getElementById("savePlayerButton");

    savePlayerButton.addEventListener("click", function () {
      let newPlayer = document.getElementById("playerNameInput").value;
      if (newPlayer.length < 1) {
        alert("Please enter a name.");
      } else {
        players.push(createPlayer(newPlayer));

        displayPlayers(players, function (arr) {
          for (let i = 0; i < arr.length; i++) {
            const addCardButton = document.getElementsByClassName("add-card")[
                i
              ],
              editPlayerButton = document.getElementsByClassName("edit-player")[
                i
              ];

            addCardButton.addEventListener("click", function () {
              this.setAttribute("disabled", "disabled");
              addCardToPlayer(arr[i].name);
            });
            editPlayerButton.addEventListener("click", function () {
              editPlayerModal(arr[i]);
            });
          }
        });

        resetModal();
        createPlayerUICard(players);
      }
    });
  });
});
