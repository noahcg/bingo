import BingoCard from "./modules/bingoCard.js";
import Person from "./modules/person.js";

const addPlayerButton = document.getElementsByClassName("add-player-button")[0],
  players = [],
  playerTableRow = document.getElementById("player-row");

let newModal = document.getElementById("exampleModal"),
  modalInstance;

// @param {string} name - Name of the player.
function createPlayer(name) {
  return new Person(name);
}

// @param {number} r - Number of rows the table should have.
function createCard(r) {
  return new BingoCard(r);
}

function newPlayerModal() {
  modalInstance = new Modal(newModal, {
    content: `<div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Add New Player</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
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
        <label for="hasBoardToggle">Do you want a bingo card?</label>
        <button
          id="hasCardToggle"
          type="button"
          class="btn btn-md btn-toggle d-block"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
        >
          <div class="handle"></div>
        </button>
      </div>
    </form>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        Close
      </button>
      <button
        id="savePlayerButton"
        type="button"
        class="btn btn-primary"
        data-dismiss="modal"
      >
        Add New Player
      </button>
    </div>
    `,
    backdrop: "static",
    keyboard: false,
  });
  modalInstance.show();
}

function editPlayer(id) {
  let editPlayerForm,
    modalBody = document.getElementById("mbody"),
    nameField,
    hasCardField;

  modalInstance.setContent(`<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Edit Player</h5>
    <button
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div id="mbody" class="modal-body"></div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      data-dismiss="modal"
    >
      Close
    </button>
    <button
      id="saveEditedPlayerButton"
      type="button"
      class="btn btn-primary"
      data-dismiss="modal"
    >
      Edit Player
    </button>
  </div>`);

  for (let i = 0; i < players.length; i++) {
    if (parseInt(id, 10) === players[i].id) {
      editPlayerForm = `<form>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="playerNameInput"
            aria-describedby="playerName"
            value="${players[i].name}"
          />
          <small id="playerName" class="form-text text-muted"
            >Please add the name of a player.</small
          >
        </div>
        <div class="form-group">
          <label for="hasBoardToggle">Do you want a bingo card?</label>
          <button
            id="hasCardToggle"
            type="button"
            class="btn btn-md btn-toggle d-block ${
              players[i].hasCard ? "active" : ""
            }"
            data-toggle="button"
            aria-pressed="${players[i].hasCard}"
            autocomplete="off"
          >
            <div class="handle"></div>
          </button>
        </div>
      </form>`;

      mbody.innerHTML = editPlayerForm;

      const updateButton = document.getElementById("saveEditedPlayerButton");

      nameField = document.getElementById("playerNameInput");
      hasCardField = document.getElementById("hasCardToggle");

      updateButton.addEventListener("click", function () {
        players[i].name = nameField.value;
        players[i].hasCard = JSON.parse(
          hasCardField.getAttribute("aria-pressed")
        );
        displayPlayerTable(players);
      });
    }
  }
}

function playerInfo() {
  const nameField = document.getElementById("playerNameInput"),
    hasCardField = document.getElementById("hasCardToggle"),
    playerData = {};

  playerData.name = nameField.value;
  playerData.hasCard = JSON.parse(hasCardField.getAttribute("aria-pressed"));

  return playerData;
}

function displayPlayerTable(arr) {
  let tableTemplate = `<table id="player-table" class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Players</th>
        <th colspan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
    ${arr
      .map(
        (ar) => `
      <tr><td>${ar.name}</td>
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
          <button id="edit-player" class='btn btn-primary' data-player-id="${ar.id}">
            Edit
          </button>
        </td>
      </tr>
    `
      )
      .join("")}
    </tbody>
  </table>`;

  playerTableRow.innerHTML = tableTemplate;
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "savePlayerButton") {
    players.push(createPlayer(playerInfo()));
    displayPlayerTable(players);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "edit-player") {
    modalInstance.show();
    const id = e.target.dataset.playerId;
    editPlayer(id);
  }
});

addPlayerButton.addEventListener("click", function () {
  newPlayerModal();
});
