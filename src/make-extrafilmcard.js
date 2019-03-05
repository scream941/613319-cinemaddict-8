import random from './random.js';

export default (film) => `<article class="film-card film-card--no-controls">
  <h3 class="film-card__title">${film.title}</h3>
  <p class="film-card__rating">${film.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film.year}</span>
    <span class="film-card__duration">${film.duration}</span>
    <span class="film-card__genre">${[...film.genre][random(6)]}</span>
  </p>

  <img src="${film.poster}" alt="Accused" class="film-card__poster">

  <button class="film-card__comments">${film.amountOfComments} comments</button>
</article>`;
