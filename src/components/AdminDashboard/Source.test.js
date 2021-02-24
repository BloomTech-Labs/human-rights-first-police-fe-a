import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Source from './Source';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { source: null, removeSrc: jest.fn() };

describe('<Source />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Source {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
