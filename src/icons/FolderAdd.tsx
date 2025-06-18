import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFolderAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.75 15.463h-1.5v3h-3v1.5h3v3h1.5v-3h3v-1.5h-3z"
      fill="currentColor"
    />
    <path
      d="M21.25 6.463h-9L9.7 3.913c-.3-.3-.675-.45-1.05-.45h-5.4c-.825 0-1.5.675-1.5 1.5v15c0 .825.675 1.5 1.5 1.5h10.5v-1.5H3.25v-15h5.4l3 3h9.6v6h1.5v-6c0-.825-.675-1.5-1.5-1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFolderAdd);
export default Memo;
