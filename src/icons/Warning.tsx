import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.25 17.625c0 .6-.525 1.125-1.125 1.125S11 18.225 11 17.625s.525-1.125 1.125-1.125 1.125.525 1.125 1.125M12.95 6H11.3v8.25h1.65z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgWarning);
export default Memo;
