import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.25 11.25H6.75v1.5h10.5z" fill="currentColor" />
    <path
      d="M21 16.5H3A1.5 1.5 0 0 1 1.5 15V9A1.5 1.5 0 0 1 3 7.5h18A1.5 1.5 0 0 1 22.5 9v6a1.5 1.5 0 0 1-1.5 1.5M3 9v6h18V9z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgButton);
export default Memo;
