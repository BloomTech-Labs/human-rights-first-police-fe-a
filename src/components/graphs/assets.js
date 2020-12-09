const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const createData = (data, year) => {
  const ordered = {};
  // Order the keys by ascending order
  Object.keys(data)
    .sort()
    .forEach(
      key => (ordered[key.slice(0, 1) === '0' ? key.slice(1) : key] = data[key])
    );

  // Create the array that will be points on the graph
  let incidentCounts = [];
  for (let month in ordered) {
    incidentCounts.push(ordered[month]);
  }

  const yearReview = {
    incidentId: `${year}`,
    label: `${year}`,
    data: incidentCounts,
    borderColor: '#c0ba17',
    backgroundColor: 'rgba(0,0,0,0)',
  };

  return yearReview;
};

const defaultData = {
  labels: months,
  datasets: [
    {
      incidentId: 'all',
      label: 'All',
      data: [],
      borderColor: '#c0ba17',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  ],
};

const options = {
  responsive: true,
  legend: {
    display: true,
    labels: {
      fontSize: 16,
      padding: 32,
    },
  },
  scales: {
    yAxes: [
      {
        stacked: false,
        beginAtZero: true,
        scaleLabel: {
          fontSize: 20,
          lineHeight: 2,
          display: true,
          labelString: '# of incidents',
        },
        ticks: {
          autoSkip: false,
        },
      },
    ],
    xAxes: [
      {
        stacked: false,
        beginAtZero: true,
        scaleLabel: {
          fontSize: 20,
          lineHeight: 2,
          display: true,
          labelString: 'Months',
        },
        ticks: {
          autoSkip: false,
        },
      },
    ],
  },
};

export { options, defaultData, createData, months };
