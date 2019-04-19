import Component from './Component.js';
import moment from 'moment';

export default class FilmCard extends Component {
  constructor(data, isExtra = false) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._year = data.year;
    this._genre = data.genre;
    this._description = data.description;
    this._amountOfComments = data.amountOfComments;
    this._duration = data.duration;
    this._picture = data.picture;
    this._comments = data.comments;
    this._isExtra = isExtra;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._isInWatchList = data.isInWatchList;

    this._onComments = null;
    this._onWatchList = null;
    this._onMarkAsWatched = null;
    this._onFavorite = null;

    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);
    this._onAddInWatchListButtonClick = this._onAddInWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
  }

  _onCommentsButtonClick() {
    if (typeof this._onComments === `function`) {
      this._onComments();
    }
  }

  _onAddInWatchListButtonClick(e) {
    e.preventDefault();
    if (typeof this._onWatchList === `function`) {
      this.isInWatchList = !this.isInWatchList;
      this._onWatchList();
    }
  }

  _onMarkAsWatchedButtonClick(e) {
    e.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this.isWatched = !this.isWatched;
      this._onMarkAsWatched();
    }
  }

  _onFavoriteButtonClick(e) {
    e.preventDefault();
    if (typeof this._onFavorite === `function`) {
      this._isFavorite = !this._isFavorite;
      this._onFavorite();
    }
  }

  set onComments(fn) {
    this._onComments = fn;
  }

  set onWatchList(fn) {
    this._onWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onFavorite(fn) {
    this._onFavorite = fn;
  }

  get template() {
    return `<article class="film-card ${this._isExtra ? `film-card--no-controls` : ``}">
              <h3 class="film-card__title">${this._title}</h3>
              <p class="film-card__rating">${this._rating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
                <span class="film-card__duration">${moment.utc(moment.duration(this._duration, `minutes`).asMilliseconds()).format(`h[h] m[m]`)}</span>
                <span class="film-card__genre ${![...this._genre].length ? `visualy-hidden` : ``}">${[...this._genre][0]}</span>
              </p>
              <img src="${this._picture}" alt="${this._title}" class="film-card__poster">
              <p class="film-card__description ${this._description > 2 ? `` : `visualy-hidden`}">${this._description}</p>
              <button class="film-card__comments">${this._comments.length} comments</button>
              ${!this._isExtra ? `<form class="film-card__controls">
                <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
             </form>` : ``}
           </article>`.trim();
  }

  setListener() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onCommentsButtonClick);
    if (!this._isExtra) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .addEventListener(`click`, this._onAddInWatchListButtonClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .addEventListener(`click`, this._onMarkAsWatchedButtonClick);
      this._element.querySelector(`.film-card__controls-item--favorite`)
        .addEventListener(`click`, this._onFavoriteButtonClick);
    }
  }

  removeListener() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsButtonClick);
    if (!this._isExtra) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .removeEventListener(`click`, this._onAddInWatchListButtonClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
      this._element.querySelector(`.film-card__controls-item--favorite`)
        .removeEventListener(`click`, this._onFavoriteButtonClick);
    }
  }

  update(data) {
    if (data.comments) {
      this._comments = data.comments;
    }
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._isInWatchList = data.isInWatchList;
    this._userRating = data.userRating;

    this.removeListener();
    this._partialUpdate();
    this.setListener();
  }
}
