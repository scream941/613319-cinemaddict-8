import moment from 'moment';
import {drawStat, filterDateWatched} from './statistic.js';
import Filter from './Filter.js';
import FilmCard from './FilmCard.js';
import Search from './Search.js';
import Popup from './Popup.js';
import API from './api.js';

const CARDS = 7;
const EXTRA_CARDS = 2;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const AUTHORIZATION = `Basic 662wnygab4q1ssl`;
const LOADING_ERROR = `Something went wrong while loading. Check you connection or try again later`;

const filmAPI = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const filterContainer = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films`);
const filmsList = document.querySelector(`.films-list`);
const filmsMainContainer = filmsList.querySelector(`.films-list__container`);
const filmsListTitle = filmsList.querySelector(`.films-list__title`);
const filmsTopRated = document.querySelector(`section:nth-of-type(2) .films-list__container`);
const filmsMostComment = document.querySelector(`section:nth-of-type(3) .films-list__container`);
const filmsListShowMore = filmsList.querySelector(`.films-list__show-more`);
const statisticContainer = document.querySelector(`.statistic`);
const statisticFilterInputs = statisticContainer.querySelectorAll(`.statistic__filters-input`);
const profileRating = document.querySelector(`.profile__rating`);
const footerStatistics = document.querySelector(`.footer__statistics p`);
const headerSearch = document.querySelector(`.header__search`);
const mainNavigationItemCount = document.querySelectorAll(`.main-navigation__item-count`);


let filteredFilms = [];
let films = [];
let isNotFilteredFilms = true;
let filmsCounter = 0;

const showFilmsTitleError = (text) => {
  filmsListTitle.textContent = text;
  filmsListTitle.classList.remove(`visually-hidden`);
};

const hideFilmsTitleError = () => {
  filmsListTitle.textContent = `Loading movies...`;
  filmsListTitle.classList.add(`visually-hidden`);
};

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

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const filtersData = [
  {
    title: `All movies`,
    id: `all`,
    isActive: true,
    showAmount: false
  },
  {
    title: `Watchlist`,
    id: `watchlists`,
    showAmount: true
  },
  {
    title: `History`,
    id: `history`,
    showAmount: true
  },
  {
    title: `Favorites`,
    id: `favorites`,
    showAmount: true
  },
  {
    title: `Stats`,
    id: `stats`,
    isAdditional: true,
    showAmount: false
  },
];

const filterIdNames = {
  watchlist: `watchlists`,
  history: `history`,
  favorites: `favorites`
};

const showStats = (filmsData) => {
  statistic.classList.remove(`visually-hidden`);
  filmsContainer.classList.add(`visually-hidden`);
  const filteredWatchedFilms = filmsData.filter((filmData) => filmData.isWatched);
  drawStat(filteredWatchedFilms);
};

const onStatisticFilters = (e) => {
  const filter = e.target.id;
  const filteredDateIsWatchedFilms = films.filter((film) => film.dateIsWatched);
  const filteredWatchedFilmsPress = filterDateWatched(filteredWatchedFilmsPress, filter);
  drawStat(filteredWatchedFilmsPress);
};

const hideStats = () => {
  statistic.classList.add(`visually-hidden`);
  filmsContainer.classList.remove(`visually-hidden`);
};

const profileRatingChange = (filmsToFilter) => {
  let userStatus = ``;
  const filteredFilmsAmount = filmsToFilter.filter((film) => film.isWatched);
  const amount = filteredFilmsAmount.length;
  if (amount < 11) {
    userStatus = `novice`;
  } else if (amount < 21) {
    userStatus = `fan`;
  } else {
    userStatus = `movie pro`;
  }
  profileRating.innerHTML = ``;
  profileRating.innerHTML = userStatus;
};

const showInitialFilmsCount = (filmsToShow) => {
  const filmsToShowCount = filmsToShow.length;
  footerStatistics.innerHTML = ``;
  footerStatistics.innerHTML = filmsToShowCount;
};

const filterFilms = (filmsToFilter, filterName, value = false) => {
  switch (filterName) {
    case `all`:
      return filmsToFilter;
    case `watchlists`:
      return filmsToFilter.filter((film) => film.isInWatchlist);
    case `history`:
      return filmsToFilter.filter((film) => film.isWatched);
    case `favorite`:
      return filmsToFilter.filter((film) => film.isFavorite);
    case `search`:
      return filmsToFilter.filter((film) => film.title.split(` `).find((request) => request.toLowerCase() === value));
    default: return filmsToFilter;
  }
};

const updateFilterCount = (filmsData) => {
  [...mainNavigationItemCount].forEach((filter, i) => {
    filter.textContent = filterFilms(filmsData, Object.values(filterIdNames)[i].length);
  });
};

const renderFilters = (items, filmsData) => {
  filterContainer.innerHTML = ``;
  for (const filterItem of items) {
    const filterComponent = new Filter(filterItem);
    filterComponent.ofFilter = (filter) => {
      if (filter !== `stat`) {
        hideStats();
        filterFilms = filterFilms(filmsData, filter);
        filmsMainContainer.innerHTML = ``;
        isNotFilteredFilms = false;
        filmsCounter = 0;
        renderFilms(filteredFilms, filmsData, isNotFilteredFilms);
      } else {
        showStats(filmsData);
      }
    };
    filterContainer.appendChild(filterComponent.render());
  }
};

const renderFilm = (film, dist, filmsData, extra) => {
  const filmComponent = new FilmCard(film, extra);
  const popupComponent = new Popup(film);
  dist.appendChild(filmComponent.render());

  filmComponent.onComments = () => {
    popupComponent.render();
    document.body.appendChild(popupComponent.element);
  };

  filmComponent.onWatchList = () => {
    film.isInWatchlist = !film.isInWatchlist;
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popupComponent.update(newFilm);
      });
    updateFilterCount(filmsData);
  };

  filmComponent.onMarkAsWatched = () => {
    film.isWatched = !film.isWatched;
    if (film.isWatched) {
      film.dateWatched = moment().format(`DD-MM-YYYY`);
    }
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popupComponent.update(newFilm);
      });
    updateFilterCount(filmsData);
    profileRatingChange(filmsData);
  };

  filmComponent.onFavorite = () => {
    film.isFavorite = !film.isFavorite;
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popupComponent.update(newFilm);
      });
    updateFilterCount(filmsData);
    if (!film.isFavorite) {
      filmComponent.unrender();
    }
  };

  popupComponent.onComment = (newComment) => {
    film.comments.push(newComment.comment);
    popupComponent.commentBlock();

    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        popupComponent.commentUnblock();
        popupComponent.showRating();
        popupComponent.showDeleteButton();
      });
    // .catch(() => {
    //   film.comments.pop();
    //   popupComponent.shake();
    //   popupComponent.commentUnblock();
    // });
  };

  popupComponent.onDelete = () => {
    film.comments.pop();
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        popupComponent.hideDeleteButton();
      });
    // .catch(() => {
    //   popupComponent.shake();
    // });
  };

  popupComponent.onWatchList = () => {
    film.isInWatchlist = !film.isInWatchlist;
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        updateFilterCount(filmsData);
      });
  };

  popupComponent.onWatched = () => {
    film.isWatched = !film.isWatched;
    if (film.isWatched) {
      film.dateWatched = moment().format(`DD-MM-YYYY`);
    }
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        updateFilterCount(filmsData);
        profileRatingChange(filmsData);
      });
  };

  popupComponent.onFavorite = () => {
    film.isFavorite = !film.isFavorite;
    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        updateFilterCount(filmsData);
      });
  };

  popupComponent.onRating = (newRating) => {
    const ratingInputs = popupComponent.element.querySelector(`.film-details__user-rating-input`);
    film.userRating = newRating;
    popupComponent.ratingBlock(ratingInputs);

    filmAPI.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popupComponent.ratingUnblock(ratingInputs);
        filmComponent.update(newFilm);
        popupComponent.update(newFilm);
        popupComponent.reRender();
        popupComponent.showRating();
      });
    // .catch(() => {
    //   popupComponent.ratingUnblock(ratingInputs);
    //   popupComponent.shake();
    // });
  };

  popupComponent.onClose = () => {
    document.body.removeChild(popupComponent.element);
    popupComponent.unrender();
    filmsMostComment.innerHTML = ``;
    sortMostCommentFilms(filmsData).forEach((film) => renderFilm(film, filmsMostComment, true));
    updateFilterCount(filmsData);
  };

  popupComponent.onEsc = popupComponent.onClose;
};

const renderFilms = (filmsDataFiltered, filmsData, isFilmsData) => {
  films = films = filmsData;
  // if (isFilmsData) {
  //   films = filmsData;
  // }
  // films = filmsDataFiltered;

  if (films.length > CARDS) {
    filmsListShowMore.classList.remove(`visualy-hidden`);
  }

  for (const film of films.slice(filmsCounter, CARDS + filmsCounter)) {
    renderFilm(film, filmsMainContainer, filmsData);
  }

  filmsCounter += CARDS;

  if (filmsCounter >= films.length) {
    filmsListShowMore.classList.add(`visually-hidden`);
  }
};

const addDateWatched = (filmsToAddDate) => {
  const filteredWatchedFilms = filmsToAddDate.filter((film) => film.isWatched);
  return filteredWatchedFilms.forEach((film) => {
    film.dateWatched = `${getDandomInt(1, 30)}-${getRandomInt(1, 12)}-${getRandomInt(2011, 2019)}`;
  });
};

const renderSearch = (filmsData) => {
  const searchComponent = new Search();
  searchComponent.onSearchInput = (inputValue) => {
    filteredFilms = filterFilms(filmsData, `search`, inputValue);

    if (filteredFilms.length > 0) {
      filmsMainContainer.innerHTML = ``;
      filmsCounter = 0;
      renderFilms(filteredFilms, filmsData, false);
    }

    if (inputValue === ``) {
      filmsMainContainer.innerHTML = ``;
      filmsCounter = 0;
      renderFilms(filteredFilms, filmsData, true);
      filmsListShowMore.classList.remove(`visually-hidden`);
    }
  };
  headerSearch.appendChild(searchComponent.render());
};

filmsMainContainer.innerHTML = ``;
filterContainer.innerHTML = ``;
headerSearch.innerHTML = ``;
filmsMostComment.innerHTML = ``;
filmsTopRated.innerHTML = ``;

filmAPI.getFilms()
  .then((initialFilmsData) => {
    hideFilmsTitleError();
    renderFilms(filteredFilms, initialFilmsData, isNotFilteredFilms);
    sortTopRatedFilms(initialFilmsData).forEach((film) => renderFilm(film, filmsTopRated, initialFilmsData, true));
    sortMostCommentFilms(initialFilmsData).forEach((film) => renderFilm(film, filmsMostComment, initialFilmsData, true));
    renderFilters(filtersData, initialFilmsData);
    addDateWatched(initialFilmsData);
    renderSearch(initialFilmsData);
    profileRatingChange(initialFilmsData);
    showInitialFilmsCount(initialFilmsData);
    updateFilterCount(initialFilmsData);
    filmsListShowMore.addEventListener(`click`, () => {
      renderFilms(filteredFilms, initialFilmsData, isNotFilteredFilms);
    });
    films = initialFilmsData;
    statisticFilterInputs.forEach((input) => input.addEventListener(`click`, onStatisticFilters));
  });
// .catch(() => {
//   showFilmsTitleError(LOADING_ERROR);
// })
