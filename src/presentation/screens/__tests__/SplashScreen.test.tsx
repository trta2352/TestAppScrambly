import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen'; // Adjust the path as needed
import * as DataContext from '../../../core/contexts/useDataContext';
import { useStackNavigation } from '../../../navigation/navigation';
import { RouteName } from '../../../navigation/RouteName';

jest.mock('lottie-react-native', () => 'LottieView');
jest.mock('../../../core/contexts/useDataContext');
jest.mock('../../../navigation/navigation');

describe('SplashScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useStackNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    (DataContext.useDataContext as jest.Mock).mockReturnValue({
      isLoading: false,
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(<SplashScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the Lottie animation', () => {
    const { getByTestId } = render(<SplashScreen />);
    expect(getByTestId('LottieView')).toBeTruthy();
  });

  it('navigates to HomeScreen after 3 seconds', () => {
    render(<SplashScreen />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(mockNavigate).toHaveBeenCalledWith(RouteName.HomeScreen);
  });
});
