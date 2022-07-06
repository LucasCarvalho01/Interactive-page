export default class Menu {
  constructor(item) {
    this.menu = document.getElementById(item);
    this.actualMenu = document.querySelector('.menu');

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.actualMenu.classList.toggle('active');
    this.eventClose();
  }

  // When menu is opened, add eventlistener on window for touch.
  // If touch was not inside the menu, close it and remove the eventlistener
  closeMenu(event) {
    console.log(event.target);
    if(event.target.tagName !== 'A' && event.target !== this.menu.firstElementChild) {
      this.actualMenu.classList.remove('active');
      window.removeEventListener('touchstart', this.closeMenu);
    }
  }

  addEventMenu() {
    this.menu.addEventListener('touchstart', this.openMenu);
  }

  eventClose() {
    window.addEventListener('touchstart', this.closeMenu);
  }

  changeIconMenu() {
    this.menu.children[0].setAttribute('src', './images/icon-close-menu.svg');
  }

  changeIconHam() {
    this.menu.children[0].setAttribute('src', './images/icon-hamburger.svg');
  }

  init() {
    if(this.menu) {
      this.addEventMenu();
    }

    return this;
  }
}
