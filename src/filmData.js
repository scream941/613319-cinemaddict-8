import {random} from './random.js';

export default () => ({
  title: [
    `The Assassination Of Jessie James By The Coward Robert Ford`,
    `The Godfather`,
    `The Shawshank Redemption`,
    `The Good, the Bad and the Ugly`,
    `Pulp Fiction`,
    `The Godfather: Part II`,
    `One Flew Over the Cuckoo's Nest`,
    `Schindler's List`,
    `Once Upon a Time in the West`,
    `City of God`,
    `Fight Club`,
    `Goodfellas`,
    `Se7en`
  ][random(13)],
  rating: (Math.random() * (10 - 5) + 5).toFixed(1),
  year: random(2018, 1950),
  genre: new Set([
    `Action`,
    `Adventure`,
    `Comedy`,
    `Crime`,
    `Drama`,
    `Horror`,
  ]),
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ].sort(() => Math.random() - 0.5).slice(0, 4).join(` `),
  amountOfComments: random(99),
  duration: `${random(3, 1)}h ${random(60, 1)}m`,
  poster: [
    `images/posters/accused.jpg`,
    `images/posters/blackmail.jpg`,
    `images/posters/blue-blazes.jpg`,
    `images/posters/fuga-da-new-york.jpg`,
    `images/posters/moonrise.jpg`,
    `images/posters/three-friends.jpg`,
  ][random(6)]
});
