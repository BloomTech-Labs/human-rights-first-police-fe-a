import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Search from './Search';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  zoomOnCluster: jest.fn(),
};

describe('/components/Home/Map: <Search />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Search {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
