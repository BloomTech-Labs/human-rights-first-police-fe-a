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
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        stacked: false,
        beginAtZero: true,
        scaleLabel: {
          fontSize: 20,
          lineHeight: 1,
          display: true,
          labelString: '# of incidents',
          padding: 0,
        },
      },
    ],
    xAxes: [
      {
        stacked: false,
        beginAtZero: true,
        scaleLabel: {
          fontSize: 20,
          lineHeight: 1,
          display: true,
          labelString: 'Months',
          padding: {
            bottom: 10,
          },
        },
      },
    ],
  },
};

export { options, defaultData };
