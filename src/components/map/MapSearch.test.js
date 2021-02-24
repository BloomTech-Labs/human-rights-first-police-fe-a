import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import MapSearch from './MapSearch';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<MapSearch />', () => {
  test('Component renders', async () => {
    const { container } = await render(<MapSearch />);
    expect(container).toContainElement(container.firstChild);
  });
});
