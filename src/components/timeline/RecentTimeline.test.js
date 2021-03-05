import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import { RecentTimeline } from './RecentTimeline';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<RecentTimeline />', () => {
  test('Component renders', async () => {
    const { container } = await render(<RecentTimeline />);
    expect(container).toContainElement(container.firstChild);
  });
});
