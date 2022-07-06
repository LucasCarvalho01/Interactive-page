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
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  getPercentage(current, total) {
    let amount = current / total;
    amount = Math.floor(amount * 100);

    return amount;
  }

  updateHTML(data) {
    this.amount.innerText = data.totalAmount.toLocaleString();
    this.people.innerText = data.totalPeople.toLocaleString();
    this.days.innerText = data.remainingDays;
    this.progressBar.setAttribute('value', this.getPercentage(data.totalAmount, data.totalProject));
  }

  init() {
    this.getData();
    return this;
  }
}
