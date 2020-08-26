import {getRandomInteger} from '../utils/common.js';
import {DEFAULT_REPEATING_DAYS, DESCRIPTIONS, COLORS} from '../const.js';

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const generateRepeatingDays = () => {
  return {
    mo: Boolean(getRandomInteger(0, 1)),
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

export const generateRandomTask = () => {
  const dueDate = generateDate();
  const repeatingDays = dueDate ? generateRepeatingDays() : DEFAULT_REPEATING_DAYS;

  return {
    id: generateId(),
    description: getRandomElement(DESCRIPTIONS),
    dueDate,
    repeatingDays,
    color: getRandomElement(COLORS),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1))
  };
};
