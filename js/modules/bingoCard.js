export default class BingoCard {
  constructor(rows) {
    this.rows = rows;
    this.columns = 5;
    this.freeSpace = "⭐️";
    this.createCard = function (gw, i) {
      const m = gw,
        t = document.createElement("table"),
        th = document.createElement("thead"),
        tb = document.createElement("tbody"),
        c = document.createElement("div");

      c.classList.add("card");
      c.appendChild(t);
      t.appendChild(th);
      t.appendChild(tb);
      m.appendChild(c);

      document.getElementsByTagName("thead")[i].innerHTML =
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
    this.createGrid = function (i) {
      const t = document.getElementsByTagName("tbody")[i];
      for (let i = 0; i < this.rows; i++) {
        t.appendChild(this.createRows());
      }
      const r = document
        .getElementsByTagName("tbody")
        [i].getElementsByTagName("tr");
      for (let j = 0; j < this.columns; j++) {
        for (let k = 0; k < r.length; k++) {
          r[k].appendChild(this.createColumns());
        }
      }
    };
    this.addGridNumbers = function (i) {
      const tds = document
        .getElementsByTagName("tbody")
        [i].getElementsByTagName("td");

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
    this.init = function (gw, i) {
      this.createCard(gw, i);
      this.createGrid(i);
      this.addGridNumbers(i);
    };
  }
}
