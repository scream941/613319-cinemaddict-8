import makeFilter from './make-filter.js';
import getFilm from './filmData.js';
import {random, simpleCicle} from './utilites.js';
import FilmCard from './FilmCard.js';
import FilmExtraCard from './FilmExtraCard.js';
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


const listOfMainFilms = [];
const listOfTopRatedFilms = [];
const listOfMostCommentFilms = [];
simpleCicle(listOfMainFilms, 7, getFilm);
simpleCicle(listOfTopRatedFilms, 2, getFilm);
simpleCicle(listOfMostCommentFilms, 3, getFilm);


const renderFilms = (dist, listOfFilms) => {
  for (const film of listOfFilms) {
    const filmCard = new FilmCard(film);
    filmCard.onClick = () => {
      document.body.appendChild(popup.render());
    };
    const popup = new Popup(film);
    popup.onClose = () => {
      popup._element.remove();
      popup.unrender();
    };
    dist.appendChild(filmCard.render());
  }
};


renderFilms(filmsMainContainer, listOfMainFilms);
renderFilms(filmsTopRated, listOfTopRatedFilms);
renderFilms(filmsMostComment, listOfMostCommentFilms);


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


filterContainer.addEventListener(`click`, open);
