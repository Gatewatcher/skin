import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFolderDetails = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 15h10.5v1.5H11zm0 3h10.5v1.5H11zm0 3h5.25v1.5H11z"
      fill="currentColor"
    />
    <path
      d="M9.5 19.5H2v-15h5.378l2.565 2.558.434.442H20v6h1.5v-6A1.5 1.5 0 0 0 20 6h-9L8.443 3.443A1.5 1.5 0 0 0 7.378 3H2A1.5 1.5 0 0 0 .5 4.5v15A1.5 1.5 0 0 0 2 21h7.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFolderDetails);
export default Memo;
