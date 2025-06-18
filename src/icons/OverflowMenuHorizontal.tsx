import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgOverflowMenuHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M18 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgOverflowMenuHorizontal);
export default Memo;
