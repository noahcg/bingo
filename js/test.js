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
  let editPlayerForm, nameField, hasCardField;

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

function deletePlayer(id) {
  let deletePlayerForm;

  modalInstance.setContent(`<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Delete Player</h5>
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
      id="deletePlayerButton"
      type="button"
      class="btn btn-danger"
      data-dismiss="modal"
    >
      Delete Player
    </button>
  </div>`);

  for (let i = 0; i < players.length; i++) {
    if (parseInt(id, 10) === players[i].id) {
      deletePlayerForm = `<p class="lead">Are you sure you want to remove <strong>${players[i].name}</strong> from the game?</p>`;

      mbody.innerHTML = deletePlayerForm;

      const deleteButton = document.getElementById("deletePlayerButton");

      deleteButton.addEventListener("click", function () {
        players.splice(players.indexOf(players[i]), 1);
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
          <button id="edit-player" class='btn btn-primary' data-player-id="${ar.id}">
            Edit
          </button>
        </td>
        <td>
          <button id="delete-player" class='btn btn-primary' data-player-id="${ar.id}">
            Delete
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

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "delete-player") {
    modalInstance.show();
    const id = e.target.dataset.playerId;
    deletePlayer(id);
  }
});

addPlayerButton.addEventListener("click", function () {
  newPlayerModal();
});
