const createData = data => {
  // Create the array that will be points on the graph
  let incidentCounts = [];

  for (const month in data) {
    incidentCounts.push(data[month]);
  }

  let years = [];
  for (let year in data) {
    years.push(year);
  }

  const yearReview = {
    incidentId: `Years`,
    label: `${
      years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : years[0]
    }`,
    data: incidentCounts,
    borderColor: '#c0ba17',
    backgroundColor: 'rgba(0,0,0,0)',
  };

  return yearReview;
};

const defaultData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
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

export { options, defaultData, createData };
