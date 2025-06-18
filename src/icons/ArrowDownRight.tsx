import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowDownRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 19.5V18h9.442L4.5 5.558 5.558 4.5 18 16.942V7.5h1.5v12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowDownRight);
export default Memo;
