import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import MapContainer from './MapContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<MapContainer />', () => {
  test('Component renders', async () => {
    const { container } = await render(<MapContainer />);
    expect(container).toContainElement(container.firstChild);
  });
});
