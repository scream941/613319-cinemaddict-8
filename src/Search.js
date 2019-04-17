import Component from './Component.js';

export default class Search extends Component {
  constructor() {
    super();
    this._onInput = null;
    this._onSearchInputChange = this._onSearchInputChange.bind(this);
  }

  _onSearchInputChange(e) {
    const inputValue = e.currentTarget.value.toLowerCase();
    if (typeof this._onInput === `function`) {
      this._onInput(inputValue);
    }
  }

  set onInput(fn) {
    this._onInput = fn;
  }

  get template() {
    return `<input type="text" name="search" class="search__field" placeholder="Search">`.trim();
  }

  setListener() {
    this._element.addEventListener(`input`, this._onSearchInputChange);
  }

  removeListener() {
    this._element.removeEventListener(`input`, this._onSearchInputChange);
  }
}
