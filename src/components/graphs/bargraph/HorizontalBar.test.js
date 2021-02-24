import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import HorizontalBar from './HorizontalBar';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<HorizontalBar />', () => {
  test('Component renders', async () => {
    const { container } = await render(<HorizontalBar />);
    expect(container).toContainElement(container.firstChild);
  });
});
