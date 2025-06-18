import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.5 4.5-1.072 1.045 5.685 5.705H3v1.5h15.113l-5.685 5.68L13.5 19.5 21 12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowRight);
export default Memo;
