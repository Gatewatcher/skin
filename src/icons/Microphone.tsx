import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMicrophone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 14 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.25 9.5v2.25a5.25 5.25 0 1 1-10.5 0V9.5H.25v2.25a6.75 6.75 0 0 0 6 6.705V20h-3v1.5h7.5V20h-3v-1.545a6.75 6.75 0 0 0 6-6.705V9.5z"
      fill="currentColor"
    />
    <path
      d="M7 15.5a3.75 3.75 0 0 0 3.75-3.75v-7.5a3.75 3.75 0 0 0-7.5 0v7.5A3.75 3.75 0 0 0 7 15.5M4.75 4.25a2.25 2.25 0 1 1 4.5 0v7.5a2.25 2.25 0 0 1-4.5 0z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMicrophone);
export default Memo;
