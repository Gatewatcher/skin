import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMusic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 3H7.5A1.5 1.5 0 0 0 6 4.5v10.917A2.97 2.97 0 0 0 4.5 15a3 3 0 1 0 3 3V9h11.25v6.417a2.97 2.97 0 0 0-1.5-.417 3 3 0 1 0 3 3V4.5a1.5 1.5 0 0 0-1.5-1.5M4.5 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m12.75 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M7.5 4.5h11.25v3H7.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMusic);
export default Memo;
