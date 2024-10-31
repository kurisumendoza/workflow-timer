export const convertTimeToSeconds = function (source) {
  return (
    Number(source.hours) * 3600 +
    Number(source.minutes) * 60 +
    Number(source.seconds)
  );
};

export const calculateTotalTime = function (source) {
  const hours = Math.floor(source / 3600);
  const minutes = Math.floor((source - hours * 3600) / 60);
  const seconds = source - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};

export const renderTotalTime = function (source, display) {
  const time = calculateTotalTime(source);

  display.innerText = `${time.hours.toString().padStart(2, '0')}:${time.minutes
    .toString()
    .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
};
