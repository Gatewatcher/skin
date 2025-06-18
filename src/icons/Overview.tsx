import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgOverview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12 22.5A10.5 10.5 0 1 1 22.5 12 10.51 10.51 0 0 1 12 22.5M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9m0 15a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6m0-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m1.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgOverview);
export default Memo;
