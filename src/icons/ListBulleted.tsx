import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgListBulleted = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.25 9.249a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5M5.25 19.749a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5M22.5 16.749H12v1.5h10.5zM22.5 6.249H12v1.5h10.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgListBulleted);
export default Memo;
