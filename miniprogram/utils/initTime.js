module.exports = {
  getYear: () => new Date().getFullYear(),
  getMonth: () => new Date().getMonth() + 1,
  getDay: () => new Date().getDate(),
  getHour: () => new Date().getHours(),
  getMin: () => new Date().getMinutes()
}

