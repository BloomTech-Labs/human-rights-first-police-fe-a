import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import About from './About';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<About />', () => {
  test('Component renders', async () => {
    const { container } = await render(<About />);
    expect(container).toContainElement(container.firstChild);
  });

  test('Component renders with a heading, images, links and a menu', async () => {
    await render(<About />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    expect(imgs[0]).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links[0]).toBeInTheDocument();
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[0]).toBeInTheDocument();
  });
});
