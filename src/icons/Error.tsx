import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 12.249a10.5 10.5 0 1 0 21 0 10.5 10.5 0 0 0-21 0m17.363 5.812L6.188 5.387A9 9 0 0 1 18.863 18.06M6.18 19.12A9 9 0 0 1 5.13 6.452l12.668 12.667a9 9 0 0 1-11.618 0"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgError);
export default Memo;
