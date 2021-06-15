import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, cleanup, screen } from '../../../utils/test-utils';
import IncidentFocus from './IncidentFocus';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  zoomOnCluster: jest.fn(),
};

describe('/components/Home/Map: <IncidentFocus /> Component', () => {
  test('Component renders', async () => {
    const { container } = await render(<IncidentFocus {...props} />);
    expect(container).toContainElement(container.firstChild);
  });

  test('Component renders', async () => {
    await render(<IncidentFocus {...props} />);
    const incidentTab = screen.getByText(/view incident reports/i);
    await userEvent.click(incidentTab);
    // tabpanel exists when dropdown is active
    const tabPanels = screen.getAllByRole('tabpanel');
    expect(tabPanels[0]).toBeInTheDocument();
  });
});
