import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Adjust the path as needed
import * as DataContext from '../../../core/contexts/useDataContext';

jest.mock('../../../core/contexts/useDataContext');

describe('HomeScreen', () => {
  const mockSetAppError = jest.fn();
  const mockLoadPosts = jest.fn();
  const mockSavePosts = jest.fn();

  const mockPosts = [
    { id: 1, title: 'First post' },
    { id: 2, title: 'Second post' },
  ];

  beforeEach(() => {
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      setAppError: mockSetAppError,
      posts: mockPosts,
      isLoading: false,
      loadPosts: mockLoadPosts,
      savePosts: mockSavePosts,
      appError: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Latest Posts')).toBeTruthy();
  });

  it('renders the error trigger button', () => {
    const { getByText } = render(<HomeScreen />);
    const button = getByText('Test Error Overlay');
    expect(button).toBeTruthy();
  });

  it('calls setAppError when the button is pressed', () => {
    const { getByText } = render(<HomeScreen />);
    const button = getByText('Test Error Overlay');
    fireEvent.press(button);
    expect(mockSetAppError).toHaveBeenCalledWith(
      'This is a test error for the overlay.',
    );
  });
});
