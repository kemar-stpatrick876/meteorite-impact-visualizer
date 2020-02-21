import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '.';

describe('<Header />', () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  test('render', () => {
    expect(
      screen.getByText(/Meteorite Impact Visualizer/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/History/i)).toBeInTheDocument();
    expect(screen.getByText(/map/i)).toBeInTheDocument();
  });
});
