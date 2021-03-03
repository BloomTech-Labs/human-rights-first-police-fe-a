import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Home from './Home';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('/components/Home: <Home />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Home />);
    expect(container).toContainElement(container.firstChild);
  });
});
