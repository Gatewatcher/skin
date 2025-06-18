import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMultiFiles = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 23"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#multi-files_svg__a)" fill="currentColor">
      <path d="M3.475 4.277H2.05v14.258h1.425zM6.327 2.852H4.9V19.96h1.426zM19.159 15.683h-8.555v1.426h8.555zM19.159 11.406h-8.555v1.426h8.555z" />
      <path d="m21.796 6.63-4.99-4.99a.65.65 0 0 0-.499-.214H9.178a1.43 1.43 0 0 0-1.425 1.426V19.96a1.43 1.43 0 0 0 1.425 1.426h11.406a1.43 1.43 0 0 0 1.426-1.426V7.13a.65.65 0 0 0-.214-.5m-5.489-3.493 3.992 3.992h-3.992zm4.277 16.823H9.178V2.852h5.703v4.277a1.43 1.43 0 0 0 1.426 1.425h4.277z" />
    </g>
    <defs>
      <clipPath id="multi-files_svg__a">
        <path d="M.624 0h22.812v22.812H.624z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMultiFiles);
export default Memo;
