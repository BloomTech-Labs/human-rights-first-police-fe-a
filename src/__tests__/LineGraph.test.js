import React from 'react';

import { render, act, cleanup } from '@testing-library/react';

import LineGraph from '../components/graphs/linegraph/LineGraph';
import GraphContainer from '../components/graphs/GraphContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('', () => ({
  getExampleData: jest.fn(() => Promise.resolve([])),
}));

describe('<GraphContainer /> test suite', () => {
  test('LineGraph renders without crashing', async () => {
    await act(async () => {
      await render(<LineGraph monthlyData={{}} today={0} />);
    });
  });
});
