import React from 'react';
import { render, cleanup } from './utils/test-utils';
import App from './App';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<App />', () => {
  test('Component renders', async () => {
    const { container } = await render(<App />);
    expect(container).toContainElement(container.firstChild);
  });
});
