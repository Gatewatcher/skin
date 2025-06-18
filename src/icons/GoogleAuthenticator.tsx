import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgGoogleAuthenticator = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.188 10a1.21 1.21 0 0 1-1.211 1.21h-4.18L10 7.579l1.94-3.36a1.21 1.21 0 0 1 2.098 1.211l-1.94 3.36h3.879c.668 0 1.21.542 1.21 1.21"
      fill="#1A73E8"
    />
    <path
      d="M13.594 16.225c-.58.334-1.32.136-1.655-.444L10 12.423l-1.939 3.36a1.211 1.211 0 0 1-2.098-1.211l1.94-3.36L10 11.133l2.098.078 1.939 3.36c.334.579.136 1.32-.443 1.654"
      fill="#EA4335"
    />
    <path
      d="m10 7.578-.547 1.484-1.55-.273-1.94-3.36A1.21 1.21 0 0 1 8.06 4.219z"
      fill="#FBBC04"
    />
    <path
      d="M9.688 8.79 8.28 11.21H4.023a1.21 1.21 0 1 1 0-2.42z"
      fill="#34A853"
    />
    <path d="M12.098 11.21H7.902L10 7.579z" fill="#185DB7" />
  </svg>
);
const Memo = memo(SvgGoogleAuthenticator);
export default Memo;
