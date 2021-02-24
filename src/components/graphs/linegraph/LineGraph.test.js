import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import LineGraph from './LineGraph';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<LineGraph />', () => {
  test('Component renders', async () => {
    const { container } = await render(<LineGraph data={{}} />);
    expect(container).toContainElement(container.firstChild);
  });
});
