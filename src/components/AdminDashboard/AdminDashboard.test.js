import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import AdminDashboard from './AdminDashboard';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<AdminDashboard />', () => {
  test('Component renders', async () => {
    const { container } = await render(<AdminDashboard />);
    expect(container).toContainElement(container.firstChild);
  });
});
