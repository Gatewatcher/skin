import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDownToBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M384 432 144 192l33.6-33.6L384 364.8l206.4-206.4L624 192zM96 528h576v48H96z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDownToBottom);
export default Memo;
