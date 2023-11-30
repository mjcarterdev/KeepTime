export const totalDurationInMs = (timeRecords) => {
  return timeRecords.reduce(
    (total, timeRecord) =>
      timeRecord.endTime
        ? total +
          (Date.parse(timeRecord.endTime) - Date.parse(timeRecord.startTime))
        : total,
    0,
  );
};

export const totalDurationString = (timeRecords) => {
  let totalMs = totalDurationInMs(timeRecords);

  let seconds = Math.floor(totalMs / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
};
