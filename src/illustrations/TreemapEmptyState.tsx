import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTreemapEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M200 58.599h84.567V112.5H200z" fill="#F5F5F5" />
    <path d="M115.433 58.599H200v107.803h-84.567z" fill="#E6E6E6" />
    <path d="M200 112.5h43.889v53.901H200z" fill="#D6D6D6" />
    <path d="M243.889 112.5h40.678v53.901h-40.678z" fill="#ECECEC" />
  </svg>
);
const Memo = memo(SvgTreemapEmptyState);
export default Memo;
