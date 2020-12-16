import React from 'react';

import { render, act, cleanup } from '@testing-library/react';

import GraphContainer from '../components/graphs/GraphContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('', () => ({
  getExampleData: jest.fn(() => Promise.resolve([])),
}));

describe('<GraphContainer /> test suite', () => {
  test('container renders without crashing', async () => {
    await act(async () => {
      await render(<GraphContainer />);
    });
  });
});
