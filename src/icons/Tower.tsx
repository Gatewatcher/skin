import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTower = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.645 2.032A1.5 1.5 0 0 0 19.5 1.5h-2.018a1.13 1.13 0 0 0-1.007.622L16.036 3H15v-.375A1.125 1.125 0 0 0 13.875 1.5h-3.75A1.125 1.125 0 0 0 9 2.625V3H7.964l-.44-.877A1.13 1.13 0 0 0 6.518 1.5H4.5A1.5 1.5 0 0 0 3.02 3.25l.528 3.125A2.25 2.25 0 0 0 5.767 8.25H6v9a2.253 2.253 0 0 0-2.25 2.25v3h16.5v-3A2.253 2.253 0 0 0 18 17.25v-9h.232a2.25 2.25 0 0 0 2.219-1.875l.528-3.125a1.5 1.5 0 0 0-.334-1.218M18.75 19.5V21H5.25v-1.5a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 .75.75m-2.25-2.25h-9v-9h9zm2.472-11.125a.75.75 0 0 1-.74.625H5.767a.75.75 0 0 1-.74-.625L4.5 3h1.786l.75 1.5H10.5V3h3v1.5h3.463l.75-1.5H19.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTower);
export default Memo;
