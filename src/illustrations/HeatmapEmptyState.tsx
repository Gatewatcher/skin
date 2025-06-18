import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgHeatmapEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M200 58.599h84.567V112.5H200z" fill="#F5F5F5" />
    <path d="M115.433 58.599H200V112.5h-84.567z" fill="#E1E1E1" />
    <path d="M115.433 112.5H200v53.901h-84.567z" fill="#F5F5F5" />
    <path d="M200 112.5h84.567v53.901H200z" fill="#ECECEC" />
  </svg>
);
const Memo = memo(SvgHeatmapEmptyState);
export default Memo;
