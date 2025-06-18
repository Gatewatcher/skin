import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgGridMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 3H4.5A1.5 1.5 0 0 0 3 4.5V9a1.5 1.5 0 0 0 1.5 1.5H9A1.5 1.5 0 0 0 10.5 9V4.5A1.5 1.5 0 0 0 9 3m0 6H4.5V4.5H9zM19.5 3H15a1.5 1.5 0 0 0-1.5 1.5V9a1.5 1.5 0 0 0 1.5 1.5h4.5A1.5 1.5 0 0 0 21 9V4.5A1.5 1.5 0 0 0 19.5 3m0 6H15V4.5h4.5zM9 13.5H4.5A1.5 1.5 0 0 0 3 15v4.5A1.5 1.5 0 0 0 4.5 21H9a1.5 1.5 0 0 0 1.5-1.5V15A1.5 1.5 0 0 0 9 13.5m0 6H4.5V15H9zM19.5 13.5H15a1.5 1.5 0 0 0-1.5 1.5v4.5A1.5 1.5 0 0 0 15 21h4.5a1.5 1.5 0 0 0 1.5-1.5V15a1.5 1.5 0 0 0-1.5-1.5m0 6H15V15h4.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgGridMenu);
export default Memo;
