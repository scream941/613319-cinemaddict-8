import moment from 'moment';

const titles = [
  `Dark Star`,
  `Trust`,
  `Memory Box`,
  `Our Stars`,
  `Full Moons`,
  `Sun Don't Shine`,
  `Green`,
  `Dark Horse`,
  `More Than Four Hours`,
  `The Messenger`,
  `Blank Generation`,
  `Become an Artist`,
  `The Box`,
  `Family Business`,
  `Moving`,
];

const genres = new Set([
  `Comedy`,
  `Action`,
  `Crime`,
  `Adventure`,
  `Drama`,
  `Horror`,
  `Sci-fi`,
  `Musical`,
  `Western`,
  `Fantasy`,
  `Historical`,
  `Thriller`,
  `Romance`,
]);

const posters = [
  `accused`,
  `blackmail`,
  `blue-blazes`,
  `fuga-da-new-york`,
  `moonrise`,
  `three-friends`,
];

const countries = [
  `USA`,
  `UK`,
  `Spaine`,
  `Canada`,
  `Germany`,
  `Brazil`,
  `France`,
  `Italy`,
];

const directors = [
  `Samuel L. Jackson`,
  `Catherine Keener`,
  `Sophia Bush`,
  `Brad Bird`,
  `Jack Nicholson`,
  `Ralph Fiennes`,
  `Meryl Streep`,
  `Jodie Foster`,
];

const writers = [
  `Samuel L. Jackson`,
  `Catherine Keener`,
  `Sophia Bush`,
  `Brad Bird`,
  `Jack Nicholson`,
  `Ralph Fiennes`,
  `Meryl Streep`,
  `Jodie Foster`,
];

const actors = [
  `Samuel L. Jackson`,
  `Catherine Keener`,
  `Sophia Bush`,
  `Brad Bird`,
  `Jack Nicholson`,
  `Ralph Fiennes`,
  `Meryl Streep`,
  `Jodie Foster`,
];

const ageRatings = [
  `0`,
  `6`,
  `12`,
  `16`,
  `18`,
];

const sentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `,
];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomItem = (items) => items[getRandomNumber(0, items.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (1 + max - min)) + min;

const getRandomDescription = (items) => items.sort(() => Math.random() - 0.5).slice(0, getRandomInt(1, 3));

const getRandomRating = () => (Math.random() * (10 - 5) + 5).toFixed(1);

const getRandomItems = (items, num) => [...items].sort(() => Math.random() - 0.5).slice(0, num);


export const film = () => ({
  title: getRandomItem(titles),
  rating: getRandomRating(),
  year: moment(`${getRandomInt(1, 12)}-${getRandomInt(1, 30)}-${getRandomInt(1960, 2018)}`, `MM-DD-YYYY`).format(`DD MMMM YYYY`),
  duration: {
    hour: getRandomInt(1, 2),
    min: getRandomInt(0, 59),
  },
  genre: getRandomItems(genres, 3),
  picture: getRandomItem(posters),
  description: getRandomDescription(sentences),
  writer: getRandomItem(writers),
  director: getRandomItem(directors),
  actors: getRandomItems(actors, 2),
  country: getRandomItem(countries),
  ageRating: getRandomItem(ageRatings),
  userRating: null,
  isFavorite: false,
  isWatched: false,
  isInWatchList: false,
  comments: [
    {
      author: `Nikola Tesla`,
      date: new Date(),
      text: `Ingeniously!`,
      emoji: `😀`,
    },
    {
      author: `Thomas Edison`,
      date: new Date(),
      text: `Not nough`,
      emoji: `😴`,
    }
  ],
});

export const filmsData = (amount) => [...Array(amount).keys()].map(film);
