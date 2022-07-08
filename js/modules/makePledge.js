export default class MakePledge {
  constructor(modal, ...args) {
    this.modal = document.getElementById(modal);
    this.btnCloseModal = document.getElementById('closeModal');
    this.buttons = args.map((btn) => document.getElementById(btn));
    this.form = document.getElementById('form');
    this.inputValue = document.getElementById('value');
    this.submit = document.getElementById('continue');
    this.scrollOptions = {
      behavior: 'smooth',
      block: 'center',
    };

    // this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    // this.createInputPledge = this.createInputPledge.bind(this);
  }

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
        // console.log(e);
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
    // this.submit.removeEventListener('click', )
    this.createInputPledge(event.target.value);
  }

  // Add input pledge when an option is selected
  createInputPledge(value) {
    const selector = `#modal .choose[data-option=${value}]`;
    const divOption = document.querySelector(selector);
    const enterPledge = document.querySelector('.pledge-input');

    divOption.appendChild(enterPledge);
    enterPledge.style.display = 'block';

    this.computePledge(value);
  }

  computePledge(value) {
    // this.submit.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   console.log(value);
    // });
    this.submit.addEventListener('click', this.submitPledge(value));
  }

  submitPledge(value) {
    console.log('oi', value);
    event.preventDefault();
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  init() {
    this.addEvent();
  }
}
