import React from 'react';
import { render, getByText } from '@testing-library/react';
import App from './App';

describe('<App/>', () => {
  test.skip('should navigate to app pages', async () => {
    render(<App />);

    const container = document.querySelector('.App__page');
    const navContainer = document.querySelector('.Header__nav');
    // const mapPageTitle = getByText(/Impact Map/i);

    expect(getByText(container, /Impact Map/i)).toBeInTheDocument();
    getByText(navContainer, /History/i).click();
    // await expect(getByText(container, /History/i)).toBeInTheDocument();
    // expect(historyTitle).not.toBeInTheDocument();
  });
});
