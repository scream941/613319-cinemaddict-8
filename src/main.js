import makeFilter from './make-filter.js';
import makeMainCard from './make-filmcard.js';
import makeExtraCard from './make-extrafilmcard.js';
import getFilm from './filmData.js';
import random from './random.js';

const filterContainer = document.querySelector(`.main-navigation`);
const filmsList = document.querySelector(`.films-list`);
const filmsMainContainer = filmsList.querySelector(`.films-list__container`);
const filmsTopRated = document.querySelector(`section:nth-of-type(2) .films-list__container`);
const filmsMostComment = document.querySelector(`section:nth-of-type(3) .films-list__container`);
let isOpened = false;


const renderFilmCards = (dist, count, mapper) => {
  dist.innerHTML = ``;
  const cards = new Array(count).fill(``).map(() => mapper(getFilm()));
  dist.insertAdjacentHTML(`beforeend`, cards.join(``));
};

function open(e) {
  const opened = filterContainer.querySelector(`.main-navigation__item--active`);
  if (e.target.classList.contains(`main-navigation__item`)) {
    if (!isOpened) {
      e.target.classList.add(`main-navigation__item--active`);
      isOpened = true;
      renderFilmCards(filmsMainContainer, random(7), makeMainCard);
    }
    if (opened !== e.target) {
      opened.classList.remove(`main-navigation__item--active`);
      e.target.classList.add(`main-navigation__item--active`);
      isOpened = true;
      renderFilmCards(filmsMainContainer, random(7), makeMainCard);
    } else if (opened === e.target) {
      e.target.classList.remove(`main-navigation__item--active`);
      isOpened = false;
    }
  }
}

filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`History`, true, 6));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Favorites`, true, 4));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Watchlist`, true, 10));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`All`));

renderFilmCards(filmsMainContainer, 7, makeMainCard);
renderFilmCards(filmsTopRated, 2, makeExtraCard);
renderFilmCards(filmsMostComment, 2, makeExtraCard);

filterContainer.addEventListener(`click`, open);
