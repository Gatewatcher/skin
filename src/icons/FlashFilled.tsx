import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFlashFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.333 21.561a.75.75 0 0 1-.45-.802l1.365-8.888H1.625a.75.75 0 0 1-.75-.922l2.25-9.75a.75.75 0 0 1 .75-.578h7.5a.75.75 0 0 1 .735.915l-1.297 5.835h3.562a.75.75 0 0 1 .675.42.75.75 0 0 1-.083.75l-9.75 12.75a.75.75 0 0 1-.592.33.8.8 0 0 1-.292-.06"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFlashFilled);
export default Memo;
