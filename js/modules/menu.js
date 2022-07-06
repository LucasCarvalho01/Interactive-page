export default class Menu {
  constructor(item) {
    this.menu = document.getElementById(item);
    this.actualMenu = document.querySelector('.menu');

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.actualMenu.style.display = 'flex';
    this.changeIconMenu();
    window.addEventListener('touchend', () => {
      console.log(event);
    })
  }

  addEventMenu() {
    this.menu.addEventListener('touchend', this.openMenu);
  }

  changeIconMenu() {
    this.menu.children[0].setAttribute('src', './images/icon-close-menu.svg');
  }

  init() {
    if(this.menu) {
      this.addEventMenu();
    }

    return this;
  }
}
