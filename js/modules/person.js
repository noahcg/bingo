export default class Person {
  constructor(obj) {
    this.id = Math.floor(100 + Math.random() * 900);
    this.name = obj.name;
    this.hasCard = obj.hasCard;
    this.board = {};
  }
}
