import changeBookmark from './modules/bookmark.js';
import ShowData from './modules/getData.js';
import MakePledge from './modules/makePledge.js';
import Menu from './modules/menu.js';

const menu = new Menu('menuHam');
menu.init();

changeBookmark('bookmark');

// Class that get values about project when opening page
const showData = new ShowData('totalAmount', 'totalPeople', 'daysLeft', 'progress');
showData.init();

// Class that updates current values on page
const makePledge = new MakePledge('modal', 'back', 'reward1', 'reward2', 'reward3');
makePledge.init();

console.log('oi');