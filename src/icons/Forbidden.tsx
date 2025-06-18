import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgForbidden = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 2Q7.153 2 4.076 5.076 1.001 8.153 1 12.5t3.076 7.424T11.5 23t7.424-3.076Q22 16.847 22 12.5t-3.076-7.424Q15.847 2.001 11.5 2M2.764 12.5q0-3.61 2.563-6.173T11.5 3.764q3.24 0 5.496 2.01L4.773 17.995q-2.01-2.256-2.01-5.496m8.736 8.736q-3.24 0-5.496-2.01L18.227 7.005q2.01 2.256 2.01 5.496 0 3.61-2.564 6.173T11.5 21.236"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgForbidden);
export default Memo;
