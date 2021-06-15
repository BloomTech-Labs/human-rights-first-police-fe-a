import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  act,
} from '../../utils/test-utils';
import Incidents from './Incidents';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Incidents />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Incidents />);
    expect(container).toContainElement(container.firstChild);
  });
});

describe('Incidents are displayed upon render', () => {
  test('displays unfiltered incidents', async () => {
    await render(<Incidents />);
    const listedIncidents = screen.getAllByText(/add to list/i);
    console.log(listedIncidents.length);
    expect(listedIncidents.length).toEqual(6);
  });
});

describe('Filter functions by rank correctly', () => {
  test('Filter by rank displays events with specific rank', async () => {
    await render(<Incidents />);
    const rankSelect = screen.getByLabelText(/rank/i);
    await act(async () => {
      fireEvent.change(rankSelect, { target: { value: 2 } });
    });
    const rank2s = screen.getAllByText(/rank 2/i);
    const rank1s = screen.getAllByText(/rank 1/i);
    expect(rank2s.length).toBeGreaterThanOrEqual(2);
    expect(rank1s.length).toBeLessThanOrEqual(1);
  });
});

describe('Location filter works correctly', () => {
  test('Location filter properly updates UsState');
  test('Location filter returns correct results');
  // Finding the button to remove state filter:
  // class="anticon-close-circle"
  //
  test('Removing State filter resets UsState');
  test('Removing State filter returns all incidents');
});
