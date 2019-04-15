import {filmsData} from './filmData.js';
import {drawStat} from './statistic.js';
import Filter from './Filter.js';
import FilmCard from './FilmCard.js';
import Popup from './Popup.js';

const CARDS = 7;
const EXTRA_CARDS = 2;

const initialFilms = filmsData(CARDS);

const filtersData = [
  {
    title: `All movies`,
    id: `all`,
    isActive: true,
  },
  {
    title: `Watchlist`,
    id: `watchlists`,
    amount: initialFilms.filter((item) => item.isInWatchList).length,
  },
  {
    title: `History`,
    id: `history`,
    amount: initialFilms.filter((item) => item.isWatched).length,
  },
  {
    title: `Favorites`,
    id: `favorites`,
    amount: initialFilms.filter((item) => item.isFavorite).length
  },
  {
    title: `Stats`,
    id: `stats`,
    isAdditional: true,
  },
];

const sortTopRatedFilms = (topRatedFilms) => {
  topRatedFilms.sort((a, b) => b.rating - a.rating);
  let sortedTopRatedFilms = [];
  for (let i = 0; i < EXTRA_CARDS; i++) {
    sortedTopRatedFilms.push(topRatedFilms[i]);
  }
  return sortedTopRatedFilms;
};

const sortMostCommentFilms = (mostComentFilms) => {
  mostComentFilms.sort((a, b) => b.comments.length - a.comments.length);
  let sortedMostCommentFilms = [];
  for (let i = 0; i < EXTRA_CARDS; i++) {
    sortedMostCommentFilms.push(mostComentFilms[i]);
  }
  return sortedMostCommentFilms;
};

const topRatedFilms = sortTopRatedFilms(initialFilms);
const mostCommentFilms = sortMostCommentFilms(initialFilms);


const filterContainer = document.querySelector(`.main-navigation`);
const filmsList = document.querySelector(`.films-list`);
const filmsMainContainer = filmsList.querySelector(`.films-list__container`);
const filmsTopRated = document.querySelector(`section:nth-of-type(2) .films-list__container`);
const filmsMostComment = document.querySelector(`section:nth-of-type(3) .films-list__container`);
const statisticContainer = document.querySelector(`.statistic`);
const films = document.querySelector(`.films`);

const filterFilms = (listOfFilms, filterName) => {
  switch (filterName) {
    case `all`:
      return listOfFilms;
    case `watchlists`:
      return listOfFilms.filter((film) => film.isInWatchList);
    case `history`:
      return listOfFilms.filter((film) => film.isWatched);
    case `favorites`:
      return listOfFilms.filter((film) => film.isFavorite);
    default:
      return listOfFilms;
  }
};

const showStatistic = () => {
  drawStat(initialFilms);
  statisticContainer.classList.remove(`visually-hidden`);
  films.classList.add(`visually-hidden`);
};

const hideStatistic = () => {
  statisticContainer.classList.add(`visually-hidden`);
  films.classList.remove(`visually-hidden`);
};

filmsMainContainer.innerHTML = ``;
filmsTopRated.innerHTML = ``;
filmsMostComment.innerHTML = ``;


const renderFilters = (dataOfFilters) => {
  filterContainer.innerHTML = ``;
  dataOfFilters.forEach((filterData) => {
    const filterComponent = new Filter(filterData.title, filterData.id, filterData.amount, filterData.isAdditional, filterData.isActive);
    filterComponent.onFilter = (filter) => {
      if (filter !== `stats`) {
        const filteredFilms = filterFilms(initialFilms, filter);
        hideStatistic();
        filmsMainContainer.innerHTML = ``;
        filteredFilms.forEach((film) => renderFilmCards(film, filmsMainContainer));
      } else if (filter === `stats`) {
        showStatistic();
      }
    };
    filterContainer.appendChild(filterComponent.render());
  });
};

const renderFilmCards = (film, dist, extra) => {
  const filmComponent = new FilmCard(film, extra);
  const popupComponent = new Popup(film);
  dist.appendChild(filmComponent.render());

  filmComponent.onComments = () => {
    if (!extra) {
      popupComponent.render();
      document.body.appendChild(popupComponent.element);
    }
  };


  filmComponent.onWatchList = () => {
    film.isInWatchList = !film.isInWatchList;
    const filterAmount = filtersData.findIndex((filter) => filter.id === `watchlists`);
    const filteredFilms = filterFilms(initialFilms, `watchlists`);
    if (!film.isInWatchList) {
      filtersData[filterAmount].amount--;
    }
    filtersData[filterAmount].amount = filteredFilms.length;
    popupComponent.update(film);
    renderFilters(filtersData);
  };

  filmComponent.onMarkAsWatched = () => {
    film.isWatched = !film.isWatched;
    const filterAmount = filtersData.findIndex((filter) => filter.id === `history`);
    const filteredFilms = filterFilms(initialFilms, `history`);
    if (!film.isWatched) {
      filtersData[filterAmount].amount--;
    }
    filtersData[filterAmount].amount = filteredFilms.length;
    popupComponent.update(film);
    renderFilters(filtersData);
  };

  filmComponent.onFavorite = () => {
    film.isFavorite = !film.isFavorite;
    const filterAmount = filtersData.findIndex((filter) => filter.id === `favorites`);
    const filteredFilms = filterFilms(initialFilms, `favorites`);
    if (!film.isFavorite) {
      filtersData[filterAmount].amount--;
    }
    filtersData[filterAmount].amount = filteredFilms.length;
    popupComponent.update(film);
    renderFilters(filtersData);
  };

  popupComponent.onClose = () => {
    document.body.removeChild(popupComponent.element);
    popupComponent.unrender();
  };

  popupComponent.onSubmit = (updatedData) => {
    film._comments = updatedData.comments;
    film._userRating = updatedData.userRating;
    film._isFavorite = updatedData.isFavorite;
    film._isWatched = updatedData.isWatched;
    film._isInWatchList = updatedData.isInWatchList;

    filmComponent.update(film);
    filmsMostComment.innerHTML = ``;
    sortMostCommentFilms(initialFilms).forEach((film) => renderFilmCards(film, filmsMostComment, true));
  };
};

renderFilters(filtersData);
initialFilms.forEach((film) => renderFilmCards(film, filmsMainContainer));
topRatedFilms.forEach((film) => renderFilmCards(film, filmsTopRated, true));
mostCommentFilms.forEach((film) => renderFilmCards(film, filmsMostComment, true));
