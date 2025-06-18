import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m8.558 20.67-2.685-2.692H21v-1.5H5.872l2.685-2.693L7.5 12.728l-4.5 4.5 4.5 4.5zM21 8.228l-4.5-4.5-1.057 1.057 2.685 2.693H3v1.5h15.128l-2.685 2.692 1.057 1.058z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgSwitch);
export default Memo;
