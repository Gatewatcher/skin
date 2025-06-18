import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.75 18 3 11.25l1.06-1.06 5.69 5.688L19.94 5.69 21 6.75z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCheck);
export default Memo;
