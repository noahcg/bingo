class BingoCard {
  constructor(rows) {
    this.rows = rows;
    this.columns = 5;
    this.freeSpace = "⭐️";
    this.createCard = function () {
      const m = document.getElementsByClassName("game-window")[0],
        t = document.createElement("table"),
        th = document.createElement("thead"),
        tb = document.createElement("tbody"),
        c = document.createElement("div");

      c.classList.add("card");
      c.appendChild(t);
      t.appendChild(th);
      t.appendChild(tb);
      m.appendChild(c);

      document.getElementsByTagName("thead")[0].innerHTML =
        "<tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>";

      t.classList.add("table", "table-striped", "table-sm");
      th.classList.add("thead-dark");
      c.classList.add("mb-4");
    };
    this.createRows = function () {
      return document.createElement("tr");
    };
    this.createColumns = function () {
      return document.createElement("td");
    };
    this.createGrid = function () {
      const t = document.querySelector("tbody");
      for (let i = 0; i < this.rows; i++) {
        t.appendChild(this.createRows());
      }
      const r = document.querySelector("tbody").getElementsByTagName("tr");
      for (let j = 0; j < this.columns; j++) {
        for (let k = 0; k < r.length; k++) {
          r[k].appendChild(this.createColumns());
        }
      }
    };
    this.addGridNumbers = function () {
      const tds = document.querySelector("tbody").getElementsByTagName("td");

      let arr = [],
        gridLength = this.rows * this.columns;

      while (arr.length < gridLength) {
        let r = Math.floor(Math.random() * 75) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }

      for (let i = 0; i < tds.length; i++) {
        tds[i].append(arr[i]);
        if (i == 12) {
          tds[i].childNodes[0].remove();
          tds[i].append(this.freeSpace);
        }
      }
    };
    this.init = function () {
      this.createCard();
      this.createGrid();
      this.addGridNumbers();
    };
  }
}

const myCard = new BingoCard(5);
myCard.init();

class Person {
  constructor(name) {
    this.name = name;
    this.hasCard = false;
  }
}

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
            Add Card
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
