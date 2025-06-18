import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFolderOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#folder-off_svg__a)" fill="currentColor">
      <path d="M21.25 6.463h-1.94l3.44-3.44-1.06-1.06-19.94 19.94 1.06 1.06 1.5-1.5h16.94a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5m0 13.5H5.81l12-12h3.44zM3.25 4.963h5.379l2.56 2.56.44.44h2.121v-1.5h-1.5l-2.56-2.56a1.5 1.5 0 0 0-1.061-.44H3.25a1.5 1.5 0 0 0-1.5 1.5v13.5h1.5z" />
    </g>
    <defs>
      <clipPath id="folder-off_svg__a">
        <path d="M.25.463h24v24h-24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFolderOff);
export default Memo;
