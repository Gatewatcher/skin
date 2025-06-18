import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 22.5H21v-3.75A3.754 3.754 0 0 0 17.25 15v-1.5a5.256 5.256 0 0 1 5.25 5.25zM16.5 22.5H15v-3.75A3.755 3.755 0 0 0 11.25 15h-4.5A3.755 3.755 0 0 0 3 18.75v3.75H1.5v-3.75a5.256 5.256 0 0 1 5.25-5.25h4.5a5.256 5.256 0 0 1 5.25 5.25zM15 1.5V3a3.75 3.75 0 0 1 0 7.5V12a5.25 5.25 0 1 0 0-10.5M9 3a3.75 3.75 0 1 1 0 7.5A3.75 3.75 0 0 1 9 3m0-1.5A5.25 5.25 0 1 0 9 12 5.25 5.25 0 0 0 9 1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUsers);
export default Memo;
