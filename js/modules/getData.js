import axios from 'axios';

export default class ShowData {
  constructor(amount, people, days, bar) {
    this.amount = document.getElementById(amount);
    this.people = document.getElementById(people);
    this.days = document.getElementById(days);
    this.progressBar = document.getElementById(bar);
    this.dataURL = '../js/data.json';
    this.bamboo = document.querySelector('section.bamboo span[data-stand]');
    this.black = document.querySelector('section.black span[data-stand]');
    this.maho = document.querySelector('section.maho span[data-stand]');
    this.modalOptions = document.querySelectorAll('.choose');
  }

  getData() {
    axios.get(this.dataURL)
      .then((response) => {
        this.storeData(response.data);
        this.updateHTML(response.data);
      })
      .catch((error) => console.log(error));
  }

  // Return percentage of total backed
  static getPercentage(current, total) {
    let amount = current / total;
    amount = Math.floor(amount * 100);

    return (amount < 100 ? amount : 100);
  }

  // Stores the data from json file on session storage on page load
  storeData(data) {
    sessionStorage.setItem('totalAmount', data.totalAmount);
    sessionStorage.setItem('totalPeople', data.totalPeople);
    sessionStorage.setItem('remainingDays', data.remainingDays);
    sessionStorage.setItem('totalProject', data.totalProject);
    sessionStorage.setItem('bamboo', data.bamboo);
    sessionStorage.setItem('black', data.black);
    sessionStorage.setItem('maho', data.maho);
  }

  // Displays right values on page load
  updateHTML(data) {
    this.amount.innerText = '$' + data.totalAmount.toLocaleString();
    this.people.innerText = data.totalPeople.toLocaleString();
    this.days.innerText = data.remainingDays;
    this.progressBar.setAttribute('value', this.constructor.getPercentage(data.totalAmount, data.totalProject));
    this.bamboo.innerHTML = data.bamboo;
    this.black.innerHTML = data.black;
    this.maho.innerHTML = data.maho;
    this.modalOptions.forEach((option) => {
      if(option.dataset.option === 'stand') {
        return;
      }
      const left = option.querySelector('span[data-stand]');
      left.innerHTML = data[option.dataset.option];
    });
    this.checkValues();
  }

  // Check values for option soldout
  checkValues() {
    const options = document.querySelectorAll('.edition');
    options.forEach((option) => {
      const currentValue = option.classList[1];
      const currentBtn = option.querySelector('button');
      const optionModal = document.querySelector(`#modal div[data-option=${currentValue}]`);
      const inputModal = optionModal.querySelector('input');
      // If soldout, apply right styles
      if(sessionStorage[currentValue] == 0) {
        option.classList.add('expired');
        currentBtn.dataset.soldout = '';
        optionModal.classList.add('soldout');
        optionModal.dataset.soldout = '';
        inputModal.dataset.soldout = '';
        inputModal.setAttribute('disabled', true);
      }
    });
  }

  // Updates HTML values according to option that was bought
  static optionBought(option) {
    let aux = +sessionStorage.getItem(option);
    aux -= 1;
    sessionStorage.setItem(option, aux);

    const section = document.querySelector(`section.${option}`);
    const value = section.querySelector('span[data-stand]');
    const valueOnModal = document.querySelector(`#modal div[data-option=${option}] span[data-stand]`);
    const sectionBtn = section.querySelector('button');
    const modalOption = document.querySelector(`#modal div[data-option=${option}]`);

    value.innerHTML = this.optionRemaining(option).toLocaleString();
    valueOnModal.innerHTML = this.optionRemaining(option);

    // If remaining value is zero, then it has soldout
    if(this.optionRemaining(option) === 0) {
      section.classList.add('expired');
      sectionBtn.dataset.soldout = '';
      modalOption.classList.add('soldout');
      modalOption.dataset.soldout = '';
    }
  }

  static optionRemaining(option) {
    return +sessionStorage.getItem(option);
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
