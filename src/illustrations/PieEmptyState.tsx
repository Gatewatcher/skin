import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPieEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M277 112.5c0 42.526-34.474 77-77 77s-77-34.474-77-77 34.474-77 77-77 77 34.474 77 77"
      fill="#F5F5F5"
    />
    <path
      d="M268.922 78.168a76.999 76.999 0 0 1-18.602 92.615L200 112.5z"
      fill="#E1E1E1"
    />
  </svg>
);
const Memo = memo(SvgPieEmptyState);
export default Memo;
