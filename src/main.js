import makeFilter from './make-filter.js';
import makeMainCard from './make-filmcard.js';
import makeExtraCard from './make-extrafilmcard.js';

const filterContainer = document.querySelector(`.main-navigation`);
const filmsList = document.querySelector(`.films-list`);
const filmsMainContainer = filmsList.querySelector(`.films-list__container`);
const filmsTopRated = document.querySelector(`section:nth-of-type(2) .films-list__container`);
const filmsMostComment = document.querySelector(`section:nth-of-type(3) .films-list__container`);
let isOpened = false;

const renderMainFilmCards = (count) => {
  filmsMainContainer.innerHTML = ``;
  const cards = new Array(count).fill().map(makeMainCard);
  filmsMainContainer.insertAdjacentHTML(`beforeend`, cards.join(``));
};

const renderExtraFilmCards = (dist) => {
  const cards = new Array(2).fill().map(makeExtraCard);
  dist.insertAdjacentHTML(`beforeend`, cards.join(``));
};

function open(e) {
  const opened = filterContainer.querySelector(`.main-navigation__item--active`);
  if (e.target.classList.contains(`main-navigation__item`)) {
    if (isOpened) {
      if (opened !== e.target) {
        opened.classList.remove(`main-navigation__item--active`);
        e.target.classList.add(`main-navigation__item--active`);
        isOpened = true;
        renderMainFilmCards(4);
      } else if (opened === e.target) {
        e.target.classList.remove(`main-navigation__item--active`);
        isOpened = false;
      }
    } else {
      e.target.classList.add(`main-navigation__item--active`);
      isOpened = true;
      renderMainFilmCards(4);
    }
  }
}

filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`History`, true, 6));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Favorites`, true, 4));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Watchlist`, true, 10));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`All`));

renderMainFilmCards(7);
renderExtraFilmCards(filmsTopRated);
renderExtraFilmCards(filmsMostComment);

filterContainer.addEventListener(`click`, open);
