const getDaysAgoData = () => {
  let firstDayYear = new Date(new Date().getFullYear(), 0, 1);
  let date = new Date();
  let calc = +date - +firstDayYear;
  let daysAgo = Math.ceil(calc / (1000 * 60 * 60 * 24));
  return daysAgo;
};

export default getDaysAgoData;
