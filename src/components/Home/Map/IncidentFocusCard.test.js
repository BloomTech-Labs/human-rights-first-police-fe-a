import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import IncidentFocusCard from './IncidentFocusCard';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { id: 0, zoomOnCluster: jest.fn() };

describe('/components/Home/Map: <IncidentFocusCard />', () => {
  test('Component renders', async () => {
    const { container } = await render(<IncidentFocusCard {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
