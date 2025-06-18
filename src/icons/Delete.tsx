import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 9h1.5v9H9zm4.5 0H15v9h-1.5z" fill="currentColor" />
    <path
      d="M3 4.5V6h1.5v15A1.5 1.5 0 0 0 6 22.5h12a1.5 1.5 0 0 0 1.5-1.5V6H21V4.5zM6 21V6h12v15zM9 1.5h6V3H9z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDelete);
export default Memo;
