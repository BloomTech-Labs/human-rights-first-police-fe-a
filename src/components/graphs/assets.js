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
    display: false,
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

export { options, defaultData };
