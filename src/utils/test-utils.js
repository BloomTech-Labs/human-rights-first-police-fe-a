import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
// Provider components
import OktaWrapper from '../components/OktaWrapper';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
// Redux store
import store from '../store';

// Provides a custom render function for tests that makes Redux, React Router,
// and Okta available to components
function Wrapper(props) {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <OktaWrapper>{props.children}</OktaWrapper>
      </MemoryRouter>
    </Provider>
  );
}
const wrapRender = async (component, options) => {
  let renderReturned;
  // Wrapping the render function in an async act() callback prevents an error related
  // to state updates in Okta's Security component (over which we have no control)
  await act(async () => {
    renderReturned = await render(component, { wrapper: Wrapper, ...options });
  });
  return renderReturned; // act() requires no return value, so return what render would normally return
};

// Re-export React Testing Library
export * from '@testing-library/react';

// Override custom exports
export { wrapRender as render };

// Jest module mocks
jest.mock('react-chartjs-2', () => ({
  // See https://github.com/reactchartjs/react-chartjs-2/issues/155
  Line: () => null,
  Bar: () => null,
  Pie: () => null,
}));

jest.mock('../hooks/legacy/useTimeline', () => ({
  useTimeline: () => ({
    data: [],
    isLoading: false,
    isSuccess: true,
    isError: false,
  }),
}));
