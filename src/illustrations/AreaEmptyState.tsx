import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgAreaEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m163.647 108.838-50.285 40.856h173.617V81.6l-32.444 1.144-16.727 15.595-20-16.739-31.436 27.238z"
      fill="#F5F5F5"
    />
    <path
      d="m163.451 127.914-50.103 21.78h173.631v-38.002l-30.363.001-17.473 14.428-22.852-14.428-29.688 16.221z"
      fill="#E1E1E1"
    />
  </svg>
);
const Memo = memo(SvgAreaEmptyState);
export default Memo;
