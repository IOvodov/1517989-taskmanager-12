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
