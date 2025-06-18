import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsCollapseOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m21.01 12.249-7.5 7.5-1.05-1.05 6.45-6.45-6.45-6.45 1.05-1.05zM11.538 12.249l-7.5 7.5-1.05-1.05 6.45-6.45-6.45-6.45 1.05-1.05z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCsCollapseOn);
export default Memo;
