import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.869 7.319.881-.881L11.5.25l-.819.888.738.737L4.237 7.95 3.164 6.881l-.882.869L5.82 11.3.25 16.863l.881.887L6.7 12.181l3.55 3.538.869-.888-1.069-1.069 6.075-7.18zm-7.706 5.556L5.124 8.838l7.181-6.088 2.944 2.944z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPin);
export default Memo;
