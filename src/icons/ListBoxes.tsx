import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgListBoxes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 23 23"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#list-boxes_svg__a)" fill="currentColor">
      <path d="M21.386 5.703h-9.98v1.426h9.98zM21.386 15.683h-9.98v1.426h9.98zM7.129 9.98H2.852a1.427 1.427 0 0 1-1.426-1.425V4.277a1.427 1.427 0 0 1 1.426-1.425h4.277a1.427 1.427 0 0 1 1.426 1.425v4.278A1.427 1.427 0 0 1 7.129 9.98M2.852 4.277v4.278H7.13l-.001-4.278zM7.129 19.96H2.852a1.427 1.427 0 0 1-1.426-1.425v-4.277a1.427 1.427 0 0 1 1.426-1.426h4.277a1.427 1.427 0 0 1 1.426 1.425v4.278a1.427 1.427 0 0 1-1.426 1.425m-4.277-5.703v4.278H7.13l-.001-4.277z" />
    </g>
    <defs>
      <clipPath id="list-boxes_svg__a">
        <path d="M0 0h22.812v22.812H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgListBoxes);
export default Memo;
