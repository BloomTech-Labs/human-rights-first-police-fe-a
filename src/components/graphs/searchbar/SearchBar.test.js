import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import SearchBar from './SearchBar';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { setUsState: jest.fn() };

describe('<SearchBar />', () => {
  test('Component renders', async () => {
    const { container } = await render(<SearchBar {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
