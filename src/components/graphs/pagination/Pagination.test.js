import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import Pagination from './Pagination';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  setGraph: jest.fn(),
  setUsState: jest.fn(),
};

describe('<Pagination />', () => {
  test('Component renders', async () => {
    const { container } = await render(<Pagination {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
