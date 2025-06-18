import type { ReactNode } from 'react';

interface ErrorProps {
  warning?: boolean;
  children?: ReactNode[];
}

export const Error = ({ children, warning }: ErrorProps) => (
  <ul style={{ color: warning ? 'orange' : 'red' }}>
    {children?.map((error: ReactNode, index: number) => (
      <li key={index}>{error}</li>
    ))}
  </ul>
);
