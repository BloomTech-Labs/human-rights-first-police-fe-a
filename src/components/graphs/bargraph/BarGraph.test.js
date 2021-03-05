import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import BarGraph from './BarGraph';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<BarGraph />', () => {
  test('Component renders', async () => {
    const { container } = await render(<BarGraph />);
    expect(container).toContainElement(container.firstChild);
  });
});
