import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudExport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m8.25 13.5 1.057 1.057 1.943-1.934v9.127h1.5v-9.127l1.943 1.935L15.75 13.5 12 9.75z"
      fill="currentColor"
    />
    <path
      d="M17.625 16.5h-.375V15h.375a3.378 3.378 0 1 0 .27-6.75h-.645l-.075-.615a5.25 5.25 0 0 0-10.41 0l-.015.615h-.645a3.378 3.378 0 0 0 .27 6.75h.375v1.5h-.375A4.875 4.875 0 0 1 5.4 6.855a6.75 6.75 0 0 1 13.2 0 4.875 4.875 0 0 1-.975 9.645"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCloudExport);
export default Memo;
