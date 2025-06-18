import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.5 19.5 1.057-1.058-5.685-5.692H21v-1.5H5.872l5.685-5.692L10.5 4.5 3 12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowLeft);
export default Memo;
