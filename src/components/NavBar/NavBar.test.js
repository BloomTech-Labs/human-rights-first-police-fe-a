import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import NavBar from './NavBar';

const BASE_URL = 'http://localhost';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<NavBar /> component tests', () => {
  test('Component renders', async () => {
    const { container } = await render(<NavBar />);
    expect(container).toContainElement(container.firstChild);
  });

  test('Component renders', async () => {
    await render(<NavBar />);
    const menu = screen.getAllByRole('menuitem');
    expect(menu[0]).toBeInTheDocument();
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
  test('Graph links to /graph', async () => {
    const wrapper = await render(<NavBar />);
    const graphLink = wrapper.getByText(/graph/i);
    expect(graphLink.href).toBe(`${BASE_URL}/graph`);
  });
  test('About links to /about', async () => {
    const wrapper = await render(<NavBar />);
    const aboutLink = wrapper.getByText(/about/i);
    expect(aboutLink.href).toBe(`${BASE_URL}/about`);
  });
});
