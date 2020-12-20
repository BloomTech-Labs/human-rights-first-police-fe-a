import { DateTime } from 'luxon';
import Interval from 'luxon/src/interval.js';

const newData = arr => {
  const newCurrentData = arr.map(obj =>
    Object.keys(obj)
      .filter(x => obj[x] !== null)
      .reduce((o, e) => {
        o[e] = obj[e];
        return o;
      }, {})
  );
  const noUndefined = newCurrentData.map(obj =>
    Object.keys(obj)
      .filter(x => obj[x] !== undefined)
      .reduce((o, e) => {
        o[e] = obj[e];
        return o;
      }, {})
  );
  return noUndefined;
};

const filterDataByState = (data, state) => {
  return data.filter(incident => incident.state === state);
};

const createRange = range => {
  // End date is exclusive, so add one day so the user can include the day he selected
  const dayAfter = range[1].plus({ day: 1 });
  return Interval.fromDateTimes(range[0], dayAfter);
};

const filterDataByDate = (data, range) => {
  return data.filter(incident =>
    range.contains(DateTime.fromISO(incident.date).plus({ day: 1 }))
  );
};

export { newData, filterDataByState, createRange, filterDataByDate };
