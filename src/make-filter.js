export default (caption, doItCount = false, count) =>
  `<a href="#${caption}" class="main-navigation__item">${caption === `All` ? caption + ` movies` : caption}
  ${doItCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}
  </a>`;
