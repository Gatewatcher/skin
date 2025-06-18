import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSubtract = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 11.25H6v1.5h12z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgSubtract);
export default Memo;
