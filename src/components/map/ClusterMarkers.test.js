import React, { useRef } from 'react';
import { render, cleanup } from '../../utils/test-utils';
import ClusterMarkers from './ClusterMarkers';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { mapRef: { current: null } };

describe('<ClusterMarkers />', () => {
  test('Component renders', async () => {
    const { container } = await render(<ClusterMarkers {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
