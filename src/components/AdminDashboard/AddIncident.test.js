import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import AddIncident from './AddIncident';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { setAdding: jest.fn() };

describe('<AddIncident />', () => {
  test('Component renders', async () => {
    const { container } = await render(<AddIncident {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
