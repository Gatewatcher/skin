import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12 3-7.5 7.5 1.058 1.057 5.692-5.685V21h1.5V5.872l5.692 5.685L19.5 10.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowUp);
export default Memo;
