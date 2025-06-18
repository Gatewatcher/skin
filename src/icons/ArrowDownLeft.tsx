import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowDownLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 19.5V18H7.058L19.5 5.558 18.442 4.5 6 16.942V7.5H4.5v12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowDownLeft);
export default Memo;
