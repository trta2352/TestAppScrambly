import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorScreenOverlay from '../ErrorScreenOverlay';
import * as DataContext from '../../../../core/contexts/useDataContext';
import * as RootNavigation from '../../../../navigation/rootNavigation';
import { RouteName } from '../../../../navigation/RouteName';

jest.mock('../../../../core/contexts/useDataContext');
jest.mock('../../../../navigation/rootNavigation', () => ({
  replace: jest.fn(),
}));

describe('ErrorScreenOverlay', () => {
  const mockSetAppError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render anything if appError is null', () => {
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      appError: null,
      setAppError: mockSetAppError,
    });

    const { queryByText } = render(<ErrorScreenOverlay />);
    expect(queryByText('Oops!')).toBeNull();
  });

  it('renders modal and error message when appError is set', () => {
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      appError: 'Something went wrong!',
      setAppError: mockSetAppError,
    });

    const { getByText } = render(<ErrorScreenOverlay />);
    expect(getByText('Oops!')).toBeTruthy();
    expect(getByText('Something went wrong!')).toBeTruthy();
    expect(getByText('Return to home')).toBeTruthy();
  });

  it('matches snapshot when appError is set', () => {
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      appError: 'Snapshot error message',
      setAppError: mockSetAppError,
    });

    const { toJSON } = render(<ErrorScreenOverlay />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls navigation.replace and setAppError(null) when button is pressed', () => {
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      appError: 'Error occurred',
      setAppError: mockSetAppError,
    });

    const { getByText } = render(<ErrorScreenOverlay />);
    const button = getByText('Return to home');
    fireEvent.press(button);

    expect(RootNavigation.replace).toHaveBeenCalledWith(
      RouteName.HomeScreen,
      {},
    );
    expect(mockSetAppError).toHaveBeenCalledWith(null);
  });
});
