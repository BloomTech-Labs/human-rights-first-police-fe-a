import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import StudentCredits from './StudentCredits';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<Student Credits />', () => {
  test('Component renders', async () => {
    const { container } = await render(<StudentCredits />);
    expect(container).toContainElement(container.firstChild);
  });
});
