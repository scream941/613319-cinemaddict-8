const random = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const simpleCicle = (mas, extr, func) => {
  for (let i = 0; i < extr; i++) {
    mas.push(func());
  }
};

export {random, createElement, simpleCicle};
