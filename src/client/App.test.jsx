import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

describe('Home', () => {
  const queryClient = new QueryClient();
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });
});
