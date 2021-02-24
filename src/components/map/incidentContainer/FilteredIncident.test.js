import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import FilteredIncident from './FilteredIncident';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<FilteredIncident />', () => {
  test('Component renders', async () => {
    const { container } = await render(<FilteredIncident />);
    expect(container).toContainElement(container.firstChild);
  });
});
