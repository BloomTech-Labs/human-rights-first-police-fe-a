import React from 'react';
import {
  // Imported render is customer function built in /utils/test-utils
  render,
  cleanup,
  screen,
  fireEvent,
  act,
} from '../../utils/test-utils';
import Incidents from './Incidents';
import userEvent from '@testing-library/user-event';

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
    expect(listedIncidents.length).toBeGreaterThanOrEqual(1);
  });

  test('Displays 2nd page of unfiltered incidents', async () => {
    await render(<Incidents />);
    const page2 = screen.getByTitle('2');
    userEvent.click(page2);
    const listedIncidents = screen.getAllByText(/add to list/i);
    expect(listedIncidents.length).toEqual(1);
  });
});

describe('Filter functions by rank correctly', () => {
  test('Filter by rank displays events with specific rank', async () => {
    await render(<Incidents />);
    const rankFilter = screen.getByLabelText(/rank:/i);
    fireEvent.click(rankFilter);
    screen.debug();
    // const rankTwo = screen.getByText(/rank: 2/i);
    // fireEvent.click(rankTwo);
    const rank2s = screen.getAllByText(/rank 2/i);
    const rank1s = screen.getAllByText(/rank 1/i);
    expect(rank2s.length).toBeGreaterThanOrEqual(2);
    expect(rank1s.length).toBeLessThanOrEqual(1);
  });
});

describe('Filter functions by location correctly', () => {
  test('Filter by rank displays events with specific rank', async () => {
    await render(<Incidents />);
    const rankFilter = screen.getByLabelText(/rank:/i);
    fireEvent.click(rankFilter);
    screen.debug();
    // const rankTwo = screen.getByText(/rank: 2/i);
    // fireEvent.click(rankTwo);
    const rank2s = screen.getAllByText(/rank 2/i);
    const rank1s = screen.getAllByText(/rank 1/i);
    expect(rank2s.length).toBeGreaterThanOrEqual(2);
    expect(rank1s.length).toBeLessThanOrEqual(1);
  });
});
