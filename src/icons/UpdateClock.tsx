import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUpdateClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.309 6H9v1.5H3v-6h1.5v3.176A10.483 10.483 0 0 1 22.5 12H21A8.989 8.989 0 0 0 5.309 6M12 21a9.01 9.01 0 0 1-9-9H1.5A10.51 10.51 0 0 0 12 22.5zM18.75 17.69l1.5 1.5-1.06 1.06-1.94-1.94v-2.56h1.5z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M15.083 22.365a5.25 5.25 0 1 0 5.833-8.73 5.25 5.25 0 0 0-5.833 8.73m.834-7.483a3.75 3.75 0 1 1 4.166 6.235 3.75 3.75 0 0 1-4.166-6.235"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgUpdateClock);
export default Memo;
