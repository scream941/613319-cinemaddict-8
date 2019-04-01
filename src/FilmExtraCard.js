import {createElement} from './utilites.js';

export default class FilmExtraCard {
  constructor(data) {
    this._title = data.title,
    this._rating = data.rating,
    this._year = data.year,
    this._duration = data.duration,
    this._genre = data.genre,
    this._poster = data.poster,
    this._amountOfComments = data.amountOfComments;
    this._element = null;
  }
  get template() {
    return `<article class="film-card film-card--no-controls">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${[...this._genre][random(6)]}</span>
      </p>

      <img src="${this._poster}" alt="Accused" class="film-card__poster">

      <button class="film-card__comments">${this._amountOfComments} comments</button>
    </article>`;
  }
  render() {
    this._element = createElement(this.template);
    this.setListener();
    return this._element;
  }
  setListener() {
  }
}
