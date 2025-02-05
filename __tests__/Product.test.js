import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Product from '../screens/Product';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

test('Product screen renders with products', () => {
  const store = mockStore({
    eventReducers: { data: [{ id: 1, title: 'Product 1', body: 'Description' }], loading: false },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Product />
    </Provider>
  );

  expect(getByText('Product 1')).toBeTruthy();
});
