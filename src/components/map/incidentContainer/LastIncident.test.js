import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import LastIncident from './LastIncident';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<LastIncident />', () => {
  test('Component renders', async () => {
    const { container } = await render(<LastIncident />);
    expect(container).toContainElement(container.firstChild);
  });
});
