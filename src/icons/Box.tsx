import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 15.75H9a1.5 1.5 0 0 1-1.5-1.5v-1.5a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5m-6-3v1.5h6v-1.5z"
      fill="currentColor"
    />
    <path
      d="M21 3H3a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 3 9v12a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 21V9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21 3m-1.5 18h-15V9h15zM21 7.5H3v-3h18z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgBox);
export default Memo;
