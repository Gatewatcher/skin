import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 12 9 19.5l-1.05-1.05L14.4 12 7.95 5.55 9 4.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgChevronRight);
export default Memo;
