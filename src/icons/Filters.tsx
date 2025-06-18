import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFilters = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 6h-3.075c-.375-1.725-1.875-3-3.675-3s-3.3 1.275-3.675 3H1.5v1.5h10.575c.375 1.725 1.875 3 3.675 3s3.3-1.275 3.675-3H22.5zm-6.75 3c-1.275 0-2.25-.975-2.25-2.25s.975-2.25 2.25-2.25S18 5.475 18 6.75 17.025 9 15.75 9M1.5 18h3.075c.375 1.725 1.875 3 3.675 3s3.3-1.275 3.675-3H22.5v-1.5H11.925c-.375-1.725-1.875-3-3.675-3s-3.3 1.275-3.675 3H1.5zm6.75-3c1.275 0 2.25.975 2.25 2.25s-.975 2.25-2.25 2.25S6 18.525 6 17.25 6.975 15 8.25 15"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFilters);
export default Memo;
