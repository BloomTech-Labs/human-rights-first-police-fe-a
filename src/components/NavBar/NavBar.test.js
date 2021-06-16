import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import NavBar from './NavBar';

const BASE_URL = 'http://localhost';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<NavBar />', () => {
  test('Component renders', async () => {
    const { container } = await render(<NavBar />);
    expect(container).toContainElement(container.firstChild);
  });
});

describe('NavBar options link to correct routes', () => {
  test('Home links to /', async () => {
    const wrapper = await render(<NavBar />);
    const homeLink = wrapper.getByText(/home/i);
    expect(homeLink.href).toBe(`${BASE_URL}/`);
  });
  test('Incident Reports links to /incident-reports', async () => {
    const wrapper = await render(<NavBar />);
    const irLink = wrapper.getByText(/incident reports/i);
    expect(irLink.href).toBe(`${BASE_URL}/incident-reports`);
  });
});
