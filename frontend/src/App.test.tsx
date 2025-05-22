import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders User Access Management System', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/UAMS/i);
  expect(titleElement).toBeInTheDocument();
});