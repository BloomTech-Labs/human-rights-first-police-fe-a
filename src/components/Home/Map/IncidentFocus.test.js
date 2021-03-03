import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import IncidentFocus from './IncidentFocus';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  zoomOnCluster: jest.fn(),
};

describe('/components/Home/Map: <IncidentFocus />', () => {
  test('Component renders', async () => {
    const { container } = await render(<IncidentFocus {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
