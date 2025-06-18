import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRemoveUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 22.856H18v-3.75a3.75 3.75 0 0 0-3.75-3.75h-4.5A3.75 3.75 0 0 0 6 19.106v3.75H4.5v-3.75a5.25 5.25 0 0 1 5.25-5.25h4.5a5.25 5.25 0 0 1 5.25 5.25zM14.083 3.988a3.75 3.75 0 1 0 .953 5.32h1.73a5.24 5.24 0 0 1-2.757 2.649A5.25 5.25 0 1 1 16.765 4.9h-1.732a3.8 3.8 0 0 0-.95-.913"
      fill="currentColor"
    />
    <path d="M15.114 6.356v1.5h7.5v-1.5z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgCsRemoveUser);
export default Memo;
