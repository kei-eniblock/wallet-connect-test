import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckComponent from './CheckComponent';

describe('<CheckComponent />', () => {
  test('it should mount', () => {
    render(<CheckComponent />);
    
    const checkComponent = screen.getByTestId('CheckComponent');

    expect(checkComponent).toBeInTheDocument();
  });
});