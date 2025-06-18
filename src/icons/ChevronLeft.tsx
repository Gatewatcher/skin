import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 12 15 4.5l1.05 1.05L9.6 12l6.45 6.45L15 19.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgChevronLeft);
export default Memo;
