import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgClosedCaptionAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 12.75h-4.5v1.5h4.5zM12.75 12.75h-4.5v1.5h4.5zM6.75 12.75H4.5v1.5h2.25zM19.5 9.75h-3v1.5h3zM15 9.75H9.75v1.5H15zM8.25 9.75H4.5v1.5h3.75z"
      fill="currentColor"
    />
    <path
      d="M13.302 22.5 12 21.75l3-5.25h4.5A1.497 1.497 0 0 0 21 15V6a1.497 1.497 0 0 0-1.5-1.5h-15A1.497 1.497 0 0 0 3 6v9a1.497 1.497 0 0 0 1.5 1.5h6.75V18H4.5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3.626z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgClosedCaptionAlt);
export default Memo;
