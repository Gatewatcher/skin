import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDatabaseError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.25 6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M8.25 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M8.25 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
      fill="currentColor"
    />
    <path
      d="M18 2.25H6a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h7.5v-1.5H6v-4.5h13.5v-12a1.5 1.5 0 0 0-1.5-1.5m0 12H6v-4.5h12zm0-6H6v-4.5h12z"
      fill="currentColor"
    />
    <path
      d="m21.75 18.311-1.06-1.061-1.94 1.94-1.94-1.94-1.06 1.061 1.94 1.939-1.94 1.94 1.06 1.06 1.94-1.94 1.94 1.94 1.06-1.06-1.94-1.94z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDatabaseError);
export default Memo;
