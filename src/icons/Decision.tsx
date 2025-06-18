import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDecision = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 14.125a2.996 2.996 0 0 0-2.893 2.25H13.5a2.25 2.25 0 0 1-2.25-2.25v-3a3.7 3.7 0 0 0-.77-2.25h6.127a3 3 0 1 0 0-1.5H7.394a3 3 0 1 0 0 1.5H7.5a2.25 2.25 0 0 1 2.25 2.25v3a3.754 3.754 0 0 0 3.75 3.75h3.107a2.996 2.996 0 1 0 2.893-3.75m0-7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m-15 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m15 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDecision);
export default Memo;
