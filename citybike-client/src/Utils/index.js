export const getDateTime = stringDate => {
  const date = new Date(stringDate);

  const year = date.getFullYear();

  const monthNumber = date.getMonth() + 1;
  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;

  const dayNumber = date.getDate();
  const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber;

  const dateFormat = `${year}-${month}-${day}`;

  const hour = date.getHours();
  const minuteNumber = date.getMinutes();
  const minute = minuteNumber < 10 ? `0${minuteNumber}` : minuteNumber;
  const secondNumber = date.getSeconds();
  const second = secondNumber < 10 ? `0${secondNumber}` : secondNumber;

  const timeFormat = `${hour}:${minute}:${second}`;

  return { date: dateFormat, time: timeFormat };
};
