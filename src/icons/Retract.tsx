import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgRetract = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.5 11V9.5h-4.94L22 3.06 20.94 2 14.5 8.44V3.5H13V11zM3.5 13v1.5h4.94L2 20.94 3.06 22l6.44-6.44v4.94H11V13z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgRetract);
export default Memo;
