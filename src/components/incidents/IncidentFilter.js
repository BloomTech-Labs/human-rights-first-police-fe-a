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

export { newData, filterDataByState };
