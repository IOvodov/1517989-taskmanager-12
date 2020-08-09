export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isTaskExpired = (dueDate) => {
  if (dueDate === null)
    return false;

  let currentDate = new Date().setHours(23, 59, 59, 999);

  return currentDate > dueDate.getTime();
};

export const isTaskRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const localizeDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-En`, { day: `numeric`, month: `long` });
};

export const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};
