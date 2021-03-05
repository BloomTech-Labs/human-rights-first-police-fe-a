import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import GraphContainer from './GraphContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<GraphContainer />', () => {
  test('Component renders', async () => {
    const { container } = await render(<GraphContainer />);
    expect(container).toContainElement(container.firstChild);
  });
});
