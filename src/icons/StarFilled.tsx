import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStarFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.725 5.485 8 .875l2.275 4.61 5.085.74-3.68 3.585.87 5.065L8 12.485l-4.55 2.39.87-5.065L.64 6.22z"
      fill="#FBC100"
    />
  </svg>
);
const Memo = memo(SvgStarFilled);
export default Memo;
