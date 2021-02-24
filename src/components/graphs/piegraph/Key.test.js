import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Key from './Key';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Key />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Key />);
    expect(container).toContainElement(container.firstChild);
  });
});
