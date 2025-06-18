import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFlashOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 21 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.848 4.289 7.35 2.12h6l-1.5 6.75h3.9l-1.867 2.438 1.072 1.072 2.903-3.802a.75.75 0 0 0 .082-.75.75.75 0 0 0-.69-.458h-3.562L15 1.536a.752.752 0 0 0-.75-.915h-7.5A.75.75 0 0 0 6 1.2l-.405 1.837zM21 20.564l-6.982-6.983-1.065-1.072L1.058.62 0 1.68l4.8 4.807-1.05 4.463a.75.75 0 0 0 .75.922h3.623L6.75 20.76a.75.75 0 0 0 .75.862.75.75 0 0 0 .592-.292l5.01-6.548 6.84 6.84zM5.445 10.37l.607-2.64 2.64 2.64zm3.24 7.71L9.75 11.4l2.25 2.31z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFlashOff);
export default Memo;
