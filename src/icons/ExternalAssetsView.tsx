import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExternalAssetsView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 33"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#external-assets-view_svg__a)" fill="currentColor">
      <path d="M16 21.706a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
      <path d="M23.777 19.185A8.64 8.64 0 0 0 16 13.706a8.64 8.64 0 0 0-7.777 5.479L8 19.706l.223.522A8.64 8.64 0 0 0 16 25.706a8.64 8.64 0 0 0 7.777-5.478l.223-.522zM16 23.706a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
      <path d="M27 3.706H5a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2v-22a2 2 0 0 0-2-2m-22 2h22v4H5zm0 22v-16h22v16z" />
    </g>
    <defs>
      <clipPath id="external-assets-view_svg__a">
        <path d="M0 .706h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgExternalAssetsView);
export default Memo;
