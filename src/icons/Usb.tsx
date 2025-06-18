import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUsb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#usb_svg__a)" fill="currentColor">
      <path d="M24 15V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v9a2 2 0 0 0-2 2v11h2V17h16v11h2V17a2 2 0 0 0-2-2M10 6h12v9H10z" />
      <path d="M15 10h-3v2h3zM20 10h-3v2h3z" />
    </g>
    <defs>
      <clipPath id="usb_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUsb);
export default Memo;
