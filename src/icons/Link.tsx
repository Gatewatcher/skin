import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.938 5.07a4.5 4.5 0 0 0-6.375 0l1.065 1.065a3.007 3.007 0 1 1 4.252 4.252l-6 6a3.004 3.004 0 0 1-4.253-4.244l1.058-1.065-1.058-1.065-1.065 1.065a4.5 4.5 0 0 0 0 6.375 4.5 4.5 0 0 0 3.188 1.297 4.5 4.5 0 0 0 3.203-1.32l6-6a4.5 4.5 0 0 0-.015-6.36"
      fill="currentColor"
    />
    <path
      d="M3.142 18.615a3 3 0 0 1 0-4.252l6-6a3 3 0 0 1 4.253 0 2.96 2.96 0 0 1 .855 2.137 3 3 0 0 1-.877 2.138l-1.59 1.612 1.065 1.065 1.59-1.59a4.513 4.513 0 0 0-6.383-6.382l-6 6a4.5 4.5 0 0 0 0 6.382A4.5 4.5 0 0 0 5.25 21a4.55 4.55 0 0 0 3.21-1.32l-1.065-1.065a3 3 0 0 1-4.253 0"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgLink);
export default Memo;
