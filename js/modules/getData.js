import axios from 'axios';

export default class ShowData {
  constructor(amount, people, days, bar) {
    this.amount = document.getElementById(amount);
    this.people = document.getElementById(people);
    this.days = document.getElementById(days);
    this.progressBar = document.getElementById(bar);
    this.dataURL = '../js/data.json';
  }

  getData() {
    axios.get(this.dataURL)
      .then((response) => {
        this.updateHTML(response.data);
        this.storeData(response.data);
      })
      .catch((error) => console.log(error));
  }

  static getPercentage(current, total) {
    let amount = current / total;
    amount = Math.floor(amount * 100);

    return amount;
  }

  updateHTML(data) {
    this.amount.innerText = data.totalAmount.toLocaleString();
    this.people.innerText = data.totalPeople.toLocaleString();
    this.days.innerText = data.remainingDays;
    this.progressBar.setAttribute('value', this.constructor.getPercentage(data.totalAmount, data.totalProject));
  }

  storeData(data) {
    sessionStorage.setItem('totalAmount', data.totalAmount);
    sessionStorage.setItem('totalPeople', data.totalPeople);
    sessionStorage.setItem('remainingDays', data.remainingDays);
  }

  static getTotalAmount() {
    return +sessionStorage.getItem('totalAmount');
  }

  static setTotalAmount(value) {
    sessionStorage.setItem('totalAmount', value);
  }

  static getTotalPeople() {
    return +sessionStorage.getItem('totalPeople');
  }

  static setTotalPeople() {
    const aux = this.getTotalPeople() + 1;
    sessionStorage.setItem('totalPeople', aux);
  }

  static getDays() {
    return +sessionStorage.getItem('remainingDays');
  }

  init() {
    this.getData();
    return this;
  }
}
