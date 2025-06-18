import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 22.5h9A1.5 1.5 0 0 0 15 21v-2.25h-1.5V21h-9V3h9v2.25H15V3a1.5 1.5 0 0 0-1.5-1.5h-9A1.5 1.5 0 0 0 3 3v18a1.5 1.5 0 0 0 1.5 1.5"
      fill="currentColor"
    />
    <path
      d="m15.44 15.44 2.689-2.69H7.5v-1.5h10.629l-2.69-2.69L16.5 7.5 21 12l-4.5 4.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgLogout);
export default Memo;
