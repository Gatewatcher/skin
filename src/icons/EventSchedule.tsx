import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEventSchedule = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.75 23a6 6 0 1 1 0-12 6 6 0 0 1 0 12m0-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
      fill="currentColor"
    />
    <path
      d="M16.943 19.25 15 17.308V14h1.5v2.692l1.5 1.5z"
      fill="currentColor"
    />
    <path
      d="M21 5a1.5 1.5 0 0 0-1.5-1.5h-3V2H15v1.5H9V2H7.5v1.5h-3A1.5 1.5 0 0 0 3 5v15a1.5 1.5 0 0 0 1.5 1.5h3V20h-3V5h3v1.5H9V5h6v1.5h1.5V5h3v4.5H21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgEventSchedule);
export default Memo;
