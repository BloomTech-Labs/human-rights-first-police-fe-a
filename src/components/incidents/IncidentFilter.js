import { DateTime, Interval } from 'luxon';

// When raw data from the back end is received, remove any key/value pairs from the object that resolve to undefined or null
const falsiesRemoved = data => {
  let undefinedRemoved = [];

  if (data) {
    const nullRemoved = data.map(incident =>
      Object.keys(incident)
        .filter(key => incident[key] !== null)
        .reduce((newIncident, key) => {
          newIncident[key] = incident[key];
          return newIncident;
        }, {})
    );

    undefinedRemoved = nullRemoved.map(incident =>
      Object.keys(incident)
        .filter(key => incident[key] !== undefined)
        .reduce((newIncident, key) => {
          newIncident[key] = incident[key];
          return newIncident;
        }, {})
    );
  }

  return undefinedRemoved;
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

const filterByTags = (data, tags) => {
  let filtered = [];
  tags.forEach(tag => {
    data.forEach(incident => {
      if (incident.categories.indexOf(tag) > 0) {
        filtered.push(incident);
      }
    });
  });
  return filtered;
};

// in progress
// const filterByStateAndDate = (data, state, range) => {
//   return data.filter(
//     incident =>
//       incident.state === state &&
//       range.contains(DateTime.fromISO(incident.date).plus({ day: 1 }))
//   );
// };

export {
  falsiesRemoved,
  filterDataByState,
  createRange,
  filterDataByDate,
  filterByTags,
};
