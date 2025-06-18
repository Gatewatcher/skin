import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDualSlider = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.75 3h-2.562C14.875 1.563 13.625.5 12.125.5S9.375 1.563 9.063 3H.25v1.25h8.813c.312 1.438 1.562 2.5 3.062 2.5s2.75-1.062 3.063-2.5h2.562zm-5.625 2.5a1.84 1.84 0 0 1-1.875-1.875c0-1.062.813-1.875 1.875-1.875S14 2.563 14 3.625A1.84 1.84 0 0 1 12.125 5.5M.25 13h2.563c.312 1.438 1.562 2.5 3.062 2.5s2.75-1.062 3.063-2.5h8.812v-1.25H8.938c-.313-1.437-1.563-2.5-3.063-2.5s-2.75 1.063-3.062 2.5H.25zm5.625-2.5c1.063 0 1.875.813 1.875 1.875a1.84 1.84 0 0 1-1.875 1.875A1.84 1.84 0 0 1 4 12.375c0-1.062.813-1.875 1.875-1.875"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDualSlider);
export default Memo;
