import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEditCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.501 21.249h-4.5a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5m-4.5-16.5v15h4.5v-15zM18.499 3.249H17v18h1.498z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgEditCode);
export default Memo;
