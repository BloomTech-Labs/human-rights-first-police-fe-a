import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import SearchHeader from './SearchHeader';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<SearchHeader />', () => {
  test('Component renders', async () => {
    const { container } = await render(<SearchHeader />);
    expect(container).toContainElement(container.firstChild);
  });
});
