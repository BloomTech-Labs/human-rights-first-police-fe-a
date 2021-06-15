import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import NavBar from './NavBar';

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
