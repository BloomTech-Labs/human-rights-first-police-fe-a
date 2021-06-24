import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import Stats from './Stats';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Stats /> component tests', () => {
  test('Component renders', async () => {
    const { container } = await render(<Stats />);
    expect(container).toContainElement(container.firstChild);
  });

  test('Heading and buttons exist in the component', async () => {
    await render(<Stats />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links[0]).toBeInTheDocument();
  });
});
