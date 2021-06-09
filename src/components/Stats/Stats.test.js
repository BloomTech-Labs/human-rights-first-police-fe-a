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
    console.log(container.firstChild);
    const title = screen.getByText(/blue witness/i);
    expect(title).toBeInTheDocument();
    expect(container).toContainElement(container.firstChild);
  });
});
