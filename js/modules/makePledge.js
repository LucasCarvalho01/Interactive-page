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
    this.progressBar = document.getElementById('progress');
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
    stand: 0.10,
    bamboo: 25,
    black: 75,
    maho: 200,
  };

  // For each button that makes a pledge, add event listener of clicking
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

      // Add event listener on modal close button, and for pressing esc
      this.btnCloseModal.addEventListener('click', this.closeModal);
      window.addEventListener('keydown', this.closeModal);

      // When user select/change option selected on modal
      this.form.addEventListener('change', (e) => {
        const isSoldout = 'soldout' in e.target.dataset;
        // Only handle the choose if change was not from the input pledge, nor submit button
        // And is not soldout
        if(!(e.target === this.inputValue) && !(e.target === this.submit) && !(isSoldout)) {
          this.handleChoose(e);
        }
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
    // Removes green border from previous seleciton
    this.optionDiv.forEach((option) => {
      option.classList.remove('active');
    });

    // Add green border on current selecion inside modal
    event.target.parentNode.parentNode.classList.add('active');
    this.createInputPledge(event.target.value);
  }

  // Add input pledge when an option is selected
  createInputPledge(value) {
    const selector = `#modal .choose[data-option=${value}]`;
    const divOption = document.querySelector(selector);

    divOption.appendChild(this.enterPledge);
    this.enterPledge.style.display = 'flex';
    this.submit.dataset.option = value;

    this.submit.removeEventListener('click', this.foo);
    this.submit.addEventListener('click', this.foo);
  }

  foo(event) {
    event.preventDefault();
    // const option = event.target.dataset.option;
    const { option } = event.target.dataset;

    // Check if the input value is at least the minimum required for that model
    const valid = this.inputValue.value >= this.values[option];

    // Values will be updated using session storage, since there's no API to update those values
    // on json file.
    if(valid) {
      let amountAux = ShowData.getTotalAmount();
      amountAux += +this.inputValue.value;
      ShowData.setTotalAmount(amountAux);
      ShowData.setTotalPeople();

      if(option !== 'stand') {
        ShowData.optionBought(option);
      }

      // Update page HTML
      this.totalAmount.innerHTML = '$' + ShowData.getTotalAmount().toLocaleString();
      this.totalPeople.innerHTML = ShowData.getTotalPeople().toLocaleString();

      // Update progress bar
      this.progressBar.setAttribute('value', ShowData.getPercentage(+sessionStorage.totalAmount, +sessionStorage.totalProject));

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
    this.optionDiv.forEach((option) => {
      option.classList.remove('active');
    });

    // Scroll to page top after all
    window.scrollTo(0, 0);
  }

  closeModal(event) {
    if(event.key && event.key !== 'Escape') {
      return;
    }

    this.modal.style.display = 'none';
  }

  init() {
    this.addEvent();
    return this;
  }
}
