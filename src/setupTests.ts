import '@testing-library/jest-dom';
import React from 'react';

// Mock react-activity-calendar to avoid issues in tests
jest.mock('react-activity-calendar', () => {
  return function MockActivityCalendar(props: any) {
    return React.createElement('div', { 'data-testid': 'activity-calendar', ...props });
  };
});

// Mock axios to avoid actual API calls in tests
jest.mock('axios', () => ({
  get: jest.fn(),
})); 