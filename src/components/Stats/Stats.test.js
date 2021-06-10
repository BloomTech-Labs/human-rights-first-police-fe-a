import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import Stats from './Stats';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Stats />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Stats />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(container).toContainElement(container.firstChild);
  });
});
