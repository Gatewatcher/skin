import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgRobot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.25 15.75H6.75v1.5h10.5zM8.25 10.5a1.5 1.5 0 1 0 1.5 1.5 1.485 1.485 0 0 0-1.5-1.5M15.75 10.5a1.5 1.5 0 1 0 1.5 1.5 1.486 1.486 0 0 0-1.5-1.5"
      fill="currentColor"
    />
    <path
      d="M21 6h-7.19l1.555-1.554q.189.051.385.054a1.5 1.5 0 1 0-1.5-1.5q.003.196.054.385L11.69 6H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 21h18a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 21 6M3 19.5v-12h18v12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgRobot);
export default Memo;
