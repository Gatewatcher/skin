import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDraggable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 5h-3v3h3zM16.5 5h-3v3h3zM10.5 11h-3v3h3zM16.5 11h-3v3h3zM10.5 17h-3v3h3zM16.5 17h-3v3h3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDraggable);
export default Memo;
