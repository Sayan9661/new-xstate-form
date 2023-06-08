import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiStepForm from './src/app/page';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

//demo tests
describe('MultiStepForm', () => {
  test('renders user information form', () => {
    render(<MultiStepForm />);
    
    // Assert that the user information form is rendered
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  });

  test('moves to survey form on next button click', async () => {
    render(<MultiStepForm />);
    
    // Fill in user information
    userEvent.type(screen.getByLabelText('First Name:'), 'John');
    userEvent.type(screen.getByLabelText('Last Name:'), 'Doe');
    userEvent.type(screen.getByLabelText('Email:'), 'john.doe@example.com');

    // Click on next button
    // fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByText('Next'));

    
    
  });
  


  //more tests can be added here as per requirement
});
