import React from 'react';
import { render } from '@testing-library/react-native';
import ProductCard from '../component/appComponent/ProductCard';

test('renders ProductCard with title and body', () => {
  const { getByText } = render(<ProductCard title="Test Title" body="Test Body" />);
  expect(getByText('Test Title')).toBeTruthy();
  expect(getByText('Test Body')).toBeTruthy();
});
