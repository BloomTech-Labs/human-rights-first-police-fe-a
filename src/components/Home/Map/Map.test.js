import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Map from './Map';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('/components/Home/Map: <Map />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Map />);

    expect(container).toContainElement(container.firstChild);
  });
});
