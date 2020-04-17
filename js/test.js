import BingoCard from "./modules/bingoCard.js";
import Person from "./modules/person.js";

const addPlayerButton = document.getElementsByClassName("add-player-button")[0],
  data = {
    players: [],
  };

let playerModal = document.getElementById("playerModal"),
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
  modalInstance = new Modal(playerModal, {
    content: `<div class="modal-header">
      <h5 class="modal-title" id="playerModalLabel">Add New Player</h5>
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
    <form id="player-data">
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
    nameField,
    hasCardField,
    editPlayerTemplate = `<div class="modal-header">
      <h5 class="modal-title" id="playerModalLabel">Edit Player</h5>
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
    </div>`;

  if (!modalInstance) {
    modalInstance = new Modal(playerModal, {
      content: editPlayerTemplate,
      backdrop: "static",
      keyboard: false,
    });
  } else {
    modalInstance.setContent(editPlayerTemplate);
  }

  for (let i = 0; i < data.players.length; i++) {
    if (parseInt(id, 10) === data.players[i].id) {
      editPlayerForm = `<form>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="playerNameInput"
            aria-describedby="playerName"
            value="${data.players[i].name}"
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
              data.players[i].hasCard ? "active" : ""
            }"
            data-toggle="button"
            aria-pressed="${data.players[i].hasCard}"
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
        data.players[i].name = nameField.value;
        data.players[i].hasCard = JSON.parse(
          hasCardField.getAttribute("aria-pressed")
        );
        renderPlayerTable();
      });
    }
  }
  modalInstance.show();
}

function deletePlayer(id) {
  let deletePlayerForm,
    deletePlayerTemplate = `<div class="modal-header">
      <h5 class="modal-title" id="playerModalLabel">Delete Player</h5>
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
    </div>`;

  if (!modalInstance) {
    modalInstance = new Modal(playerModal, {
      content: deletePlayerTemplate,
      backdrop: "static",
      keyboard: false,
    });
  } else {
    modalInstance.setContent(deletePlayerTemplate);
  }

  for (let i = 0; i < data.players.length; i++) {
    if (parseInt(id, 10) === data.players[i].id) {
      deletePlayerForm = `<p class="lead">Are you sure you want to remove <strong>${data.players[i].name}</strong> from the game?</p>`;

      mbody.innerHTML = deletePlayerForm;

      const deleteButton = document.getElementById("deletePlayerButton");

      deleteButton.addEventListener("click", function () {
        data.players.splice(data.players.indexOf(data.players[i]), 1);
        renderPlayerTable();
      });
    }
  }
  modalInstance.show();
}

function playerInfo() {
  const nameField = document.getElementById("playerNameInput"),
    hasCardField = document.getElementById("hasCardToggle"),
    playerData = {};

  playerData.name = nameField.value;
  playerData.hasCard = JSON.parse(hasCardField.getAttribute("aria-pressed"));

  return playerData;
}

function playerTableRowTemplate() {
  let playerList = data.players.map(function (player) {
    return `<tr><td>${player.name}</td>
      <td>
        <button id="edit-player" class='btn btn-primary' data-player-id="${player.id}">
          Edit
        </button>
      </td>
      <td>
        <button id="delete-player" class='btn btn-primary' data-player-id="${player.id}">
          Delete
        </button>
      </td>
    </tr>`;
  });

  let html = "";

  if (playerList.length > 0) {
    html += `<table id="player-table" class="table table-striped table-dark">
      <thead>
        <tr>
          <th>Players</th>
          <th colspan="2">Actions</th>
        </tr>
      </thead>
      <tbody>${playerList.join("")}</tbody>
    </table>`;
  }

  return html;
}

// Emit a custom event
function emitEvent(elem, detail) {
  // Create a new event
  let event = new CustomEvent("render", {
    bubbles: true,
    cancelable: true,
    detail: detail || {},
  });

  // Dispatch the event
  elem.dispatchEvent(event);
}

function renderPlayerTable() {
  let playerTableRow = document.getElementById("player-row");
  if (!playerTableRow) return;
  playerTableRow.innerHTML = playerTableRowTemplate();
  emitEvent(playerTableRow, data);
}

function getPlayersFromLocalStorage() {
  var players = localStorage.getItem("playerInfo");
  if (players) {
    data.players = JSON.parse(players);
  }
}

function saveToLocalStorage(event) {
  localStorage.setItem("playerInfo", JSON.stringify(event.detail.players));
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "savePlayerButton") {
    data.players.push(createPlayer(playerInfo()));
    renderPlayerTable();
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "edit-player") {
    const id = e.target.dataset.playerId;
    editPlayer(id);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "delete-player") {
    const id = e.target.dataset.playerId;
    deletePlayer(id);
  }
});

addPlayerButton.addEventListener("click", function () {
  newPlayerModal();
});

document.addEventListener("render", saveToLocalStorage, false);

getPlayersFromLocalStorage();
renderPlayerTable();
