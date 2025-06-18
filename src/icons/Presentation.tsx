import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPresentation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.75 7.5h-1.5v6h1.5zM16.5 10.5H15v3h1.5zM9 9H7.5v4.5H9z"
      fill="currentColor"
    />
    <path
      d="M18.75 3h-6V1.5h-1.5V3h-6a1.5 1.5 0 0 0-1.5 1.5V15a1.5 1.5 0 0 0 1.5 1.5h6V21h-3v1.5h7.5V21h-3v-4.5h6a1.5 1.5 0 0 0 1.5-1.5V4.5a1.5 1.5 0 0 0-1.5-1.5m0 12H5.25V4.5h13.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPresentation);
export default Memo;
