import Component from './Component.js';

export default class Filter extends Component {
  constructor(title, id, amount, isAdditional = false, isActive = false) {
    super();
    this._title = title;
    this._id = id;
    this._amount = amount;
    this._isActive = isActive;
    this._isAdditional = isAdditional;
    this._onFilter = null;

    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  _onFilterButtonClick(e) {
    e.preventDefault();
    if (typeof this._onFilter === `function`) {
      const target = e.target.closest(`.main-navigation__item`);
      const filter = e.target.id;
      const activeItem = target.parentElement.querySelector(`.main-navigation__item--active`);
      if (activeItem) {
        activeItem.classList.remove(`main-navigation__item--active`);
      }
      target.classList.add(`main-navigation__item--active`);
      this._onFilter(filter);
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<a href="#${this._title.toLowerCase()}" id="${this._id}"
            class="main-navigation__item ${this._isActive ? `main-navigation__item--active` : ``}
            ${this._isAdditional ? `main-navigation__item--additional` : ``}">
             ${this._title}
             ${this._amount ? `<span class="main-navigation__item-count">${this._amount}</span>` : ` `}
           </a>`.trim();
  }

  setListener() {
    this._element.addEventListener(`click`, this._onFilterButtonClick);
  }
  removeListener() {
    this._element.removeEventListener(`click`, this._onFilterButtonClick);
  }
}
