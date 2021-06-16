import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Clusters from './Clusters';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  zoomOnCluster: jest.fn(),
};

describe('/components/Home/Map: <Clusters />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Clusters {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
