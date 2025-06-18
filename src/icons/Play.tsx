import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPlay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.25 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.111-.657l15 8.25a.75.75 0 0 1 0 1.314l-15 8.25A.75.75 0 0 1 5.25 21M6 5.018v13.964L18.694 12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPlay);
export default Memo;
