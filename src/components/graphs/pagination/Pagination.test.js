import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Pagination from './Pagination';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  setGraph: jest.fn(),
  setUsState: jest.fn(),
  filtered: [
    {
      id: 2,
      date: '2021-02-12T00:00:00.000Z',
      added_on: '2021-02-26T00:00:00.000Z',
      src: [
        'https://twitter.com/ScooterCasterNY/status/1360422269739298818',
        'https://www.youtube.com/watch?v=vIj5ekZGaTs',
        'https://twitter.com/itsa_talia/status/1360513020061974529',
        'https://twitter.com/itsa_talia/status/1360563949465436164',
        'https://twitter.com/itsa_talia/status/1360573983960281097',
        'https://twitter.com/thizzl_/status/1360460991503486981',
        'https://twitter.com/mrCnobi/status/1360662957416452101',
      ],
      incident_id: 'ny-newyorkcity-120',
      city: 'New York City',
      state: 'New York',
      lat: 40.7624,
      long: -73.978584,
      title:
        'NYPD officers surround, charge, assault, and arrest protesters and journalists',
      desc:
        'Following a "F\\*ck 12" march in Midtown, police encircled the crowd of protesters at 54th St and 6th Ave and declared an unlawful assembly. The crowd of protesters appeared entirely contained on the sidewalk. Police charged the crowd, shoving them with batons, tackling and arresting them. 11 protesters and 2 journalists were arrested, with most released around 5 AM the morning of February 13th.\n\nOne reporter states police took her press badge and bruised her wrists with flexcuffs.',
      categories: [
        'arrest',
        'baton',
        'journalist',
        'protester',
        'push',
        'shove',
        'tackle',
      ],
      force_rank: 'Rank 1 - Police Presence',
      geoJSON: {
        type: 'Feature',
        incidentId: 2,
        geometry: {
          type: 'Point',
          coordinates: [-73.978584, 40.7624],
        },
      },
    },
    {
      id: 2,
      date: '2021-02-12T00:00:00.000Z',
      added_on: '2021-02-26T00:00:00.000Z',
      src: [
        'https://twitter.com/ScooterCasterNY/status/1360422269739298818',
        'https://www.youtube.com/watch?v=vIj5ekZGaTs',
        'https://twitter.com/itsa_talia/status/1360513020061974529',
        'https://twitter.com/itsa_talia/status/1360563949465436164',
        'https://twitter.com/itsa_talia/status/1360573983960281097',
        'https://twitter.com/thizzl_/status/1360460991503486981',
        'https://twitter.com/mrCnobi/status/1360662957416452101',
      ],
      incident_id: 'ny-newyorkcity-120',
      city: 'New York City',
      state: 'New York',
      lat: 40.7624,
      long: -73.978584,
      title:
        'NYPD officers surround, charge, assault, and arrest protesters and journalists',
      desc:
        'Following a "F\\*ck 12" march in Midtown, police encircled the crowd of protesters at 54th St and 6th Ave and declared an unlawful assembly. The crowd of protesters appeared entirely contained on the sidewalk. Police charged the crowd, shoving them with batons, tackling and arresting them. 11 protesters and 2 journalists were arrested, with most released around 5 AM the morning of February 13th.\n\nOne reporter states police took her press badge and bruised her wrists with flexcuffs.',
      categories: [
        'arrest',
        'baton',
        'journalist',
        'protester',
        'push',
        'shove',
        'tackle',
      ],
      force_rank: 'Rank 1 - Police Presence',
      geoJSON: {
        type: 'Feature',
        incidentId: 2,
        geometry: {
          type: 'Point',
          coordinates: [-73.978584, 40.7624],
        },
      },
    },
  ],
};

describe('<Pagination />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Pagination {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
