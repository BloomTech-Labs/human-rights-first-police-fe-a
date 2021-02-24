import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import NavBar from './NavBar';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<NavBar />', () => {
  test('Component renders', async () => {
    const { container } = await render(<NavBar />);
    expect(container).toContainElement(container.firstChild);
  });
});
