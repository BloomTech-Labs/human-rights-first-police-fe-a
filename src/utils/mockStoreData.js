// Initial state for mock store

// Place initial state objects below

const initViewport = {
  latitude: 41.850033,
  longitude: -97.6500523,
  zoom: 3.2,
  bbox: [-179.9, 18.8163608007951, -66.8847646185949, 71.4202919997506],
};

const initFocus = {
  cluster: { list: [] },
  query: {
    list: [],
    geoFilter: { list: [], active: false },
    dateFilter: { list: [], active: false },
  },
  active: null,
};

const incidentsData = [
  {
    id: 1331,
    date: '2021-05-01T00:00:00.000Z',
    added_on: '2021-05-06T00:00:00.000Z',
    src: ['https://twitter.com/gravemorgan/status/1388795214375002114'],
    incident_id: 'or-portland-432',
    city: 'Portland',
    state: 'Oregon',
    lat: 45.49412,
    long: -122.67193,
    title: 'Officer pepper sprays protester',
    desc:
      "Down the street from the Portland ICE facility, a police officer pushes protesters back. The officer passes one protester who then appears to turn on their phone's flashlight. The officer doubles back and pepper sprays the individual.",
    categories: ['less-lethal', 'pepper-spray', 'protester', 'spray'],
    force_rank: 'Rank 4 - Chemical & Electric',
  },
  {
    id: 1320,
    date: '2021-04-14T00:00:00.000Z',
    added_on: '2021-04-17T00:00:00.000Z',
    src: ['https://twitter.com/BGOnTheScene/status/1382521300065849344'],
    incident_id: 'mn-brooklyncenter-8',
    city: 'Brooklyn Center',
    state: 'Minnesota',
    lat: 45.076614,
    long: -93.30043,
    title: 'Police shoot sign-carrying protester',
    desc:
      'As the curfew approached outside the Brooklyn Center precinct, a protester can be seeing waving a sign several feet away from officers who are huddled behind a chain link fence. One officer fires a less-lethal projectile at the protester, striking them in the foot. There is no evident provocation.',
    categories: ['less-lethal', 'projectile', 'protester', 'shoot'],
    force_rank: 'Rank 5 - Lethal Force',
  },
  {
    id: 1330,
    date: '2021-04-22T00:00:00.000Z',
    added_on: '2021-04-30T00:00:00.000Z',
    src: [
      'https://vimeo.com/540571411',
      'https://twitter.com/warpspdskeleton/status/1387075760805060609',
    ],
    incident_id: 'ny-albany-1',
    city: 'Albany',
    state: 'New York',
    lat: 42.64249,
    long: -73.7576,
    title: 'Police violently disperse encampment',
    desc:
      'On April 22, 2021, Albany police moved to disperse a small encampment of protesters outside the South Station. Police pushed protesters from the site, shoving with their shields and slashing with their batons when protesters stood their ground or failed to move quickly. Police destroyed tents and chairs owned by the protesters and dragged numerous individuals across the pavement to make arrests. 8 protesters were arrested, with 1 hospitalized.\n\nNumerous officers can also be seen with tape hiding their badge numbers.\n\nAlice Green, the executive director of the Center for Law and Justice, states that protesters were given only 15 minutes to disperse, which was not sufficient time to do so.',
    categories: [
      'arrest',
      'baton',
      'grab',
      'hide-badge',
      'protester',
      'push',
      'shield',
      'shove',
      'tackle',
    ],
    force_rank: 'Rank 1 - Police Presence',
  },
  {
    id: 1327,
    date: '2021-04-17T00:00:00.000Z',
    added_on: '2021-04-20T00:00:00.000Z',
    src: [
      'https://twitter.com/wyattreed13/status/1383646455974428679',
      'https://twitter.com/ChuckModi1/status/1383647378759032832',
    ],
    incident_id: 'dc-dc-56',
    city: 'DC',
    state: 'Washington DC',
    lat: 38.899868,
    long: -77.02187,
    title: 'Police charge and tackle protesters and journalists',
    desc:
      'Police charged a group of protesters at H and 7th streets, tackling protesters and journalists, and attempting to arrest individuals wearing black. The crowd was allegedly beginning to disperse when police charged.',
    categories: [
      'arrest',
      'journalist',
      'protester',
      'push',
      'shove',
      'tackle',
    ],
    force_rank: 'Rank 2 - Empty-hand',
  },
  {
    id: 1323,
    date: '2021-04-16T00:00:00.000Z',
    added_on: '2021-04-18T00:00:00.000Z',
    src: ['https://twitter.com/NickAtNews/status/1383249958371921925'],
    incident_id: 'mn-brooklyncenter-10',
    city: 'Brooklyn Center',
    state: 'Minnesota',
    lat: 45.076614,
    long: -93.30043,
    title: 'Police pepper spray crowd of protesters',
    desc:
      'Police and protesters face off on opposite sides of a barricade. Police discharge pepper spray in a wide berth, targeting protesters who step towards them in particular. It is unclear what instigated this incident, although one protester does appear to be trying to recover a red umbrella on the ground.',
    categories: ['less-lethal', 'pepper-spray', 'protester', 'spray'],
    force_rank: 'Rank 4 - Chemical & Electric',
  },
  {
    id: 1328,
    date: '2021-04-18T00:00:00.000Z',
    added_on: '2021-04-20T00:00:00.000Z',
    src: [
      'https://twitter.com/osuala_cheyenne/status/1383915493040422914',
      'https://twitter.com/osuala_cheyenne/status/1384017009139077125',
      'https://twitter.com/osuala_cheyenne/status/1384017218309001220',
      'https://wtop.com/national/2021/04/video-louisville-officer-punches-protester-during-arrest/',
      'https://www.courier-journal.com/story/news/local/2021/04/18/breonna-taylor-video-shows-lmpd-cop-punching-protester-during-arrest/7279751002/',
    ],
    incident_id: 'ky-louisville-30',
    city: 'Louisville',
    state: 'Kentucky',
    lat: 38.25382,
    long: -85.760216,
    title: 'Police tackle, punch, and arrest protester',
    desc:
      'Police arrested a protester near Jefferson Square Park. During the arrest, police tackled the protester to the ground and punched him repeatedly to subdue him. The protester was allegedly flexing his arms, making it difficult for officers to handcuff him.',
    categories: ['arrest', 'protester', 'punch', 'strike'],
    force_rank: 'Rank 2 - Empty-hand',
  },
];

export const mockInitialState = {
  api: {
    incidents: {
      getincidents: { status: 'idle', error: null },
      gettimeline: { status: 'idle', error: null },
    },
  },
  incident: { data: incidentsData, ids: [], timeline: [], tagIndex: {} },
  user: {
    status: { authenticated: false, pending: false },
    tokens: { access: null, id: null },
    info: null,
  },
  map: { viewport: initViewport, focus: initFocus },
};