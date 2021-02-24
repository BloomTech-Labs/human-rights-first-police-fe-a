import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import About from './About';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<About />', () => {
  test('Component renders', async () => {
    const { container } = await render(<About />);
    expect(container).toContainElement(container.firstChild);
  });
});
