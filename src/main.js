import makeFilter from './make-filter.js';
import getFilm from './filmData.js';
import FilmCard from './FilmCard.js';
import Popup from './Popup.js';

const filterContainer = document.querySelector(`.main-navigation`);
const filmsList = document.querySelector(`.films-list`);
const filmsMainContainer = filmsList.querySelector(`.films-list__container`);
const filmsTopRated = document.querySelector(`section:nth-of-type(2) .films-list__container`);
const filmsMostComment = document.querySelector(`section:nth-of-type(3) .films-list__container`);
let isOpened = false;

filmsMainContainer.innerHTML = ``;
filmsTopRated.innerHTML = ``;
filmsMostComment.innerHTML = ``;

const renderFilmCards = (amount, dist, extra) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < amount; i++) {
    const filmData = getFilm();
    const filmComponent = new FilmCard(filmData, extra);
    const popupComponent = new Popup(filmData);

    filmComponent.onComments = () => {
      popupComponent.render();
      document.body.appendChild(popupComponent.element);
    };

    popupComponent.onClose = () => {
      document.body.removeChild(popupComponent.element);
      popupComponent.unrender();
    };

    popupComponent.onSubmit = (updatedData) => {
      filmData._comments = updatedData.comments;
      filmData._userRating = updatedData.userRating;
      filmData._isFavorite = updatedData.isFavorite;
      filmData._isWatched = updatedData.isWatched;
      filmData._isInWatchList = updatedData.isInWatchList;

      filmComponent.update(filmData);
    };

    fragment.appendChild(filmComponent.render());
  }
  dist.appendChild(fragment);
};

// function open(e) {
//   const opened = filterContainer.querySelector(`.main-navigation__item--active`);
//   if (e.target.classList.contains(`main-navigation__item`)) {
//     if (!isOpened) {
//       e.target.classList.add(`main-navigation__item--active`);
//       isOpened = true;
//       renderFilmCards(filmsMainContainer, random(7), makeMainCard);
//     }
//     if (opened !== e.target) {
//       opened.classList.remove(`main-navigation__item--active`);
//       e.target.classList.add(`main-navigation__item--active`);
//       isOpened = true;
//       renderFilmCards(filmsMainContainer, random(7), makeMainCard);
//     } else if (opened === e.target) {
//       e.target.classList.remove(`main-navigation__item--active`);
//       isOpened = false;
//     }
//   }
// }

filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`History`, true, 6));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Favorites`, true, 4));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`Watchlist`, true, 10));
filterContainer.insertAdjacentHTML(`afterbegin`, makeFilter(`All`));


filterContainer.addEventListener(`click`, open);

renderFilmCards(7, filmsMainContainer);
renderFilmCards(2, filmsTopRated, true);
renderFilmCards(3, filmsMostComment, true);
