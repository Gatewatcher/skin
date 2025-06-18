import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgViewShape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="m12.378.852 9 5.25a.75.75 0 0 1 .372.648v10.5a.75.75 0 0 1-.372.648l-9 5.25a.75.75 0 0 1-.756 0l-9-5.25a.75.75 0 0 1-.372-.648V6.75a.75.75 0 0 1 .372-.648l9-5.25a.75.75 0 0 1 .756 0M12 21.632l8.25-4.813V7.181L12 2.368 3.75 7.181v9.638zm5.833-10.023A6.48 6.48 0 0 0 12 7.5a6.48 6.48 0 0 0-5.833 4.109L6 12l.167.391A6.48 6.48 0 0 0 12 16.5a6.48 6.48 0 0 0 5.833-4.109L18 12zM12 15a3 3 0 1 1 0-5.999A3 3 0 0 1 12 15m0-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgViewShape);
export default Memo;
