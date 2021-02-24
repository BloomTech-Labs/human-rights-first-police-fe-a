import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Edit from './Edit';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Edit />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Edit />);
    expect(container).toContainElement(container.firstChild);
  });
});
