import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m20.48 5.491 2.02-2.02-1.06-1.06-2.02 2.02-.82-.82a1.45 1.45 0 0 0-2.1 0L3 17.111v4.8h4.8l13.5-13.5a1.45 1.45 0 0 0 0-2.1zM7.2 20.411H4.5v-2.7l13.05-13.05 2.7 2.7zM12.44 3.911l-5.69 5.69 1.06 1.06 5.69-5.69z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPen);
export default Memo;
