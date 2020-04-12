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

      t.classList.add("table", "table-striped", "table-sm", "mb-0");
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
  const list = document.createElement("ul"),
    listContainer = document.querySelector("aside");

  list.setAttribute("id", "player-list");

  if (listContainer.querySelector("#player-list") != null) {
    listContainer.removeChild(document.getElementById("player-list"));
    listContainer.appendChild(list);
  } else {
    listContainer.appendChild(list);
  }

  for (let i = 0; i < arr.length; i++) {
    let listItem = document.createElement("li"),
      playerName = document.createTextNode(arr[i].name);
    listItem.append(playerName);
    list.appendChild(listItem);
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
});
