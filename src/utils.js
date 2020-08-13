export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
}

export const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const isTaskExpiringToday = (dueDate) => {
  if (!dueDate) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() === dueDate.getTime();
};

export const isTaskExpired = (dueDate) => {
  if (!dueDate) {
    return false;
  }

  let currentDate = getCurrentDate();

  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

export const localizeDueDate = (dueDate) => dueDate.toLocaleString(`en-En`, {day: `numeric`, month: `long`});

export const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};
