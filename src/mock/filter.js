import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from "../utils.js";

const taskToFilterMap = {
  all: (tasks) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks) => tasks.filter((task) => !task.isArchive && isTaskExpired(task.dueDate)).length,
  today: (tasks) => tasks.filter((task) => !task.isArchive && isTaskExpiringToday(task.dueDate)).length,
  favorites: (tasks) => tasks.filter((task) => !task.isArchive && task.isFavorite).length,
  repeating: (tasks) => tasks.filter((task) => !task.isArchive && isTaskRepeating(task.repeatingDays)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length
};

export const generateTasksFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, tasksCount]) => {
    return {
      title: filterName,
      count: tasksCount(tasks)
    };
  });
};
