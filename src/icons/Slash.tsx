import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSlash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 6 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3.98.501.063 15.113l1.449.388L5.428.89z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgSlash);
export default Memo;
