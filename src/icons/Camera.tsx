import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.75 20.251H2.25a.75.75 0 0 1-.75-.75V6.751a.75.75 0 0 1 .75-.75h4.845l1.282-1.913A.75.75 0 0 1 9 3.751h6a.75.75 0 0 1 .623.337l1.282 1.913h4.845a.75.75 0 0 1 .75.75v12.75a.75.75 0 0 1-.75.75M3 18.751h18V7.501h-4.5a.75.75 0 0 1-.623-.338l-1.282-1.912h-5.19L8.123 7.163a.75.75 0 0 1-.623.338H3z"
      fill="currentColor"
    />
    <path
      d="M12 17.251a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9m0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCamera);
export default Memo;
