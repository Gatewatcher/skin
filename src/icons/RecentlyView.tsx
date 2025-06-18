import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgRecentlyView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15.443 16.5-4.193-4.193V5.25h1.5v6.435l3.75 3.758z"
      fill="currentColor"
    />
    <path
      d="M12 1.5a10.46 10.46 0 0 0-7.5 3.173V1.5H3v6h6V6H5.31A9 9 0 1 1 3 12H1.5A10.5 10.5 0 1 0 12 1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgRecentlyView);
export default Memo;
