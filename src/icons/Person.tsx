import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 22.5h-3A1.5 1.5 0 0 1 9 21v-5.25a1.5 1.5 0 0 1-1.5-1.5v-4.5A2.25 2.25 0 0 1 9.75 7.5h4.5a2.25 2.25 0 0 1 2.25 2.25v4.5a1.5 1.5 0 0 1-1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5M9.75 9a.705.705 0 0 0-.75.75v4.5h1.5V21h3v-6.75H15v-4.5a.705.705 0 0 0-.75-.75zM12 6.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPerson);
export default Memo;
