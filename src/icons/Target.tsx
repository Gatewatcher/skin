import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTarget = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M20.865 10.5H22.5v3h-1.636a9.01 9.01 0 0 1-7.364 7.365V22.5h-3v-1.636A9.01 9.01 0 0 1 3.136 13.5H1.5v-3h1.636A9.01 9.01 0 0 1 10.5 3.136V1.5h3v1.636a9.01 9.01 0 0 1 7.365 7.364M7.833 18.236A7.5 7.5 0 0 0 12 19.5a7.51 7.51 0 0 0 7.5-7.5 7.5 7.5 0 1 0-11.667 6.236m.834-1.247A6 6 0 0 0 12 18a6.007 6.007 0 0 0 6-6 6 6 0 1 0-9.333 4.989m.833-8.73a4.5 4.5 0 1 1 5 7.483 4.5 4.5 0 0 1-5-7.484"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgTarget);
export default Memo;
