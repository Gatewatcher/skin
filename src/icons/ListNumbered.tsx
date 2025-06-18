import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgListNumbered = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 16.749H12v1.5h10.5zM22.5 6.249H12v1.5h10.5zM6 9.249v-6H4.5v.75H3v1.5h1.5v3.75H3v1.5h4.5v-1.5zM7.5 21.249H3v-3a1.5 1.5 0 0 1 1.5-1.5H6v-1.5H3v-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5H4.5v1.5h3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgListNumbered);
export default Memo;
