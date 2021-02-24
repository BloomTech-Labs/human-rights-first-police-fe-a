import React from 'react';
import { render, cleanup } from '../utils/test-utils';
import EmbedSource from './EmbedSource';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { url: 'http://www.example.com' };

describe('<EmbedSource />', () => {
  test('Component renders', async () => {
    const { container } = await render(<EmbedSource {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
