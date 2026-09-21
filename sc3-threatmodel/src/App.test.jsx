import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Threat Model app without crashing', () => {
  expect(() => {
    render(<App />);
  }).not.toThrow();

  expect(screen.getAllByText(/Threat Model/i).length).toBeGreaterThan(0);
});
