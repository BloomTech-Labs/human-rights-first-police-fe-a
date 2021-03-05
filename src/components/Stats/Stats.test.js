import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Stats from './Stats';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Stats />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Stats />);
    expect(container).toContainElement(container.firstChild);
  });
});
