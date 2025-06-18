import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 7.5V21H7.5V7.5zM21 6H7.5A1.5 1.5 0 0 0 6 7.5V21a1.5 1.5 0 0 0 1.5 1.5H21a1.5 1.5 0 0 0 1.5-1.5V7.5A1.5 1.5 0 0 0 21 6"
      fill="currentColor"
    />
    <path d="M3 13.5H1.5V3A1.5 1.5 0 0 1 3 1.5h10.5V3H3z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgCopy);
export default Memo;
