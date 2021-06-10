import React from 'react';
import { render, cleanup, screen } from './utils/test-utils';
import App from './App';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<App />', () => {
  test('Component renders', async () => {
    const { container } = await render(<App />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeInTheDocument();
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[0]).toBeInTheDocument();
    expect(container).toContainElement(container.firstChild);
  });
});
