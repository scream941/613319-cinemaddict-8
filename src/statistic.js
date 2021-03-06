import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const statisticText = document.querySelectorAll(`.statistic__item-text`);
const statisticCtx = document.querySelector(`.statistic__chart`);
const drawStat = (cards) => {
  const BAR_HEIGHT = 50;
  const genresStats = getStat(cards);
  statisticCtx.height = BAR_HEIGHT * genresStats.labels.length;
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresStats.labels,
      datasets: [{
        data: genresStats.values.slice(0, genresStats.labels.length),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
  statisticText[0].innerHTML = `${genresStats.total }<span class="statistic__item-description">movies</span>`;
  statisticText[1].innerHTML = `${Math.floor(genresStats.totalDuration / 60)}
                              <span class="statistic__item-description">h</span>
                              ${(genresStats.totalDuration - Math.floor(genresStats.totalDuration / 60) * 60)}
                              <span class="statistic__item-description">m</span>`;
  statisticText[2].innerHTML = `${genresStats.topGenre ? genresStats.topGenre : genresStats.topGenreDefault}`;
};


const getStat = (movies) => {
  const genresStats = {};
  const filteredMovies = movies.filter((movie) => movie.isWatched);
  filteredMovies.forEach((movie) => {
    movie.genre.forEach((value) => {
      if (genresStats.hasOwnProperty(value)) {
        genresStats[value]++;
      } else {
        genresStats[value] = 1;
      }
    });
  });

  genresStats.labels = sortObject(genresStats).map((item) => item[0]);
  genresStats.values = sortObject(genresStats).map((item) => item[1]);
  genresStats.topGenre = genresStats.labels[0];
  genresStats.topGenreDefault = `none`;
  genresStats.totalDuration = getTotalDuration(filteredMovies);
  genresStats.total = filteredMovies.length;

  return genresStats;
};

const sortObject = (obj) => {
  const sorted = Object.entries(obj).sort((a, b) => {
    return b[1] - a[1];
  });
  return sorted;
};

const getTotalDuration = (movies) => {
  return movies.reduce((sum, movie) => {
    const duration = movie.duration.hour * 60 + movie.duration.min;
    return sum + duration;
  }, 0);
};

export {drawStat};
