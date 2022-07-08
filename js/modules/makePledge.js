import ShowData from "./getData.js";

export default class MakePledge {
  constructor(modal, ...args) {
    this.totalAmount = document.getElementById('totalAmount');
    this.totalPeople = document.getElementById('totalPeople');
    this.modal = document.getElementById(modal);
    this.btnCloseModal = document.getElementById('closeModal');
    this.buttons = args.map((btn) => document.getElementById(btn));
    this.form = document.getElementById('form');
    this.enterPledge = document.querySelector('.pledge-input');
    this.inputValue = document.getElementById('value');
    this.submit = document.getElementById('continue');
    this.succesModal = document.querySelector('.success-modal');
    this.completed = document.getElementById('completed');
    this.options = document.querySelectorAll('input[name="product"]');
    this.optionDiv = document.querySelectorAll('.choose');
    this.scrollOptions = {
      behavior: 'smooth',
      block: 'center',
    };

    // this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    // this.createInputPledge = this.createInputPledge.bind(this);
    this.foo = this.foo.bind(this);
    this.completePledge = this.completePledge.bind(this);
  }

  values = {
    stand: 0,
    bamboo: 25,
    black: 75,
    maho: 200,
  };

  addEvent() {
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.openModal(event);
        event.stopPropagation();
      });
    });
  }

  openModal(event) {
    const getDataset = event.target.dataset;

    // Only opens modal if the option is not soldout
    if(!('soldout' in getDataset)) {
      this.modal.style.display = 'block';

      // If user made pledge on specific option
      if(getDataset.option) {
        this.scrollTo(getDataset.option);
      }

      // Add event listener on modal close button
      this.btnCloseModal.addEventListener('click', this.closeModal);

      // When user select/change option selected on modal
      this.form.addEventListener('change', (e) => {
        // Only handle the choose if change was not from the input pledge, nor submit button
        if(!(e.target === this.inputValue) && !(e.target === this.submit)) {
          this.handleChoose(e);
        }

        // e.stopPropagation();
      });
    }
  }

  scrollTo(option) {
    // Retorna o scroll da seção selecionada, menos 240px, geralmente o meio da tela
    const selector = `#modal form [data-option=${option}]`;
    const section = document.querySelector(selector);
    section.scrollIntoView(this.scrollOptions);
  }

  handleChoose(event) {
    // Removes green border from previou seleciton and add on current one
    this.optionDiv.forEach((div) => {
      div.classList.remove('active');
    });
    event.target.parentNode.parentNode.classList.add('active');
    this.createInputPledge(event.target.value);
  }

  // Add input pledge when an option is selected
  createInputPledge(value) {
    const selector = `#modal .choose[data-option=${value}]`;
    const divOption = document.querySelector(selector);

    divOption.appendChild(this.enterPledge);
    this.enterPledge.style.display = 'block';
    this.submit.dataset.option = value;

    this.submit.removeEventListener('click', this.foo);
    // this.computePledge();
    this.submit.addEventListener('click', this.foo);
  }

  foo(event) {
    event.preventDefault();

    // Check if the input value is at least the minimum required for that model
    const valid = this.inputValue.value >= this.values[event.target.dataset.option];

    // Values will be updated using session storage, since there's no API to update those values
    // on json file.
    if(valid) {
      let amountAux = ShowData.getTotalAmount();
      amountAux += +this.inputValue.value;
      ShowData.setTotalAmount(amountAux);
      ShowData.setTotalPeople();

      // Update page HTML
      this.totalAmount.innerHTML = ShowData.getTotalAmount().toString().toLocaleString();
      this.totalPeople.innerHTML = ShowData.getTotalPeople().toString().toLocaleString();

      // Once pledge is computed, open complete modal
      this.succesModal.style.display = 'grid';
      this.completed.addEventListener('click', this.completePledge);
    } else {
      console.log('nao valido');
    }
  }

  completePledge() {
    this.succesModal.style.display = 'none';
    this.modal.style.display = 'none';
    this.enterPledge.style.display = 'none';

    // Uncheck previous option and clear input
    this.inputValue.value = '';
    this.options.forEach((option) => {
      option.checked = false;
    });

    // Scroll to page top after all
    window.scrollTo(0, 0);
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  init() {
    console.log(this.completed);
    this.addEvent();
    return this;
  }
}
