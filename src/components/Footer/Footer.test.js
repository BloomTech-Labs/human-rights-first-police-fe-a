import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Footer from './Footer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Footer />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Footer />);
    expect(container).toContainElement(container.firstChild);
  });
});
