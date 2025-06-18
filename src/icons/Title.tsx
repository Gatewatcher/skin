import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTitle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M16.656 2.984v1.641h-4.375v9.844h-1.64V4.625H6.266v-1.64z" />
      <path d="M4.078 14.469V7.906H1.344V6.813h6.562v1.093H5.172v6.563z" />
    </g>
  </svg>
);
const Memo = memo(SvgTitle);
export default Memo;
