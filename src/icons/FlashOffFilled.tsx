import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFlashOffFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.5 20.564 1.558.62.5 1.68l4.8 4.807-1.05 4.463a.75.75 0 0 0 .75.922h3.623L7.25 20.76a.75.75 0 0 0 .75.862.75.75 0 0 0 .592-.292l5.01-6.548 6.84 6.84zM15.898 11.774l2.445-3.195a.75.75 0 0 0 .082-.75.75.75 0 0 0-.675-.458h-3.562L15.5 1.536a.752.752 0 0 0-.75-.915h-7.5a.75.75 0 0 0-.75.578l-.225.975z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFlashOffFilled);
export default Memo;
