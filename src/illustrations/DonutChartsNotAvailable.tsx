import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDonutChartsNotAvailable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m200 18.65 84.169 64.849-32.15 104.928H147.981l-32.15-104.928z"
      fill="#F5F5F5"
    />
    <path
      d="m200 75.03 33.605 25.891-12.836 41.894h-41.538l-12.837-41.894z"
      fill="#E1E1E1"
    />
  </svg>
);
const Memo = memo(SvgDonutChartsNotAvailable);
export default Memo;
