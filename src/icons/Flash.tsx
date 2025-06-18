import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFlash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 15 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.708 21.561a.75.75 0 0 1-.45-.802l1.365-8.888H1a.75.75 0 0 1-.75-.922l2.25-9.75A.75.75 0 0 1 3.25.62h7.5a.75.75 0 0 1 .735.915l-1.297 5.835h3.562a.75.75 0 0 1 .675.42.75.75 0 0 1-.083.75l-9.75 12.75a.75.75 0 0 1-.592.33.8.8 0 0 1-.292-.06m4.605-12.69 1.5-6.75H3.85l-1.905 8.25h4.433l-1.193 7.71 7.065-9.21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFlash);
export default Memo;
