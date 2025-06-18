import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDatabase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 2.25H6a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5m0 1.5v4.5H6v-4.5zM6 14.25v-4.5h12v4.5zm0 6v-4.5h12v4.5z"
      fill="currentColor"
    />
    <path
      d="M8.25 6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M8.25 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M8.25 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDatabase);
export default Memo;
