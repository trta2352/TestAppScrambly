/* eslint-disable @typescript-eslint/no-unused-vars */

import 'react-native';
import React from 'react';
import App from '../App';
import { cleanup, render } from '@testing-library/react-native';

describe('AppTests', () => {
  jest.useFakeTimers();
  afterAll(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const app = render(<App />, {}).toJSON();
    expect(app).toMatchSnapshot();
  });
});
