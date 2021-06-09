import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import ApprovedIncidents from './ApprovedIncidents';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { incidents: [] };

describe('<ApprovedIncidents />', () => {
  test('Component renders', async () => {
    const { container } = await render(<ApprovedIncidents {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
